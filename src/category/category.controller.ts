import { Controller, Get, Param, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryResponse } from 'src/types/categoryResponse';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get(':name')
  @ApiTags('Category')
  @ApiResponse({ type: CategoryResponse })
  async getCategoryName(@Param('name') name: string, @Query('page') page: string) {
    const c = await this.categoryService.getCategory({ name, page: page ?? '1' })
    return c
  }
}
