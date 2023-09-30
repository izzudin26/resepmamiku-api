import { ApiProperty } from '@nestjs/swagger'

export class RecipeData {
    @ApiProperty({
        description: 'title'
    })
    title: string

    @ApiProperty({
        type: 'array'
    })
    steps: string[]
}

export class RecipeResponse {
    @ApiProperty({
        default: 'name of recipe'
    })
    name: string

    @ApiProperty({
        default: 'category of recipe'
    })
    category: string

    @ApiProperty({
        default: 'instagram username'
    })
    author: string

    @ApiProperty({
        default: 'image url'
    })
    image: string

    @ApiProperty({
        default: 'instagram video embed'
    })
    video?: string

    @ApiProperty({})
    recipeData: RecipeData[]
}