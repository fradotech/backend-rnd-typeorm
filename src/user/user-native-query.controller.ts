import { Controller, Get } from '@nestjs/common';
import { UserNativeQueryService } from './user-native-query.service';

@Controller('users/native')
export class UserNativeController {
  constructor(private readonly userOriginalService: UserNativeQueryService) {}

  @Get('1/relation')
  async find1Relation() {
    return await this.userOriginalService.find1Relation();
  }

  @Get('10/relation')
  async find10Relation() {
    return await this.userOriginalService.find10Relation();
  }

  @Get('3/nested')
  async find3Nested() {
    return await this.userOriginalService.find3Nested();
  }
}
