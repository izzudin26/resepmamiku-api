import { Controller, Get, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ResepMamikuService } from './resepMamiku.service';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RecipeResponse } from './types/RecipeResponse';
import { CategoryResponse } from './types/categoryResponse';
import { AxiosError } from 'axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly service: ResepMamikuService) { }

  @Get()
  getHello() {
    return {
      status: 'Running',
      timestamp: Date.now(),
    };
  }

  @ApiTags('Recipe')
  @ApiResponse({ type: RecipeResponse })
  @ApiParam({
    name: 'recipeurl',
    example: 'roasted-milk-tea-sarongsarie'
  })
  @Get('/recipe/:recipeurl')
  async getRecipce(@Param('recipeurl') url: string) {
    return await this.service.getRecipe({ url }).catch((err: AxiosError) => {
      throw new HttpException(err.response.statusText, err.response.status)
    })
  }

  @Get('/category/:name')
  @ApiTags('Category')
  @ApiParam({
    name: 'name',
    description: 'category name',
    example: 'kue'
  })
  @ApiResponse({ type: CategoryResponse })
  async getCategoryName(@Param('name') name: string, @Query('page') page: string) {
    const c = await this.service.getCategory({ name, page: page ?? '1' }).catch((err: AxiosError) => {
      throw new HttpException(err.response.statusText, err.response.status)
    })
    return c
  }

  @ApiTags('Recipe')
  @ApiResponse({ type: CategoryResponse })
  @Get('search')
  async search(
    @Query('ingredements') ingredements: string,
    @Query('recipe') recipe: string
  ) {
    console.log({ ingredements, recipe })
    if (!ingredements && !recipe) throw new HttpException('Please fill query ingredements or recipe', HttpStatus.BAD_REQUEST)
    let c: CategoryResponse[]

    if (recipe) c = await this.service.searchByName({
      name: recipe
    })

    if (ingredements) c = await this.service.searchByIngredements({
      ingredements: ingredements.split(',')
    })

    if (c.length <= 0) throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    return c
  }

}
