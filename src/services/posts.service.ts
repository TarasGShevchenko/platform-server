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
    const post = await this.postRepository.create({ ...dto, image: fileName })
    return post
  }

  async getPosts() {
    const posts = await this.postRepository.findAll({ include: { all: true } })
    return posts
  }

  async getUserPosts(id: string) {
    const posts = await this.postRepository.findAll({ where: { userId: id }, include: { all: true } })
    return posts
  }

  async getPostById(id: string) {
    const posts = await this.postRepository.findOne({ where: { id }, include: { all: true } })
    return posts
  }

  async deletePost(id: string) {
    return await this.postRepository.destroy({ where: { id } })
  }
}
