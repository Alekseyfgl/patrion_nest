import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAddBlogDto, IUpdateBlogDto } from './blog/input';
import { PromiseNull } from '../common/interfaces/optional.types';
import { BlogCommandRepository } from './repositories/blog.command.repository';
import { BlogDocument } from './blog.schema';

@Injectable()
export class BlogService {
    constructor(
        protected blogCommandRepository: BlogCommandRepository,
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

    // async createPostToBlog(blogId: string, postDto: IPostToBlogDto): PromiseNull<PostSchema> {
    //     const blog: Nullable<IBlogSchema> = await QueryBlogRepository.findById(blogId);
    //     if (!blog) return null;
    //
    //     const newPost: AddPostDto = {
    //         blogId: String(blogId),
    //         shortDescription: postDto.shortDescription,
    //         content: postDto.content,
    //         title: postDto.title,
    //     };
    //
    //     const createdPostId: Nullable<string> = await CommandPostRepository.create(newPost);
    //     if (!createdPostId) return null;
    //     return QueryPostRepository.findById(createdPostId);
    // }
}
