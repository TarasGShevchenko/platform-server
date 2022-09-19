import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { User } from '../models'
import { CreateUserDto, AddRoleDto, BanUserDto } from '../dto'
import { RolesService } from './roles.service'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User, private roleService: RolesService) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto)
    const role = await this.roleService.getRoleByValue('ADMIN')
    await user.$set('roles', [role.id])
    user.roles = [role]
    return user
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } })
    return users
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({ where: { username }, include: { all: true } })
    return user
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email }, include: { all: true } })
    return user
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId)
    const role = await this.roleService.getRoleByValue(dto.value)
    if (role && user) {
      await user.$add('role', role.id)
      return dto
    }
    throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId)
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
    }
    user.banned = true
    user.banReason = dto.banReason
    await user.save()
    return user
  }
}
