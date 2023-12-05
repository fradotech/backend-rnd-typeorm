import { Module } from '@nestjs/common';
import { UserNativeQueryService } from './user-native-query.service';
import { UserNativeQueryController } from './user-native-query.controller';

@Module({
  controllers: [UserNativeQueryController],
  providers: [UserNativeQueryService],
})
export class UserModule {}
