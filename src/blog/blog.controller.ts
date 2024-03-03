import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { Nullable } from '../common/interfaces/optional.types';
import { BlogService } from './blog.service';
import { BlogQueryRepository } from './repository/blog.query.repository';
import { IAddBlogDto } from './blog/input';
import { BlogDocument } from './blog.schema';

@Controller('blogs')
export class BlogController {
    constructor(
        private readonly blogService: BlogService,
        private readonly blogQueryRepository: BlogQueryRepository,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addBlogByOne(@Body() dto: IAddBlogDto) {
        const newBlog: Nullable<BlogDocument> = await this.blogService.create(dto);
        return newBlog;
    }
}
