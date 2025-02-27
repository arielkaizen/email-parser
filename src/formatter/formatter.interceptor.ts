import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpException } from '@nestjs/common';
import { map, catchError, Observable } from 'rxjs';
import { ErrorMessages } from 'src/common/error-codes';

@Injectable()
export class FormatterInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        data: data,
      })),
      catchError(err => {
        throw new HttpException(ErrorMessages[err.code] || err.message || 'An error occurred', err.status);
      }),
    );
  }
}