import { Module } from '@nestjs/common';
import { UserNativeQueryService } from './native-query/user-native-query.service';
import { UserNativeQueryController } from './native-query/user-native-query.controller';
import { UserQueryUsecase } from './user-query.usecase';

@Module({
  controllers: [UserNativeQueryController],
  providers: [UserNativeQueryService, UserQueryUsecase],
})
export class UserModule {}
