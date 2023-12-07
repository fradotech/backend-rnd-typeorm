import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User, UserTestCaseEnum } from '../user.entity';
import { UserQueryIndexRequest } from './user-query-index.request';

@Injectable()
export class UserQuerySplitService {
  constructor(private readonly manager: EntityManager) {}

  async find1Relation({ name }: UserQueryIndexRequest) {
    const query = this.manager
      .createQueryBuilder(User, 'user')
      .where('user.testCase = :testCase', {
        testCase: UserTestCaseEnum.TC1Relation,
      });

    if (name) {
      query
        .leftJoinAndSelect('user.childs1', 'childs1')
        .andWhere('childs1.name ilike :name', { name });
    }

    const users = await query.getMany();

    const assignChilds1 = users.map(async (user) => {
      user.childs1 = await this.manager
        .createQueryBuilder()
        .relation(User, 'childs1')
        .of(user)
        .loadMany();
    });

    await Promise.all(assignChilds1);

    return users;
  }

  async find10Relation({ name }: UserQueryIndexRequest) {
    const query = this.manager
      .createQueryBuilder(User, 'user')
      .where('user.testCase = :testCase', {
        testCase: UserTestCaseEnum.TC10Relation,
      });

    if (name) {
      query.leftJoinAndSelect('user.childs1', 'childs1');
      query.andWhere('childs1.name ilike :name', { name });
    }

    const users = await query.getMany();

    const relations = [
      'childs1',
      'childs2',
      'childs3',
      'childs4',
      // 'childs5',
      // 'childs6',
      // 'childs7',
      // 'childs8',
      // 'childs9',
      // 'childs10',
    ];

    const assignRelations = users.flatMap((user) => {
      return relations.map(async (relation) => {
        return await this.manager
          .createQueryBuilder()
          .relation(User, relation)
          .of(user)
          .loadMany()
          .then((childs) => (user[relation] = childs));
      });
    });

    await Promise.all(assignRelations);

    return users;
  }

  async find3Nested({ name }: UserQueryIndexRequest) {
    const query = this.manager
      .createQueryBuilder(User, 'user')
      .where('user.testCase = :testCase', {
        testCase: UserTestCaseEnum.TC3Nested,
      });

    if (name) {
      query
        .leftJoinAndSelect('user.childs1', 'childs1')
        .leftJoinAndSelect('childs1.childs1', 'childs1_childs1')
        .leftJoinAndSelect(
          'childs1_childs1.childs1',
          'childs1_childs1_childs1',
        );

      query.andWhere('childs1_childs1_childs1.name ilike :name', { name });
    }

    const users = await query.getMany();

    const assignChilds1 = users.map(async (user) => {
      user.childs1 = await this.manager
        .createQueryBuilder(User, 'childs1')
        .leftJoinAndSelect('childs1.parent1', 'parent1')
        .leftJoinAndSelect('childs1.childs1', 'childs1_childs1')
        .leftJoinAndSelect('childs1_childs1.childs1', 'childs1_childs1_childs1')
        .andWhere('parent1.id = :id', { id: user.id })
        .select('childs1.id')
        .addSelect('childs1.name')
        .addSelect('childs1.testCase')
        .addSelect('childs1_childs1')
        .addSelect('childs1_childs1_childs1')
        .getMany();
    });

    await Promise.all(assignChilds1);

    return users;
  }
}