import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User, UserTestCaseEnum } from '../user.entity';
import { UserQueryIndexRequest } from './user-query-index.request';

@Injectable()
export class UserQueryNativeService {
  constructor(private readonly manager: EntityManager) {}

  async find1Relation({ name }: UserQueryIndexRequest) {
    const query = this.manager
      .createQueryBuilder(User, 'user')
      .where('user.testCase = :testCase', {
        testCase: UserTestCaseEnum.TC1Relation,
      })
      .leftJoinAndSelect('user.childs1', 'childs1');

    if (name) {
      query.andWhere('childs1.name ilike :name', { name });
    }

    return await query.getMany();
  }

  async find10Relation({ name }: UserQueryIndexRequest) {
    const query = this.manager
      .createQueryBuilder(User, 'user')
      .where('user.testCase = :testCase', {
        testCase: UserTestCaseEnum.TC10Relation,
      })
      .leftJoinAndSelect('user.childs1', 'childs1')
      .leftJoinAndSelect('user.childs2', 'childs2')
      .leftJoinAndSelect('user.childs3', 'childs3')
      .leftJoinAndSelect('user.childs4', 'childs4');
    // .leftJoinAndSelect('user.childs5', 'childs5')
    // .leftJoinAndSelect('user.childs6', 'childs6')
    // .leftJoinAndSelect('user.childs7', 'childs7')
    // .leftJoinAndSelect('user.childs8', 'childs8')
    // .leftJoinAndSelect('user.childs9', 'childs9')
    // .leftJoinAndSelect('user.childs10', 'childs10');

    if (name) {
      query.andWhere('childs1.name ilike :name', { name });
    }

    return await query.getMany();
  }

  async find3Nested({ name }: UserQueryIndexRequest) {
    const query = this.manager
      .createQueryBuilder(User, 'user')
      .where('user.testCase = :testCase', {
        testCase: UserTestCaseEnum.TC3Nested,
      })
      .leftJoinAndSelect('user.childs1', 'childs1')
      .leftJoinAndSelect('childs1.childs1', 'childs1_childs1')
      .leftJoinAndSelect('childs1_childs1.childs1', 'childs1_childs1_childs1');

    if (name) {
      query.andWhere('childs1_childs1_childs1.name ilike :name', { name });
    }

    return await query.getMany();
  }
}
