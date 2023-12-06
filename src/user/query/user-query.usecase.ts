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
      return [{ name: 'TODO: Split!' }];
    }

    switch (request.testCase) {
      case UserTestCaseEnum.TC1Relation:
        return await this.userQueryNativeService.find1Relation(request);
      case UserTestCaseEnum.TC10Relation:
        return await this.userQueryNativeService.find10Relation(request);
      case UserTestCaseEnum.TC3Nested:
        return await this.userQueryNativeService.find3Nested(request);
      default:
        throw new BadRequestException();
    }
  }
}
