import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { UserTestCaseEnum } from '../user.entity';
import { UserIndexRequest } from '../user-index.request';
import { UserQueryUsecase } from '../user-query.usecase';

@Controller('users/native')
export class UserNativeQueryController {
  constructor(private readonly userQueryUsecase: UserQueryUsecase) {}

  @Get()
  async index(@Query() request: UserIndexRequest) {
    switch (request.testCase) {
      case UserTestCaseEnum.T1Relation:
        return await this.userQueryUsecase.find1Relation(request);
      case UserTestCaseEnum.T10Relation:
        return await this.userQueryUsecase.find10Relation(request);
      case UserTestCaseEnum.T3Nested:
        return await this.userQueryUsecase.find3Nested(request);
      default:
        throw new BadRequestException(
          'Invalid testCase. Valid testCases are: T1Relation, T10Relation, T3Nested',
        );
    }
  }
}
