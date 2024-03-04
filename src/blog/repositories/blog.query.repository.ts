import { Injectable } from '@nestjs/common';
import { BlogQuery } from '../blog/input';
import { Nullable, PromiseNull } from '../../common/interfaces/optional.types';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument, BlogModelType } from '../blog.schema';
import { offsetPagination } from '../../common/utils/offset-for-pagination/offset-for-pagination';
import { countTotalPages } from '../../common/utils/count-total-pages/count-total-pages';
import { IBlog, IBlogPagination } from '../blog/output';
import { blogMapper, pageBlogMapper } from '../blog.mapper';

@Injectable()
export class BlogQueryRepository {
    constructor(
        @InjectModel(Blog.name)
        protected BlogModel: BlogModelType,
    ) {}
    async findAll(query: BlogQuery): Promise<IBlogPagination> {
        const { pageSize, pageNumber, sortDirection, sortBy, searchNameTerm } = query;

        const filter: { name?: { $regex: RegExp } } = {};
        if (searchNameTerm) {
            filter.name = { $regex: new RegExp(searchNameTerm, 'i') };
        }
        const direction: 1 | -1 = sortDirection === 'desc' ? -1 : 1;

        try {
            const blogs = await this.BlogModel.find(filter)
                .sort({ [sortBy]: direction })
                .skip(offsetPagination(pageNumber, pageSize))
                .limit(pageSize);

            const totalCount: number = await this.BlogModel.countDocuments(filter);
            const pagesCount: number = countTotalPages(totalCount, pageSize);
            return pageBlogMapper({ blogs, pagesCount, totalCount, pageSize, pageNumber });
        } catch (e) {
            console.error('[findAll]', e);
            return pageBlogMapper({ blogs: [], pagesCount: 0, totalCount: 0, pageSize, pageNumber });
        }
    }

    async findById(id: string): PromiseNull<IBlog> {
        try {
            const blog: Nullable<BlogDocument> = await this.BlogModel.findById(id);
            return blog ? blogMapper(blog) : null;
        } catch (e) {
            console.error('[BLOG,findById]', e);
            return null;
        }
    }
}
