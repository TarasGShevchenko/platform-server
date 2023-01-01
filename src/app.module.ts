import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
// import { MulterModule } from '@nestjs/platform-express'
import * as path from 'path'

import { User, UserRoles } from './users/models'
import { UsersModule } from './users/modules'
import { Role } from './roles/models'
import { RolesModule } from './roles/modules'
import { AuthModule } from './auth/modules'
import { Post } from './posts/models'
import { PostsModule } from './posts/modules'
import { FilesModule } from './files/modules'
import { Comments } from './comments/models'
import { CommentsModule } from './comments/modules'
import { Like } from './likes/models'
import { LikesModule } from './likes/modules'

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
      models: [User, Role, UserRoles, Post, Comments, Like],
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
