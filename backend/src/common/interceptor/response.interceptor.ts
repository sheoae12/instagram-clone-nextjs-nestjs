import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    return next.handle().pipe(map((value) => {
        const response: any = { res_code: 200 }
        
        typeof value == 'string' ? response.res_message = value : null;
        typeof value == 'object' && value.length > 0 ? response.data = value : null;

        return response;
    }));
  }
}