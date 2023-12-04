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
      .leftJoinAndSelect('users.childs1', 'childs1')
      .getMany();
  }

  async find10Relation() {
    return await this.manager
      .createQueryBuilder(User, 'users')
      .where('users.testCase = :testCase', {
        testCase: UserTestCaseEnum.T10Relation,
      })
      .leftJoinAndSelect('users.childs1', 'childs1')
      .leftJoinAndSelect('users.childs2', 'childs2')
      .leftJoinAndSelect('users.childs3', 'childs3')
      .leftJoinAndSelect('users.childs4', 'childs4')
      .leftJoinAndSelect('users.childs5', 'childs5')
      .leftJoinAndSelect('users.childs6', 'childs6')
      .leftJoinAndSelect('users.childs7', 'childs7')
      .leftJoinAndSelect('users.childs8', 'childs8')
      .leftJoinAndSelect('users.childs9', 'childs9')
      .leftJoinAndSelect('users.childs10', 'childs10')
      .getMany();
  }

  async find3Nested() {
    return await this.manager
      .createQueryBuilder(User, 'users')
      .where('users.testCase = :testCase', {
        testCase: UserTestCaseEnum.T3Nested,
      })
      .leftJoinAndSelect('users.childs1', 'childs1')
      .leftJoinAndSelect('childs1.childs1', 'childs1_childs1')
      .leftJoinAndSelect('childs1_childs1.childs1', 'childs1_childs1_childs1')
      .leftJoinAndSelect(
        'childs1_childs1_childs1.childs1',
        'childs1_childs1_childs1_childs1',
      )
      .getMany();
  }
}
