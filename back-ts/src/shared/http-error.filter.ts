import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpErrorfilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();
    const status = exception.getStatus();
    const errorresponse = {
      code: status,
      times: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      message: exception.message.error || exception.message || null,
    };

    response.status(status).json(errorresponse);
  }
}


