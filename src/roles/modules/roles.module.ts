import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { RolesService } from '../services'
import { RolesController } from '../controllers'
import { Role } from '../models'
import { User, UserRoles } from '../../users/models'

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
  exports: [RolesService],
})
export class RolesModule {}
