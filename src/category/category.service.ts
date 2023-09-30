import { Injectable } from '@nestjs/common';
import { BASE_URL, HttpRequestService } from '../http-request/http-request.service'
import { load } from 'cheerio'
import { CategoryResponse } from '../types/categoryResponse'

interface IGetCategory {
    name: string
    page: string
}

@Injectable()
export class CategoryService {
    constructor(
        private readonly request: HttpRequestService
    ) { }

    async getCategory({ name, page }: IGetCategory) {
        const { data: res } = await this.request.http.get(`${BASE_URL}/${name}/page/${page}`)
        const $ = load(res)
        const body = $('div')
        const recipeCards = body.find('article')
        return recipeCards.map((i, elm) => {
            return <CategoryResponse>{
                name: load(elm)('a').text().trim(),
                author: load(elm)('.author').text(),
                image: load(elm)('img').attr('data-src'),
            }
        }).toArray()
    }
}
