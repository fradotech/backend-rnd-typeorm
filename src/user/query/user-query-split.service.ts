import { Injectable } from '@nestjs/common'
import { Brackets, EntityManager } from 'typeorm'
import { User, UserTestCaseEnum } from '../user.entity'
import { UserQueryIndexRequest } from './user-query-index.request'

@Injectable()
export class UserQuerySplitService {
  constructor(private readonly manager: EntityManager) {}

  async find1Relation({ name }: UserQueryIndexRequest) {
    const query = this.manager
      .createQueryBuilder(User, 'user')
      .where('user.testCase = :testCase', {
        testCase: UserTestCaseEnum.TC1Relation,
      })

    if (name) {
      query
        .leftJoinAndSelect('user.childs1', 'childs1')
        .andWhere('childs1.name1 ilike :name', { name: `%${name}%` })
    }

    const users = await query.getMany()

    const assignChilds1 = users.map(async (user) => {
      user.childs1 = await this.manager
        .createQueryBuilder()
        .relation(User, 'childs1')
        .of(user)
        .loadMany()
    })

    await Promise.all(assignChilds1)

    return users
  }

  async find10Relation({ name }: UserQueryIndexRequest) {
    const query = this.manager
      .createQueryBuilder(User, 'user')
      .where('user.testCase = :testCase', {
        testCase: UserTestCaseEnum.TC10Relation,
      })

    if (name) {
      query.leftJoinAndSelect('user.childs1', 'childs1')
      query.andWhere('childs1.name1 ilike :name', { name: `%${name}%` })
    }

    const users = await query.getMany()

    const relations = [
      'childs1',
      'childs2',
      'childs3',
      'childs4',
      'childs5',
      'childs6',
      'childs7',
      'childs8',
      'childs9',
      'childs10',
    ]

    const assignRelations = users.flatMap((user) => {
      return relations.map(async (relation) => {
        return await this.manager
          .createQueryBuilder()
          .relation(User, relation)
          .of(user)
          .loadMany()
          .then((childs) => (user[relation] = childs))
      })
    })

    await Promise.all(assignRelations)

    return users
  }

  async find3Nested({ name, whereType }: UserQueryIndexRequest) {
    const query = this.manager
      .createQueryBuilder(User, 'user')
      .where('user.testCase = :testCase', {
        testCase: UserTestCaseEnum.TC3Nested,
      })

    if (name) {
      if (whereType === 'exist') {
        console.debug('WHERE TYPE: EXIST')

        const subQuery = this.manager
          .createQueryBuilder(User, 'user2')
          .select('1')
          .innerJoin('user2.childs1', 'childs1_2')
          .innerJoin('childs1_2.childs1', 'childs1_childs1_2')
          .innerJoin('childs1_childs1_2.childs1', 'childs1_childs1_childs1_2')
          .where('user2.id = user.id')
          .andWhere('childs1_childs1_childs1_2.name1 ilike :name', {
            name: `%${name}%`,
          })

        query.andWhereExists(subQuery)
      } else if (whereType === 'in') {
        console.debug('WHERE TYPE: IN')

        const subQuery = this.manager
          .createQueryBuilder(User, 'user')
          .innerJoin('user.childs1', 'childs1')
          .innerJoin('childs1.childs1', 'childs1_childs1')
          .innerJoin('childs1_childs1.childs1', 'childs1_childs1_childs1')
          .where('childs1_childs1_childs1.name1 ilike :name', {
            name: `%${name}%`,
          })
          .select('user.id')

        query.andWhere('user.id IN (' + subQuery.getQuery() + ')')
        query.setParameters(subQuery.getParameters())
      } else {
        console.debug('WHERE TYPE: JOIN')
        query
          .leftJoinAndSelect('user.childs1', 'childs1')
          .leftJoinAndSelect('childs1.childs1', 'childs1_childs1')
          .leftJoinAndSelect(
            'childs1_childs1.childs1',
            'childs1_childs1_childs1',
          )

        query.andWhere('childs1_childs1_childs1.name1 ilike :name', {
          name: `%${name}%`,
        })
      }
    }

    const users = await query.getMany()

    const assignChilds1 = users.map(async (user) => {
      user.childs1 = await this.manager
        .createQueryBuilder(User, 'childs1')
        .leftJoinAndSelect('childs1.parent1', 'parent1')
        .leftJoinAndSelect('childs1.childs1', 'childs1_childs1')
        .leftJoinAndSelect('childs1_childs1.childs1', 'childs1_childs1_childs1')
        .andWhere('parent1.id = :id', { id: user.id })
        .select('childs1.id')
        .addSelect('childs1.name1')
        .addSelect('childs1.testCase')
        .addSelect('childs1_childs1')
        .addSelect('childs1_childs1_childs1')
        .getMany()
    })

    await Promise.all(assignChilds1)

    return users
  }

