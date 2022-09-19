import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'

import { CreateUserDto } from '../dto'
import { UsersService } from './users.service'
import { User } from '../models'

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto)
    return this.generateToken(user)
  }

  async registration(userDto: CreateUserDto) {
    const clientUsername = await this.userService.getUserByUsername(userDto.username)
    const clientEmail = await this.userService.getUserByEmail(userDto.email)
    if (clientUsername) {
      throw new HttpException('User with this username exists', HttpStatus.BAD_REQUEST)
    }
    if (clientEmail) {
      throw new HttpException('User with this email exists', HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5)
    const user = await this.userService.createUser({ ...userDto, password: hashPassword })
    return this.generateToken(user)
  }

  private async generateToken(user: User) {
    const payload = { username: user.username, email: user.email, id: user.id, roles: user.roles }
    return {
      token: this.jwtService.sign(payload),
    }
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByUsername(userDto.username)
    const passwordEquals = await bcrypt.compare(userDto.password, user.password)
    if (user && passwordEquals) {
      return user
    }
    throw new UnauthorizedException({ message: 'Incorrect username or password' })
  }
}
