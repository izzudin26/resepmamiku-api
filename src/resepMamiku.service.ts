import { Injectable } from '@nestjs/common';
import { BASE_URL, HttpRequestService } from './http-request/http-request.service'
import { load } from 'cheerio'
import { CategoryResponse } from './types/categoryResponse'
import { RecipeData, RecipeResponse } from './types/RecipeResponse'

interface IGetCategory {
    name: string
    page: string
}

interface IGetRecipe {
    url: string
}

interface ISearchIngredements {
    ingredements: string[]
}

interface ISearchName {
    name: string
}

@Injectable()
export class ResepMamikuService {
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

    async searchByName({ name }: ISearchName) {
        const s = name.split(' ').join('+')
        const { data: res } = await this.request.http.get(`${BASE_URL}/resep/${s}`)
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

    async searchByIngredements({ ingredements }: ISearchIngredements) {
        const s = ingredements.join('_')
        const { data: res } = await this.request.http.get(`${BASE_URL}/jelajahi/semua/${s}`)
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

    async getRecipe({ url }: IGetRecipe) {
        const { data: res } = await this.request.http.get(`${BASE_URL}/${url}`)
        const $ = load(res)
        const content = $('.recipe-content')
        let recipeData: RecipeData[] = content.find('h2').map((i, elm) => {
            return <RecipeData>{
                title: $(elm).text(),
                steps: []
            }
        }).toArray()

        content.find('p').map((i, elm) => {
            recipeData[i].steps = $(elm).find('label').map((j, child) => $(child).text()).toArray()
        })

        return <RecipeResponse>{
            name: $('.entry-title').text(),
            author: $('.author > a').text(),
            category: $('.cat-links').text(),
            image: $('.post-thumbnail').attr('data-src'),
            video: $('.watch-recipe').attr('data-embed'),
            recipeData: recipeData
        }
    }
}
