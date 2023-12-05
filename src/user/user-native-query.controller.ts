import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { UserNativeQueryService } from './user-native-query.service';
import { UserTestCaseEnum } from './user.entity';
import { UserIndexRequest } from './user-index.request';

@Controller('users/native')
export class UserNativeController {
  constructor(private readonly userOriginalService: UserNativeQueryService) {}

  @Get()
  async find1Relation(@Query() request: UserIndexRequest) {
    switch (request.testCase) {
      case UserTestCaseEnum.T1Relation:
        return await this.userOriginalService.find1Relation(request);
      case UserTestCaseEnum.T10Relation:
        return await this.userOriginalService.find10Relation(request);
      case UserTestCaseEnum.T3Nested:
        return await this.userOriginalService.find3Nested(request);
      default:
        throw new BadRequestException(
          'Invalid testCase. Valid testCases are: T1Relation, T10Relation, T3Nested',
        );
    }
  }
}
