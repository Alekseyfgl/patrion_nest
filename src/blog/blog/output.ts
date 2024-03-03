export interface IBlog {
    id: string;
    name: string;
    description: string;
    websiteUrl: string;
    createdAt: string;
    isMembership: boolean;
}

export interface ICommonBlog {
    id: string;
    name: string;
    description: string;
    websiteUrl: string;
    createdAt: string;
    isMembership: boolean;
}
// export interface IBlogSchema extends Document {
//     id: string;
//     name: string;
//     description: string;
//     websiteUrl: string;
//     isMembership: boolean;
//     createdAt: string;
//     // updatedAt: string;
// }

export interface IBlogModelOut {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: IBlog[];
}
