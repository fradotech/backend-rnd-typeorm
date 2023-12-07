import { BadRequestException, Injectable } from '@nestjs/common';
import { UserQueryIndexRequest } from './user-query-index.request';
import { UserQueryNativeService } from './user-query-native.service';
import { UserTestCaseEnum } from '../user.entity';
import { UserQuerySplitService } from './user-query-split.service';

@Injectable()
export class UserQueryUsecase {
  constructor(
    private readonly userQueryNativeService: UserQueryNativeService,
    private readonly userQuerySplitService: UserQuerySplitService,
  ) {}

  async index(request: UserQueryIndexRequest, isSplit?: boolean) {
    switch (request.testCase) {
      case UserTestCaseEnum.TC1Relation:
        if (isSplit) {
          return await this.userQuerySplitService.find1Relation(request);
        }

        return await this.userQueryNativeService.find1Relation(request);

      case UserTestCaseEnum.TC10Relation:
        if (isSplit) {
          return await this.userQuerySplitService.find10Relation(request);
        }

        return await this.userQueryNativeService.find10Relation(request);

      case UserTestCaseEnum.TC3Nested:
        if (isSplit) {
          return await this.userQuerySplitService.find3Nested(request);
        }

        return await this.userQueryNativeService.find3Nested(request);

      default:
        throw new BadRequestException();
    }
  }
}
