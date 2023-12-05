import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserTestCaseEnum } from './user.entity';

export class UserIndexRequest {
  @IsOptional()
  @IsEnum(UserTestCaseEnum)
  testCase: string;

  @IsOptional()
  @IsString()
  name?: string;
}
