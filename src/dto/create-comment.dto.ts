import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateCommentDto {
  @ApiProperty({ example: 'Comment', description: 'Comment content' })
  @IsString({ message: 'Must be a string' })
  readonly content: string

  readonly userId: number
  readonly postId: number
}
