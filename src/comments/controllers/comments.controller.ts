import {Body, Controller, Delete, Get, Param, Post, UseInterceptors} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { CreateCommentDto } from '../dto'
import { CommentsService } from '../services'
import { Comments } from '../models'

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @ApiOperation({ summary: 'Get users comments' })
  @ApiResponse({ status: 200, type: [Comments] })
  @Get('/postComment/:postId')
  getPostComments(@Param('postId') postId: string) {
    return this.commentService.getPostComments(postId)
  }

  @ApiOperation({ summary: 'Comment creation' })
  @ApiResponse({ status: 200, type: Comments })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() dto: CreateCommentDto) {
    return this.commentService.create(dto)
  }

  @ApiOperation({ summary: 'Comment deleting' })
  @ApiResponse({ status: 200, type: Comments })
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.commentService.deleteComment(id)
  }
}
