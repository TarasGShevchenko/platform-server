import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { CommentsService } from '../services'
import { CommentsController } from '../controllers'
import {User, Post, Comment} from '../models'

@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
  imports: [SequelizeModule.forFeature([User, Post, Comment])],
})
export class CommentsModule {}
