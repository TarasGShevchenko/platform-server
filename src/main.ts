import { NestFactory } from '@nestjs/core'
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'

import { AppModule } from './app.module'
import { appTitle, appDescription } from './config'
import { configureSwagger } from './utils'
// import { ValidationPipe } from './pipes/validation.pipe'

async function start() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule, { cors: true })
  // app.enableCors()

  configureSwagger(app, appTitle, appDescription)

  // app.useGlobalPipes(new ValidationPipe())

  app.use(cookieParser())

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
}

start()
