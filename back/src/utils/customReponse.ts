import { response, Response } from 'express';

response.customSuccess = function (
    httpStatusCode: number,
    message: string,
    data: any = null
): Response {
    return this.status(httpStatusCode).send({ message, success: true, data });
};

response.customFail = function (
    httpStatusCode: number,
    message: string,
    data: any = null
): Response {
    return this.status(httpStatusCode).send({ message, success: false, data });
};
