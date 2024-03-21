import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

import { Nullable } from '../common/interfaces/optional.types';
import { AddPostDto, PostsByBlogQuery, UpdatePostDto } from './interfaces/input';
import { IPost, IPostModelOut } from './interfaces/output';
import { PostService } from './post.service';
import { PostQueryRepository } from './repositories/post.query.repository';
import { PostDocument } from './post.schema';
import { postMapper } from './post.mapper';
import { CommentsByPostQuery } from '../comment/interfaces/input';
import { ICommentPaginationOut } from '../comment/interfaces/output';
import { CommentQueryRepository } from '../comment/repositories/comment.query.repository';
import { BasicAuthGuard } from '../auth/guards/password-js/basic-auth.guard';
import { ExceptionsService } from '../common/http-exceptions-service/exeption.service';

@Controller('posts')
export class PostController {
    constructor(
        private readonly postService: PostService,
        private readonly postQueryRepository: PostQueryRepository,
        private readonly commentQueryRepository: CommentQueryRepository,
        private readonly exceptionsService: ExceptionsService,
    ) {}

    @UseGuards(BasicAuthGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createPost(@Body() dto: AddPostDto): Promise<IPost> {
        const createdPost: Nullable<PostDocument> = await this.postService.create(dto);
        if (!createdPost) throw new this.exceptionsService.badRequestException();
        return postMapper(createdPost);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id') id: string): Promise<IPost> {
        const post: Nullable<PostDocument> = await this.postQueryRepository.findById(id);
        if (!post) throw new this.exceptionsService.notFoundException();
        return postMapper(post);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll(@Query() query: PostsByBlogQuery): Promise<IPostModelOut> {
        const posts: IPostModelOut = await this.postQueryRepository.getAll(query);
        return posts;
    }

    @UseGuards(BasicAuthGuard)
    @Put(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async updateById(@Body() dto: UpdatePostDto, @Param('id') id: string) {
        const isUpdated: boolean = await this.postService.updateById(id, dto);
        if (!isUpdated) throw new this.exceptionsService.notFoundException();
    }

    @UseGuards(BasicAuthGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async removeById(@Param('id') id: string) {
        const isRemoved: boolean = await this.postService.removeById(id);
        if (!isRemoved) throw new this.exceptionsService.notFoundException();
    }

    @Get(':id/comments')
    @HttpCode(HttpStatus.OK)
    async getAllCommentsByPostId(@Param('id') postId: string, query: CommentsByPostQuery) {
        const result: Nullable<ICommentPaginationOut> = await this.commentQueryRepository.getAllCommentsByPostId(postId, query);
        if (!result) throw new this.exceptionsService.notFoundException();

        return result;
    }
}
