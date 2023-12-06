import { Module } from '@nestjs/common';
import { UserNativeQueryService } from './query/user-native-query.service';
import { UserQueryController } from './query/user-query.controller';
import { UserQueryUsecase } from './query/user-query.usecase';

@Module({
  controllers: [UserQueryController],
  providers: [UserNativeQueryService, UserQueryUsecase],
})
export class UserModule {}
