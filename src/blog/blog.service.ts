import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlogCommandRepository } from './repository/blog.command.repository';
import { IAddBlogDto, IUpdateBlogDto } from './blog/input';
import { PromiseNull } from '../common/interfaces/optional.types';

@Injectable()
export class BlogService {
    constructor(
        protected blogCommandRepository: BlogCommandRepository,
        private configService: ConfigService,
    ) {}

    async create(dto: IAddBlogDto): PromiseNull<any> {
        return this.blogCommandRepository.create(dto);
    }

    async updateById(id: string, dto: IUpdateBlogDto) {
        return this.blogCommandRepository.updateById(id, dto);
    }

    async removeById(id: string) {
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
