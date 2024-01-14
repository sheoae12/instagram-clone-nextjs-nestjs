import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";
import { getCurrentDate } from "../util/date";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch (exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response 
            .status(status)
            .json({
                statusCode: status,
                message: exception.message,
                timestamp: getCurrentDate().toISOString(),
                path: request.url
            })
    }
}