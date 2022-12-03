import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { CreatePostDto } from '../dto'
import { Post } from '../models'
import { FilesService } from '.'

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postRepository: typeof Post, private fileService: FilesService) {}

  async create(dto: CreatePostDto, image: any) {
    const fileName = await this.fileService.createFile(image)
    return await this.postRepository.create({ ...dto, image: fileName })
  }

  async getPosts() {
    return await this.postRepository.findAll({ include: { all: true } })
  }

  async getUserPosts(id: string) {
    return await this.postRepository.findAll({ where: { userId: id }, include: { all: true } })
  }

  async getPostById(id: string) {
    return await this.postRepository.findOne({ where: { id }, include: { all: true } })
  }

  async deletePost(id: string) {
    return await this.postRepository.destroy({ where: { id } })
  }
}
