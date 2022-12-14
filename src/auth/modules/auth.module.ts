import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { AuthController } from '../controllers'
import { AuthService } from '../services'
import { UsersModule } from '../../users/modules'

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
