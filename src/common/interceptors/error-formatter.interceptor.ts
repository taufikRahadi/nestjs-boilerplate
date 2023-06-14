import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common'
import { Observable, catchError, throwError } from 'rxjs'

@Injectable()
export class ErrorFormatterInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((err: HttpException | any) =>
        throwError(() => {
          const errorType = err instanceof HttpException

          console.log(err)

          if (!errorType)
            return new InternalServerErrorException({
              response_schema: {
                response_status: this.parseStatusCode(
                  HttpStatus.INTERNAL_SERVER_ERROR,
                ),
                response_message: 'Internal server error',
              },
              response_output: null,
            })

          const statusCode = err.getStatus()
            ? err.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR
          const errorMessage = err.message

          const errorObject: { [k: string]: any } = err.getResponse() as any

          let errors: any

          if (Array.isArray(errorObject)) {
            errors = errorObject
          } else {
            if ('errors' in errorObject && Array.isArray(errorObject.errors)) {
              errors = errorObject.errors
            } else {
              errors = null
            }
          }

          return new HttpException(
            {
              response_schema: {
                response_code: this.parseStatusCode(statusCode),
                response_message: errorMessage,
              },
              response_output: errors ? errors : null,
            },
            err.getStatus(),
          )
        }),
      ),
    )
  }

  private parseStatusCode(statusCode: HttpStatus) {
    const projectName = process.env.PROJECT_NAME
    const projectCode = process.env.SERVICE_NAME

    return `${projectName}-${projectCode}-${statusCode}`
  }
}
