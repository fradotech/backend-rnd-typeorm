import { IsEnum, IsOptional, IsString } from 'class-validator'
import { UserTestCaseEnum } from '../user.entity'

export class UserQueryIndexRequest {
  @IsOptional()
  @IsEnum(UserTestCaseEnum)
  testCase: string

  @IsOptional()
  @IsString()
  name?: string
}
