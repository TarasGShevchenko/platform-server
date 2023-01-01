import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { CommentsService } from '../services'
import { CommentsController } from '../controllers'
import { Comments } from '../models'
import { User } from '../../users/models'
import { Post } from '../../posts/models'

@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
  imports: [SequelizeModule.forFeature([User, Post, Comments])],
})
export class CommentsModule {}
