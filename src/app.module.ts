import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { MulterModule } from '@nestjs/platform-express'
import * as path from 'path'

import { UsersModule } from './modules/users.module'
import { User } from './models/users.model'
import { RolesModule } from './modules/roles.module'
import { Role } from './models/roles.model'
import { UserRoles } from './models/user-roles.model'
import { AuthModule } from './modules/auth.module'
import { PostsModule } from './modules/posts.module'
import { Post } from './models/posts.model'
import { FilesModule } from './modules/files.module'
import { Comment } from './models/comments.model'
import { CommentsModule } from './modules/comments.module'
import { LikesModule } from './likes/likes.module'
import { Like } from './likes/likes.model'

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    // MulterModule.register({
    //   dest: './static',
    // }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Post, Comment, Like],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
    FilesModule,
    CommentsModule,
    LikesModule,
  ],
})
export class AppModule {}
