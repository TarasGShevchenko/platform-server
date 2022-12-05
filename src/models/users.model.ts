import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

import { Role, UserRoles, Post } from './'

interface UserCreationAttrs {
  username: string
  email: string
  password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @ApiProperty({ example: 'User', description: 'Username' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  username: string

  @ApiProperty({ example: 'user@mail.com', description: 'Email' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string

  @ApiProperty({ example: '12345678', description: 'Password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string

  @ApiProperty({ example: 'hackerj', description: 'Avatar logo' })
  @Column({ type: DataType.STRING, allowNull: true })
  avatarLogo: string

  @ApiProperty({ example: '#FFFFFF', description: 'Avatar background' })
  @Column({ type: DataType.STRING, allowNull: true })
  avatarBackground: string

  @ApiProperty({ example: 'true', description: 'Banned or not' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean

  @ApiProperty({ example: 'Censorship', description: 'Reason for blocking' })
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[]

  @HasMany(() => Post)
  posts: Post[]
}
