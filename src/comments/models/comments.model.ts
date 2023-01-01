import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

import { User } from '../../users/models'
import { Post } from '../../posts/models'

interface CommentsCreationAttrs {
  content: string
  userId: number
  postId: number
}

@Table({ tableName: 'comments' })
export class Comments extends Model<Comments, CommentsCreationAttrs> {
  @ApiProperty({ example: '1', description: 'ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @ApiProperty({ example: 'Comment', description: 'Comment content' })
  @Column({ type: DataType.STRING, allowNull: false })
  content: string

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number

  @ForeignKey(() => Post)
  @Column({ type: DataType.INTEGER })
  postId: number
}
