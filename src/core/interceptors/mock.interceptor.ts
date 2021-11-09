import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class MocksInterceptor implements NestInterceptor {
  mocksport: string;

  constructor(mocks) {
    this.mocksport = mocks;
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const httpService: HttpService = new HttpService();
    httpService.axiosRef.interceptors.request.use(config => {
      console.log(config);
      const url = config.url;
      const re = /^\w+([.:\/]+\w*)?([.:]\w*)*/gm;
      const mockURL = `http://localhost:${this.mocksport}`;
      config.url = url.replace(re, mockURL);
      return config;
    });

    return next.handle();
  }
}
