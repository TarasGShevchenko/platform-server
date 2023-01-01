import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreatePostDto {
  @ApiProperty({ example: 'Post', description: 'Post title' })
  @IsString({ message: 'Must be a string' })
  readonly title: string
  @ApiProperty({ example: 'Its my post', description: 'Post content' })
  @IsString({ message: 'Must be a string' })
  readonly content: string

  readonly image: string

  readonly userId: number
}
