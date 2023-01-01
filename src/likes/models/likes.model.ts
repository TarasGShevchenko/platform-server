import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

import { User } from '../../users/models'
import { Post } from '../../posts/models'

interface LikeCreationAttrs {
  userId: number
  postId: number
}

@Table({ tableName: 'likes' })
export class Like extends Model<Like, LikeCreationAttrs> {
  @ApiProperty({ example: '1', description: 'ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number

  @ForeignKey(() => Post)
  @Column({ type: DataType.INTEGER })
  postId: number
}
