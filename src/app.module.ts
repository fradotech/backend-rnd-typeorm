import { Module, ValidationPipe } from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from 'dotenv'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { dataSourceOptions } from './database/data-source'
import { HealthModule } from './health/health.module'
import { UserModule } from './user/user.module'

config()

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), HealthModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
