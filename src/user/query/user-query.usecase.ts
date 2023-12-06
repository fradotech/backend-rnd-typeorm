import { BadRequestException, Injectable } from '@nestjs/common';
import { UserQueryIndexRequest } from './user-query-index.request';
import { UserQueryNativeService } from './user-query-native.service';
import { UserTestCaseEnum } from '../user.entity';

@Injectable()
export class UserQueryUsecase {
  constructor(
    private readonly userQueryNativeService: UserQueryNativeService,
  ) {}

  async index(request: UserQueryIndexRequest, isSplit?: boolean) {
    if (isSplit) {
      return [];
    }

    switch (request.testCase) {
      case UserTestCaseEnum.T1Relation:
        return await this.userQueryNativeService.find1Relation(request);
      case UserTestCaseEnum.T10Relation:
        return await this.userQueryNativeService.find10Relation(request);
      case UserTestCaseEnum.T3Nested:
        return await this.userQueryNativeService.find3Nested(request);
      default:
        throw new BadRequestException(
          'Invalid testCase. Valid testCases are: T1Relation, T10Relation, T3Nested',
        );
    }
  }
}
