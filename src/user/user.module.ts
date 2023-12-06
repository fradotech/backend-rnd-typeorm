import { Module } from '@nestjs/common';
import { UserQueryNativeService } from './query/user-query-native.service';
import { UserQueryController } from './query/user-query.controller';
import { UserQueryUsecase } from './query/user-query.usecase';

@Module({
  controllers: [UserQueryController],
  providers: [UserQueryNativeService, UserQueryUsecase],
})
export class UserModule {}
