import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';

import { Nullable } from '../../common/interfaces/optional.types';
import { BlogService } from './blog.service';
import { AddBlogDto, BlogQuery, UpdateBlogDto } from './interfaces/input';
import { BlogDocument } from './blog.schema';
import { blogMapper } from './blog.mapper';
import { IBlog, IBlogPagination } from './interfaces/output';
import { BlogQueryRepository } from './repositories/blog.query.repository';
import { IPostToBlogDto, PostsByBlogQuery } from '../post/interfaces/input';
import { PostDocument } from '../post/post.schema';
import { postMapper } from '../post/post.mapper';
import { IPost, IPostModelOut } from '../post/interfaces/output';
import { PostQueryRepository } from '../post/repositories/post.query.repository';
import { BasicAuthGuard } from '../auth/guards/password-js/basic-auth.guard';
import { ExceptionsService } from '../../common/http-exceptions-service/exeption.service';

@Controller('blogs')
export class BlogController {
    constructor(
        private readonly blogService: BlogService,
        private readonly blogQueryRepository: BlogQueryRepository,
        private readonly postQueryRepository: PostQueryRepository,
        private readonly exceptionsService: ExceptionsService,
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllBlogs(@Query() query: BlogQuery, @Request() req): Promise<IBlogPagination> {
        console.log(req.ip);
        return this.blogQueryRepository.findAll(query);
    }

    @UseGuards(BasicAuthGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addBlogByOne(@Body() dto: AddBlogDto): Promise<IBlog> {
        const createdBlog: Nullable<BlogDocument> = await this.blogService.create(dto);
        if (!createdBlog) throw this.exceptionsService.internalServerErrorException();
        return blogMapper(createdBlog);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getBlogById(@Param('id') id: string): Promise<IBlog> {
        const blog: Nullable<IBlog> = await this.blogQueryRepository.findById(id);
        if (!blog) throw this.exceptionsService.notFoundException();
        return blog;
    }

    @UseGuards(BasicAuthGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async removeBlogById(@Param('id') id: string): Promise<void> {
        const isRemoved: boolean = await this.blogService.removeById(id);
        if (!isRemoved) throw this.exceptionsService.notFoundException();
    }

    @UseGuards(BasicAuthGuard)
    @Put(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async updateBlogById(@Param('id') id: string, @Body() dto: UpdateBlogDto): Promise<void> {
        const isUpdated: boolean = await this.blogService.updateById(id, dto);
        if (!isUpdated) throw this.exceptionsService.notFoundException();
    }
    @UseGuards(BasicAuthGuard)
    @Post(':id/posts')
    @HttpCode(HttpStatus.CREATED)
    async createPostToBlog(@Body() dto: IPostToBlogDto, @Param('id') id: string): Promise<IPost> {
        const createdPost: Nullable<PostDocument> = await this.blogService.createPostToBlog(id, dto);
        if (!createdPost) {
            throw this.exceptionsService.notFoundException();
            // throw new BadRequestException([{ message: HttpExceptionMessagesConst.NOT_FOUND, field: '' }]); You can use the same
        }
        return postMapper(createdPost);
    }
    @Get(':id/posts')
    @HttpCode(HttpStatus.OK)
    async getAllPostsByBlogId(@Param('id') id: string, @Query() query: PostsByBlogQuery): Promise<IPostModelOut> {
        const blogWithPosts: Nullable<IPostModelOut> = await this.postQueryRepository.findAllPostsByBlogId(id, query);

        if (!blogWithPosts) throw this.exceptionsService.notFoundException();
        return blogWithPosts;
    }
}
