import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAddBlogDto, IUpdateBlogDto } from './interfaces/input';
import { Nullable, PromiseNull } from '../common/interfaces/optional.types';
import { BlogCommandRepository } from './repositories/blog.command.repository';
import { BlogDocument } from './blog.schema';
import { IAddPostDto, IPostToBlogDto } from '../post/interfaces/input';
import { PostDocument } from '../post/post.schema';
import { PostCommandRepository } from '../post/repositories/post.command.repository';
import { PostQueryRepository } from '../post/repositories/post.query.repository';
import { BlogQueryRepository } from './repositories/blog.query.repository';
import { IBlog } from './interfaces/output';

@Injectable()
export class BlogService {
    constructor(
        protected blogCommandRepository: BlogCommandRepository,
        protected blogQueryRepository: BlogQueryRepository,
        protected postCommandRepository: PostCommandRepository,
        private postQueryRepository: PostQueryRepository,
        private configService: ConfigService,
    ) {}

    async create(dto: IAddBlogDto): PromiseNull<BlogDocument> {
        return this.blogCommandRepository.create(dto);
    }

    async updateById(id: string, dto: IUpdateBlogDto): Promise<boolean> {
        return this.blogCommandRepository.updateById(id, dto);
    }

    async removeById(id: string): Promise<boolean> {
        return this.blogCommandRepository.removeById(id);
    }

    async createPostToBlog(blogId: string, postDto: IPostToBlogDto): PromiseNull<PostDocument> {
        const blog: Nullable<IBlog> = await this.blogQueryRepository.findById(blogId);
        if (!blog) return null;

        const newPost: IAddPostDto = {
            blogId: String(blogId),
            shortDescription: postDto.shortDescription,
            content: postDto.content,
            title: postDto.title,
        };

        const createdPostId: Nullable<PostDocument> = await this.postCommandRepository.create(newPost);
        if (!createdPostId) return null;
        return this.postQueryRepository.findById(createdPostId.id);
    }
}
