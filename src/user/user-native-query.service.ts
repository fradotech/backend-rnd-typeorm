import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User, UserTestCaseEnum } from './user.entity';
import { UserIndexRequest } from './user-index.request';

@Injectable()
export class UserNativeQueryService {
  constructor(private readonly manager: EntityManager) {}

  async find1Relation({ name }: UserIndexRequest) {
    const query = this.manager
      .createQueryBuilder(User, 'user')
      .where('user.testCase = :testCase', {
        testCase: UserTestCaseEnum.T1Relation,
      })
      .innerJoinAndSelect('user.childs1', 'childs1');

    if (name) {
      query.andWhere('user.name = :name', { name });
    }

    return await query.getMany();
  }

  async find10Relation({ name }: UserIndexRequest) {
    const query = this.manager
      .createQueryBuilder(User, 'user')
      .where('user.testCase = :testCase', {
        testCase: UserTestCaseEnum.T10Relation,
      })
      .innerJoinAndSelect('user.childs1', 'childs1')
      .innerJoinAndSelect('user.childs2', 'childs2')
      .innerJoinAndSelect('user.childs3', 'childs3')
      .innerJoinAndSelect('user.childs4', 'childs4')
      .innerJoinAndSelect('user.childs5', 'childs5')
      .innerJoinAndSelect('user.childs6', 'childs6')
      .innerJoinAndSelect('user.childs7', 'childs7')
      .innerJoinAndSelect('user.childs8', 'childs8')
      .innerJoinAndSelect('user.childs9', 'childs9')
      .innerJoinAndSelect('user.childs10', 'childs10');

    if (name) {
      query.andWhere('user.name = :name', { name });
    }

    return await query.getMany();
  }

  async find3Nested({ name }: UserIndexRequest) {
    const query = this.manager
      .createQueryBuilder(User, 'user')
      .where('user.testCase = :testCase', {
        testCase: UserTestCaseEnum.T3Nested,
      })
      .innerJoinAndSelect('user.childs1', 'childs1')
      .innerJoinAndSelect('childs1.childs1', 'childs1_childs1')
      .innerJoinAndSelect('childs1_childs1.childs1', 'childs1_childs1_childs1');

    if (name) {
      query.andWhere('user.name = :name', { name });
    }

    return await query.getMany();
  }
}
