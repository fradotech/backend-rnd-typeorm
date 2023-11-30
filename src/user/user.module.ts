import { Module } from '@nestjs/common';
import { UserNativeQueryService } from './user-native-query.service';
import { UserNativeController } from './user-native-query.controller';

@Module({
  controllers: [UserNativeController],
  providers: [UserNativeQueryService],
})
export class UserModule {}
