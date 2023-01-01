import { Body, Controller, Delete, Param, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { Like } from '../models'
import { LikesService } from '../services'
import { CreateLikeDto } from '../dto'

@ApiTags('Likes')
@Controller('likes')
export class LikesController {
  constructor(private likeService: LikesService) {}

  @ApiOperation({ summary: 'Like add' })
  @ApiResponse({ status: 200, type: Like })
  @Post()
  like(@Body() dto: CreateLikeDto) {
    return this.likeService.like(dto)
  }

  @ApiOperation({ summary: 'Like deleting' })
  @ApiResponse({ status: 200, type: Like })
  @Delete('/:postId/:userId')
  unlike(@Param('postId') postId: string, @Param('userId') userId: string) {
    return this.likeService.unlike(postId, userId)
  }
}
