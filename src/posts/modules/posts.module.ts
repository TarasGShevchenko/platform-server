import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { PostsService } from '../services'
import { PostsController } from '../controllers'
import { Post } from '../models'
import { User } from '../../users/models'
import { FilesModule } from '../../files/modules'
import { Like } from '../../likes/models'

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [SequelizeModule.forFeature([User, Post, Like]), FilesModule],
})
export class PostsModule {}
