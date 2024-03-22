export interface ICustomErrors {
    errorsMessages: IErrorMessage[];
}

export interface IErrorMessage {
    message: string;
    field: string;
}
