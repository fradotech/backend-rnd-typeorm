import { Module } from '@nestjs/common';
import { UserNativeQueryService } from './native-query/user-native-query.service';
import { UserQueryController } from './user-query.controller';
import { UserQueryUsecase } from './user-query.usecase';

@Module({
  controllers: [UserQueryController],
  providers: [UserNativeQueryService, UserQueryUsecase],
})
export class UserModule {}
