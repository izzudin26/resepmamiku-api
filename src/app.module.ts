import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestInterceptor } from './interceptors/rest.interceptor'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { HttpRequestService } from './http-request/http-request.service';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [CategoryModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RestInterceptor
    },
    AppService,
    HttpRequestService],
})
export class AppModule { }
