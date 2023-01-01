import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { CreateCommentDto } from '../dto'
import { Comments } from '../models'
import { Post } from '../../posts/models'

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments) private commentRepository: typeof Comments,
    @InjectModel(Post) private postRepository: typeof Post,
  ) {}

  async create(dto: CreateCommentDto) {
    const comment = await this.commentRepository.create(dto)
    const post = await this.postRepository.findOne({ where: { id: comment.postId } })
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
    }
    post.commentCount = post.commentCount + 1
    await post.save()
    return comment
  }

  async getPostComments(id: string) {
    return await this.commentRepository.findAll({ where: { postId: id }, include: { all: true } })
  }

  async deleteComment(id: string) {
    const comment = await this.commentRepository.findOne({ where: { id } })
    const post = await this.postRepository.findOne({ where: { id: comment.postId } })
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
    }
    post.commentCount = post.commentCount - 1
    await post.save()
    return await this.commentRepository.destroy({ where: { id } })
  }
}
