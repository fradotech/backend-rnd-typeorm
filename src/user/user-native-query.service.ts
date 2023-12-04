import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User, UserTestCaseEnum } from './user.entity';

@Injectable()
export class UserNativeQueryService {
  constructor(private readonly manager: EntityManager) {}

  async find1Relation() {
    return await this.manager
      .createQueryBuilder(User, 'users')
      .where('users.testCase = :testCase', {
        testCase: UserTestCaseEnum.T1Relation,
      })
      .innerJoinAndSelect('users.childs1', 'childs1')
      .getMany();
  }

  async find10Relation() {
    return await this.manager
      .createQueryBuilder(User, 'users')
      .where('users.testCase = :testCase', {
        testCase: UserTestCaseEnum.T10Relation,
      })
      .innerJoinAndSelect('users.childs1', 'childs1')
      .innerJoinAndSelect('users.childs2', 'childs2')
      .innerJoinAndSelect('users.childs3', 'childs3')
      .innerJoinAndSelect('users.childs4', 'childs4')
      .innerJoinAndSelect('users.childs5', 'childs5')
      .innerJoinAndSelect('users.childs6', 'childs6')
      .innerJoinAndSelect('users.childs7', 'childs7')
      .innerJoinAndSelect('users.childs8', 'childs8')
      .innerJoinAndSelect('users.childs9', 'childs9')
      .innerJoinAndSelect('users.childs10', 'childs10')
      .getMany();
  }

  async find3Nested() {
    return await this.manager
      .createQueryBuilder(User, 'users')
      .where('users.testCase = :testCase', {
        testCase: UserTestCaseEnum.T3Nested,
      })
      .innerJoinAndSelect('users.childs1', 'childs1')
      .innerJoinAndSelect('childs1.childs1', 'childs1_childs1')
      .innerJoinAndSelect('childs1_childs1.childs1', 'childs1_childs1_childs1')
      .innerJoinAndSelect(
        'childs1_childs1_childs1.childs1',
        'childs1_childs1_childs1_childs1',
      )
      .getMany();
  }
}
