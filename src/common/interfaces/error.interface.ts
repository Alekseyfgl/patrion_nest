export interface ICustomErrors {
    errorsMessages: IErrorOut[];
}

export interface IErrorOut {
    message: string;
    field: string;
}
