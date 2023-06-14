import { repl } from '@nestjs/core'
import { AppModule } from './application/app.module'

async function bootstrap() {
  await repl(AppModule)
}

bootstrap()
