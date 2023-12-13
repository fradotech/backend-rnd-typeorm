import { randFullName } from '@ngneat/falso'
import { EntityManager } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { User, UserTestCaseEnum } from './user.entity'

@Injectable()
export class UserService {
  constructor(private readonly entityManager: EntityManager) {}

  async createMany(
    testCase: UserTestCaseEnum,
    length = 1000,
    nested?: {
      testCase: UserTestCaseEnum
      length: number
      level: number
    },
    parentId?: string,
    isAllParent?: boolean,
  ): Promise<User[]> {
    const usersCreate: User[] = []

    for (let i = 0; i < length; i++) {
      let user = new User()

      user.name = randFullName()
      // Jika parentId tidak ada, maka user.testCase adalah parent
      user.testCase = !parentId ? testCase : undefined

      user = await this.assignRelation(user, parentId, isAllParent)

      usersCreate.push(user)
    }

    const users = await this.entityManager.save(usersCreate)

    if (nested) {
      for (const user of users) {
        if (nested.level >= 1) {
          await this.createMany(
            testCase,
            nested.length,
            {
              testCase,
              length: nested.length,
              level: nested.level - 1,
            },
            user.id,
            isAllParent,
          )
        }
      }
    }

    return users
  }

  private async assignRelation(
    user: User,
    parentId: string,
    isAllParent?: boolean,
  ) {
    if (!parentId) return user

    const parent = await this.entityManager.findOne(User, {
      where: { id: parentId },
    })

    const parentCount = isAllParent ? 10 : 1

    for (let i = 1; i <= parentCount; i++) {
      user[`parent${i}`] = parent
    }

    return user
  }
}
