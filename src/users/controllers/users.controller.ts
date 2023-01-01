import { Body, Controller, Get, Param, Post, Patch, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { CreateUserDto } from '../dto'
import { AddRoleDto, BanUserDto } from '../../roles/dto'
import { UsersService } from '../services'
import { User } from '../models'
// import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { Roles } from '../../utils'
import { RolesGuard } from '../../guards'
// import { ValidationPipe } from '../utils'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'User creation' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto)
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers()
  }

  @ApiOperation({ summary: 'Get user by name' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(RolesGuard)
  @Get(':username')
  getUserByUsername(@Param('username') username: string) {
    return this.usersService.getUserByUsername(username)
  }

  @ApiOperation({ summary: 'Get user by email' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(RolesGuard)
  @Get(':email')
  getUserByEmail(@Param('email') email: string) {
    return this.usersService.getUserByEmail(email)
  }
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(RolesGuard)
  @Patch('/:id/update')
  updateUser(
    @Param('id') id: string,
    @Body('avatarLogo') avatarLogo: string,
    @Body('avatarBackground') avatarBackground: string,
  ) {
    return this.usersService.updateUser(id, avatarLogo, avatarBackground)
  }

  @ApiOperation({ summary: 'Issue a role' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto)
  }

  @ApiOperation({ summary: 'Ban user' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.usersService.ban(dto)
  }
}
