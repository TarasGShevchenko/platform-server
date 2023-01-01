import { forwardRef, Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { UsersController } from '../controllers'
import { UsersService } from '../services'
import { User, UserRoles } from '../models'
import { Role } from '../../roles/models'
import { Post } from '../../posts/models'
import { RolesModule } from '../../roles/modules'
import { AuthModule } from '../../auth/modules'

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User, Role, UserRoles, Post]), RolesModule, forwardRef(() => AuthModule)],
  exports: [UsersService],
})
export class UsersModule {}
