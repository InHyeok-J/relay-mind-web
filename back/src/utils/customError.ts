export class CustomError extends Error {
    private httpStatusCode: number;
    private errorType: any;
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

    get JSON() {
        return {
            errorType: this.errorType,
            message: this.message,
            rawError: this.rawError,
            stack: this.stack,
        };
    }
}
