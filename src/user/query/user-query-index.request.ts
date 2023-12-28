import { IsEnum, IsOptional, IsString } from 'class-validator'
import { UserTestCaseEnum } from '../user.entity'

export type UserQueryWhereType = 'join' | 'in' | 'exist'

export class UserQueryIndexRequest {
  @IsOptional()
  @IsEnum(UserTestCaseEnum)
  testCase: string

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  whereType?: UserQueryWhereType
}
