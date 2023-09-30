import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { HttpRequestService } from 'src/http-request/http-request.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, HttpRequestService]
})
export class CategoryModule { }
