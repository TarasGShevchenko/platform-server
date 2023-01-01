import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { Post } from '../../posts/models'
import { LikesService } from '../services'
import { LikesController } from '../controllers'
import { Like } from '../models'

@Module({
  providers: [LikesService],
  controllers: [LikesController],
  imports: [SequelizeModule.forFeature([Post, Like])],
})
export class LikesModule {}
