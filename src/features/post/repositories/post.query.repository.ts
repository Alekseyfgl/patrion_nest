import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument, PostModelType } from '../post.schema';
import { PostsByBlogQuery } from '../interfaces/input';
import { IPostModelOut } from '../interfaces/output';
import { offsetPagination } from '../../../common/utils/offset-for-pagination/offset-for-pagination';
import { countTotalPages } from '../../../common/utils/count-total-pages/count-total-pages';
import { pagePostMapper } from '../post.mapper';
import { Nullable, PromiseNull } from '../../../common/interfaces/optional.types';
import { BlogQueryRepository } from '../../blog/repositories/blog.query.repository';
import { IBlog } from '../../blog/interfaces/output';

@Injectable()
export class PostQueryRepository {
    constructor(
        @InjectModel(Post.name)
        protected PostModel: PostModelType,
        protected blogQueryRepository: BlogQueryRepository,
    ) {}

    async getAll(query: PostsByBlogQuery): Promise<IPostModelOut> {
        const { pageSize, pageNumber, sortDirection, sortBy } = query;
        const direction = sortDirection === 'desc' ? -1 : 1;

        const filter: any =
            sortBy !== 'createdAt'
                ? {
                      [sortBy]: direction,
                      ['createdAt']: 1,
                  }
                : { [sortBy]: direction };
        try {
            const posts: PostDocument[] = await this.PostModel.find({}).sort(filter).skip(offsetPagination(pageNumber, pageSize)).limit(pageSize);

            const totalCount: number = await this.PostModel.countDocuments();
            const pagesCount: number = countTotalPages(totalCount, pageSize);
            return pagePostMapper({ posts, totalCount, pageNumber, pagesCount, pageSize });
        } catch (e) {
            console.log('[getAll]', e);
            return pagePostMapper({ posts: [], totalCount: 0, pageNumber: 1, pagesCount: 1, pageSize: 10 });
        }
    }

    async findAllPostsByBlogId(blogId: string, query: PostsByBlogQuery): PromiseNull<IPostModelOut> {
        const { pageSize, pageNumber, sortDirection, sortBy } = query;
        const direction = sortDirection === 'desc' ? -1 : 1;

        try {
            const blog: Nullable<IBlog> = await this.blogQueryRepository.findById(blogId);
            if (!blog) return null;
            const posts: PostDocument[] = await this.PostModel.find({ blogId: blogId })
                .sort({ [sortBy]: direction })
                .skip(offsetPagination(pageNumber, pageSize))
                .limit(pageSize);

            const totalCount: number = await this.PostModel.countDocuments({ blogId: blogId });
            const pagesCount: number = countTotalPages(totalCount, pageSize);
            return pagePostMapper({ posts, totalCount, pageNumber, pagesCount, pageSize });
        } catch (e) {
            console.log('[getAll]', e);
            return pagePostMapper({ posts: [], totalCount: 0, pageNumber: 1, pagesCount: 1, pageSize: 10 });
        }
    }

    async findById(id: string): PromiseNull<PostDocument> {
        try {
            return await this.PostModel.findById(id);
        } catch (e) {
            console.log('[findById]', e);
            return null;
        }
    }
}
