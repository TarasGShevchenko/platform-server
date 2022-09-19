import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { RolesService } from '../services'
import { RolesController } from '../controllers'
import { Role, User, UserRoles } from '../models'

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
  exports: [RolesService],
})
export class RolesModule {}