  async find2Relation2Nested({ name, whereType }: UserQueryIndexRequest) {
    const query = this.manager
      .createQueryBuilder(User, 'user')
      .where('user.testCase = :testCase', {
        testCase: UserTestCaseEnum.TC3Nested,
      })

    if (name) {
      if (whereType === 'exist') {
        console.debug('WHERE TYPE: EXIST')

        const subQuery = this.manager
          .createQueryBuilder(User, 'user2')
          .select('1')
          .innerJoin('user2.childs1', 'childs1_2')
          .innerJoin('childs1_2.childs1', 'childs1_childs1_2')
          .innerJoin('user2.childs2', 'childs2_2')
          .innerJoin('childs2_2.childs2', 'childs2_childs2_2')
          .where('user2.id = user.id')

        subQuery.andWhere(
          new Brackets((qb) => {
            qb.where('childs1_childs1_2.name1 ilike :name', {
              name: `%${name}%`,
            })
              .andWhere('childs1_childs1_2.name2 ilike :name', {
                name: `%${name}%`,
              })
              .andWhere('childs1_childs1_2.name3 ilike :name', {
                name: `%${name}%`,
              })

            qb.where('childs2_childs2_2.name1 ilike :name', {
              name: `%${name}%`,
            })
              .andWhere('childs2_childs2_2.name2 ilike :name', {
                name: `%${name}%`,
              })
              .andWhere('childs2_childs2_2.name3 ilike :name', {
                name: `%${name}%`,
              })
          }),
        )

        query.andWhereExists(subQuery)
      } else if (whereType === 'in') {
        console.debug('WHERE TYPE: IN')

        const subQuery = this.manager
          .createQueryBuilder(User, 'user')
          .innerJoin('user.childs1', 'childs1')
          .innerJoin('childs1.childs1', 'childs1_childs1')
          .innerJoin('user.childs2', 'childs2')
          .innerJoin('childs2.childs2', 'childs2_childs2')

        subQuery
          .andWhere(
            new Brackets((qb) => {
              qb.where('childs1_childs1.name1 ilike :name', {
                name: `%${name}%`,
              })
                .andWhere('childs1_childs1.name2 ilike :name', {
                  name: `%${name}%`,
                })
                .andWhere('childs1_childs1.name3 ilike :name', {
                  name: `%${name}%`,
                })

              qb.where('childs2_childs2.name1 ilike :name', {
                name: `%${name}%`,
              })
                .andWhere('childs2_childs2.name2 ilike :name', {
                  name: `%${name}%`,
                })
                .andWhere('childs2_childs2.name3 ilike :name', {
                  name: `%${name}%`,
                })
            }),
          )
          .select('user.id')

        query.andWhere('user.id IN (' + subQuery.getQuery() + ')')
        query.setParameters(subQuery.getParameters())
      } else {
        console.debug('WHERE TYPE: JOIN')

        query
          .innerJoin('user.childs1', 'childs1')
          .innerJoin('childs1.childs1', 'childs1_childs1')
          .innerJoin('user.childs2', 'childs2')
          .innerJoin('childs2.childs2', 'childs2_childs2')

        query.andWhere(
          new Brackets((qb) => {
            qb.where('childs1_childs1.name1 ilike :name', {
              name: `%${name}%`,
            })
              .andWhere('childs1_childs1.name2 ilike :name', {
                name: `%${name}%`,
              })
              .andWhere('childs1_childs1.name3 ilike :name', {
                name: `%${name}%`,
              })

            qb.where('childs2_childs2.name1 ilike :name', {
              name: `%${name}%`,
            })
              .andWhere('childs2_childs2.name2 ilike :name', {
                name: `%${name}%`,
              })
              .andWhere('childs2_childs2.name3 ilike :name', {
                name: `%${name}%`,
              })
          }),
        )

        query
          .select('user.id')
          .addSelect('user.name1')
          .addSelect('user.name2')
          .addSelect('user.name3')
          .addSelect('user.testCase')
          .addSelect('user.nestedLevel')
      }
    }

    const users = await query.getMany()

    // TODO: uncomment after test where
    const assignChilds1 = users.map(async (user) => {
      user.childs1 = await this.manager
        .createQueryBuilder(User, 'childs1')
        .leftJoinAndSelect('childs1.parent1', 'parent1')
        .leftJoinAndSelect('childs1.childs1', 'childs1_childs1')
        .andWhere('parent1.id = :id', { id: user.id })
        .select('childs1.id')
        .addSelect('childs1.name1')
        .addSelect('childs1.testCase')
        .addSelect('childs1.nestedLevel')
        .addSelect('childs1_childs1')
        .getMany()

      user.childs2 = await this.manager
        .createQueryBuilder(User, 'childs2')
        .leftJoinAndSelect('childs2.parent2', 'parent2')
        .leftJoinAndSelect('childs2.childs2', 'childs2_childs2')
        .andWhere('parent2.id = :id', { id: user.id })
        .select('childs2.id')
        .addSelect('childs2.name1')
        .addSelect('childs2.testCase')
        .addSelect('childs2.nestedLevel')
        .addSelect('childs2_childs2')
        .getMany()
    })

    await Promise.all(assignChilds1)

    return users
  }
}
