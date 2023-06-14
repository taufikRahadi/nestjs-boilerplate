import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './application/app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ConfigService } from '@nestjs/config'
import {
  HttpException,
  HttpStatus,
  Logger,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common'
import { ResponseFormatter } from './common/interceptors/response.interceptor'
import { ErrorFormatterInterceptor } from './common/interceptors/error-formatter.interceptor'
import { ValidationError } from 'class-validator'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // USE INTERCEPTOR, MIDDLEWARE, PIPE etc
  app.setGlobalPrefix('/api')

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map((error) => {
          const { property, constraints } = error

          const keys = Object.keys(constraints)

          const msgs: string[] = []

          keys.forEach((key) => {
            msgs.push(`${constraints[key]}`)
          })

          return {
            field: property,
            errors: msgs,
          }
        })

        throw new HttpException(messages, HttpStatus.UNPROCESSABLE_ENTITY)
      },
    }),
  )

  app.useGlobalInterceptors(new ResponseFormatter(new Reflector()))
  app.useGlobalInterceptors(new ErrorFormatterInterceptor())

  const LOGGER_CONTEXT = 'NestApplication'
  const configService = app.get<ConfigService>(ConfigService)
  const logger = new Logger()

  const projectName = configService.get<string>('PROJECT_NAME')
  // IMPLEMENT SWAGGER
  const swaggerConfig = new DocumentBuilder()
    .setTitle(projectName)
    .setDescription(`API Playground for ${projectName}`)
    .setVersion('0.0.1')
    .addBearerAuth()
    .setBasePath('/api')
    .build()
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig, {})
  SwaggerModule.setup('docs', app, swaggerDocument, { useGlobalPrefix: true })

  const port = configService.get<number>('APP_PORT') ?? 8080
  await app.listen(port)

  logger.log(`Application is running on port ${port}`, LOGGER_CONTEXT)
}

bootstrap()
