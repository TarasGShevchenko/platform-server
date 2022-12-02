import {Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { CreatePostDto } from '../dto'
import { PostsService } from '../services'
import { Post as PostModel } from '../models'

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, type: [PostModel] })
  @Get()
  getPosts() {
    return this.postService.getPosts()
  }

  @ApiOperation({ summary: 'Get users posts' })
  @ApiResponse({ status: 200, type: [PostModel] })
  @Get('/user/:userId')
  getUserPosts(@Param('userId') userId: string) {
    return this.postService.getUserPosts(userId)
  }

  @ApiOperation({ summary: 'Get post by id' })
  @ApiResponse({ status: 200, type: PostModel })
  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id)
  }

  @ApiOperation({ summary: 'Post creation' })
  @ApiResponse({ status: 200, type: PostModel })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() dto: CreatePostDto, @UploadedFile() image) {
    return this.postService.create(dto, image)
  }

  @ApiOperation({ summary: 'Post deleting' })
  @ApiResponse({ status: 200, type: PostModel })
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id)
  }
}
