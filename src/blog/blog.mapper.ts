import { BlogQuery, BlogQueryTypeOptional } from './blog/input';
import { BlogDocument } from './blog.schema';
import { IBlog, IBlogPagination } from './blog/output';

export const pageBlogMapper = (data: { totalCount: number; pagesCount: number; pageSize: number; pageNumber: number; blogs: BlogDocument[] }): IBlogPagination => {
    const { pageSize, pageNumber, pagesCount, totalCount, blogs } = data;
    return {
        pagesCount,
        page: pageNumber,
        pageSize,
        totalCount,
        items: blogs.map((blog: BlogDocument) => {
            return {
                id: blog.id.toString(),
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                isMembership: blog.isMembership,
                createdAt: blog.createdAt.toISOString(),
            };
        }),
    };
};

export const blogGetAllQueryMapper = (query: BlogQueryTypeOptional): BlogQuery => {
    const { pageSize, pageNumber, sortDirection, sortBy, searchNameTerm } = query;
    return {
        pageSize: pageSize ? +pageSize : 10,
        pageNumber: pageNumber ? +pageNumber : 1,
        sortDirection: sortDirection || 'desc',
        sortBy: sortBy || 'createdAt',
        searchNameTerm: searchNameTerm || null,
    };
};

export const blogMapper = (createdBlog: BlogDocument): IBlog => {
    return {
        id: createdBlog.id,
        name: createdBlog.name,
        description: createdBlog.description,
        websiteUrl: createdBlog.websiteUrl,
        isMembership: createdBlog.isMembership,
        createdAt: createdBlog.createdAt.toISOString(),
    };
};
