import { BadRequestException, Injectable } from '@nestjs/common';
import { UserIndexQueryRequest } from './user-index-query.request';
import { UserNativeQueryService } from './user-native-query.service';
import { UserTestCaseEnum } from '../user.entity';

@Injectable()
export class UserQueryUsecase {
  constructor(
    private readonly userNativeQueryService: UserNativeQueryService,
  ) {}

  async index(request: UserIndexQueryRequest, isSplit?: boolean) {
    if (isSplit) {
      return [];
    }

    switch (request.testCase) {
      case UserTestCaseEnum.T1Relation:
        return await this.userNativeQueryService.find1Relation(request);
      case UserTestCaseEnum.T10Relation:
        return await this.userNativeQueryService.find10Relation(request);
      case UserTestCaseEnum.T3Nested:
        return await this.userNativeQueryService.find3Nested(request);
      default:
        throw new BadRequestException(
          'Invalid testCase. Valid testCases are: T1Relation, T10Relation, T3Nested',
        );
    }
  }
}
