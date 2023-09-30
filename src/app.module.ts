import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestInterceptor } from './interceptors/rest.interceptor'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { HttpRequestService } from './http-request/http-request.service';
import { ResepMamikuService } from './resepMamiku.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RestInterceptor
    },
    AppService,
    HttpRequestService, ResepMamikuService],
})
export class AppModule { }
