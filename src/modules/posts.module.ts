import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { PostsService } from '../services'
import { PostsController } from '../controllers'
import { User, Post } from '../models'
import { FilesModule } from './'
import { Like } from '../likes/likes.model'

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [SequelizeModule.forFeature([User, Post, Like]), FilesModule],
})
export class PostsModule {}
