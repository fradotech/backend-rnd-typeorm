import { Injectable } from '@nestjs/common';
import { UserIndexRequest } from './user-index.request';
import { UserNativeQueryService } from './native-query/user-native-query.service';

@Injectable()
export class UserQueryUsecase {
  constructor(
    private readonly userNativeQueryService: UserNativeQueryService,
  ) {}

  async find1Relation(request: UserIndexRequest, isSplit?: boolean) {
    if (isSplit) return [];
    return await this.userNativeQueryService.find1Relation(request);
  }

  async find10Relation(request: UserIndexRequest, isSplit?: boolean) {
    if (isSplit) return [];
    return await this.userNativeQueryService.find10Relation(request);
  }

  async find3Nested(request: UserIndexRequest, isSplit?: boolean) {
    if (isSplit) return [];
    return await this.userNativeQueryService.find3Nested(request);
  }
}
