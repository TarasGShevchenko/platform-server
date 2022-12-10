import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { Post } from '../models'
import { LikesService } from './likes.service'
import { LikesController } from './likes.controller'
import { Like } from './likes.model'

@Module({
  providers: [LikesService],
  controllers: [LikesController],
  imports: [SequelizeModule.forFeature([Post, Like])],
})
export class LikesModule {}
