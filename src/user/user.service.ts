import { randFullName } from '@ngneat/falso';
import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User, UserTestCaseEnum } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly entityManager: EntityManager) {}

  async createMany(
    testCase: UserTestCaseEnum,
    length = 1000,
    parent1Id?: string,
    nested?: {
      testCase: UserTestCaseEnum;
      length: number;
      level: number;
    },
  ): Promise<User[]> {
    const usersCreate: User[] = [];

    for (let i = 0; i < length; i++) {
      const user = new User();

      user.name = randFullName();
      user.testCase = testCase;

      if (parent1Id) {
        user.parent1 = await this.entityManager.findOne(User, {
          where: { id: parent1Id },
        });
      }

      usersCreate.push(user);
    }

    const users = await this.entityManager.save(usersCreate);

    if (nested) {
      for (const user of users) {
        if (nested.level >= 1) {
          await this.createMany(testCase, nested.length, user.id, {
            testCase,
            length: nested.length,
            level: nested.level - 1,
          });
        }
      }
    }

    return users;
  }
}
