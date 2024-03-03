import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';

import { Nullable } from '../common/interfaces/optional.types';
import { BlogService } from './blog.service';
import { IAddBlogDto } from './blog/input';
import { BlogDocument } from './blog.schema';
import { blogMapper } from './blog.mapper';
import { IBlog } from './blog/output';
import { BlogQueryRepository } from './repository/blog.query.repository';
import { CustomBadReqException } from '../common/exceptions/not-found.excep';
import { HttpExceptionMessages } from '../common/constans/http-exception-messages';

@Controller('blogs')
export class BlogController {
    constructor(
        private readonly blogService: BlogService,
        private readonly blogQueryRepository: BlogQueryRepository,
    ) {}

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
}
