import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { filter } from 'lodash'

import { Post } from '../models'
import { Like } from './likes.model'
import { CreateLikeDto } from './dto/create-like.dto'

@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Like) private likeRepository: typeof Like,
    @InjectModel(Post) private postRepository: typeof Post,
  ) {}

  async like(dto: CreateLikeDto) {
    const like = await this.likeRepository.create(dto)
    const post = await this.postRepository.findOne({ where: { id: like.postId } })
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
    }
    post.postLikes = post.postLikes.concat([like.userId.toString()])
    await post.save()
  }

  async unlike(postId: string, userId: string) {
    const like = await this.likeRepository.findOne({ where: { postId, userId } })
    const post = await this.postRepository.findOne({ where: { id: like.postId } })
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
    }
    post.postLikes = filter(post.postLikes, (like) => like !== userId)
    await post.save()
    return await this.likeRepository.destroy({ where: { postId, userId } })
  }
}
