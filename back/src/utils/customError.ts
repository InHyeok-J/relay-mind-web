export class CustomError extends Error {
    private httpStatusCode: number;
    private errorType: ErrorType;
    private rawError: any;

    constructor(
        httpStatusCode: number,
        errorType: any,
        message: string,
        rawError: any
    ) {
        super(message);
        console.log('에러발생', rawError);
        this.httpStatusCode = httpStatusCode;
        this.errorType = errorType;
        this.rawError = rawError;
    }

    get HttpStatusCode() {
        return this.httpStatusCode;
    }

    get JSON(): ErrorResponse {
        return {
            errorType: this.errorType,
            message: this.message,
            rawError: this.rawError,
        };
    }
}

export type ErrorType =
    | 'Unknown'
    | 'Validate'
    | 'Exist'
    | 'Not Exist'
    | 'Unauthorized'
    | 'Session';

export type ErrorResponse = {
    errorType: ErrorType;
    message: string;
    rawError: any;
};
