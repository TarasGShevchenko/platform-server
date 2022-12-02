import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { CreateCommentDto } from '../dto'
import { Comment } from '../models'

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment) private commentRepository: typeof Comment) {}

  async create(dto: CreateCommentDto) {
    return await this.commentRepository.create(dto)
  }

  async getPostComments(id: string) {
    return  await this.commentRepository.findAll({ where: { postId: id }, include: { all: true } })
  }

  async deleteComment(id: string) {
    return await this.commentRepository.destroy({ where: { id } })
  }
}
