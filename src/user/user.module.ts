import { Module } from '@nestjs/common'
import { UserQueryNativeService } from './query/user-query-native.service'
import { UserQueryController } from './query/user-query.controller'
import { UserQueryUsecase } from './query/user-query.usecase'
import { UserQuerySplitService } from './query/user-query-split.service'

@Module({
  controllers: [UserQueryController],
  providers: [UserQueryNativeService, UserQuerySplitService, UserQueryUsecase],
})
export class UserModule {}
