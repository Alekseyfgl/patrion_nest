export interface IBlog {
    id: string;
    name: string;
    description: string;
    websiteUrl: string;
    createdAt: string;
    isMembership: boolean;
}

export interface IBlogPagination {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: IBlog[];
}
