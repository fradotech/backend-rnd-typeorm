import { Controller, Get } from '@nestjs/common';
import { UserNativeQueryService } from './user-native-query.service';

@Controller('users/native')
export class UserNativeController {
  constructor(private readonly userOriginalService: UserNativeQueryService) {}

  @Get('1/relation')
  find1Relation() {
    return this.userOriginalService.find1Relation();
  }

  @Get('10/relation')
  find10Relation() {
    return this.userOriginalService.find10Relation();
  }

  @Get('3/nested')
  find3Nested() {
    return this.userOriginalService.find3Nested();
  }
}
