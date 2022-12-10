import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

import { User, Comment } from './'
import { Like } from '../likes/likes.model'

interface PostCreationAttrs {
  title: string
  content: string
  userId: number
  image: string
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs> {
  @ApiProperty({ example: '1', description: 'ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @ApiProperty({ example: 'Post', description: 'Post title' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string

  @ApiProperty({ example: 'Its my post', description: 'Post content' })
  @Column({ type: DataType.STRING, allowNull: false })
  content: string

  @ApiProperty({ example: 'File', description: 'Image' })
  @Column({ type: DataType.STRING })
  image: string

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number

  @BelongsTo(() => User)
  author: User

  @ForeignKey(() => Comment)
  @Column({ type: DataType.INTEGER })
  commentCount: number

  @ForeignKey(() => Like)
  @Column({ type: DataType.JSONB, defaultValue: [] })
  postLikes: string[]
}
