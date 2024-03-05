import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';

import { Nullable } from '../common/interfaces/optional.types';
import { BlogService } from './blog.service';
import { BlogQuery, BlogQueryTypeOptional, IAddBlogDto, IUpdateBlogDto } from './interfaces/input';
import { BlogDocument } from './blog.schema';
import { blogGetAllQueryMapper, blogMapper } from './blog.mapper';
import { IBlog, IBlogPagination } from './interfaces/output';
import { CustomBadReqException } from '../common/exceptions/not-found.excep';
import { HttpExceptionMessages } from '../common/constans/http-exception-messages';
import { BlogQueryRepository } from './repositories/blog.query.repository';

@Controller('blogs')
export class BlogController {
    constructor(
        private readonly blogService: BlogService,
        private readonly blogQueryRepository: BlogQueryRepository,
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllBlogs(@Query() query: BlogQueryTypeOptional): Promise<IBlogPagination> {
        const quer: BlogQuery = blogGetAllQueryMapper(query);
        return this.blogQueryRepository.findAll(quer);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addBlogByOne(@Body() dto: IAddBlogDto): Promise<IBlog> {
        const createdBlog: Nullable<BlogDocument> = await this.blogService.create(dto);
        if (!createdBlog) throw new CustomBadReqException(HttpStatus.BAD_REQUEST, HttpExceptionMessages.BAD_REQUEST);
        return blogMapper(createdBlog);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getBlogById(@Param('id') id: string) {
        const blog: Nullable<IBlog> = await this.blogQueryRepository.findById(id);
        if (!blog) throw new CustomBadReqException(HttpStatus.NOT_FOUND, HttpExceptionMessages.NOT_FOUND);
        return blog;
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async removeBlogById(@Param('id') id: string) {
        const isRemoved: boolean = await this.blogService.removeById(id);
        if (!isRemoved) throw new CustomBadReqException(HttpStatus.NOT_FOUND, HttpExceptionMessages.NOT_FOUND);
    }

    @Put(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async updateBlogById(@Param('id') id: string, @Body() dto: IUpdateBlogDto) {
        const isUpdated: boolean = await this.blogService.updateById(id, dto);
        if (!isUpdated) throw new CustomBadReqException(HttpStatus.NOT_FOUND, HttpExceptionMessages.NOT_FOUND);
    }
}
