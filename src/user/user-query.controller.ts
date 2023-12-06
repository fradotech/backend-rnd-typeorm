import { Controller, Get, Query } from '@nestjs/common';
import { UserIndexRequest } from './user-index.request';
import { UserQueryUsecase } from './user-query.usecase';

@Controller('users')
export class UserQueryController {
  constructor(private readonly userQueryUsecase: UserQueryUsecase) {}

  @Get('native')
  async native(@Query() request: UserIndexRequest) {
    return await this.userQueryUsecase.index(request);
  }

  @Get('split')
  async split(@Query() request: UserIndexRequest) {
    return await this.userQueryUsecase.index(request, true);
  }
}
