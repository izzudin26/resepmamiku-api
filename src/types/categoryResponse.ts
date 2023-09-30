import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'

@Exclude()
export class CategoryResponse {
    @ApiProperty({
        default: 'name of recipe'
    })
    name: string

    @ApiProperty({
        default: 'image of recipe'
    })
    image: string

    @ApiProperty({
        default: 'instagram username author'
    })
    author: string
}