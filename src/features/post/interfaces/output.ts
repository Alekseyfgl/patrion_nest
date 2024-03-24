export interface IShortPost {
    name: string;
    description: string;
    websiteUrl: string;
}

export interface IPost {
    id: string;
    blogId: string;
    title: string;
    shortDescription: string;
    content: string;
    blogName: string;
    createdAt: string;
}

export interface IPostModelOut {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: IPost[];
}
