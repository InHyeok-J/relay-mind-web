import { User as IUser } from './../entity/User';
export {};

declare global {
    namespace Express {
        export interface User extends IUser {}
        export interface Response {
            customSuccess(
                httpStatusCode: number,
                message: string,
                data?: any
            ): Response;
            customFail(
                httpStatusCode: number,
                message: string,
                data?: any
            ): Response;
        }
    }
}
