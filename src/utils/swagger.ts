import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'

export function configureSwagger(app: INestApplication, title: string, description: string): void {
  const options = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion('1.0.0')
    .addTag('starg')
    .build()

  const document = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup('swagger', app, document as OpenAPIObject)
}
