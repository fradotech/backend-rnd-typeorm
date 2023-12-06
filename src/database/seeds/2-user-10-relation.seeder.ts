import { Seeder } from 'typeorm-seeding';
import { UserService } from '../../user/user.service';
import { createEntityManager } from '../entity-manager';
import { UserTestCaseEnum } from '../../user/user.entity';

export default class User10RelationSeeder implements Seeder {
  public async run(): Promise<void> {
    const userService = new UserService(await createEntityManager());

    const testCase = UserTestCaseEnum.TC10Relation;

    await userService.createMany(
      testCase,
      100,
      {
        testCase,
        length: 10,
        level: 1,
      },
      undefined,
      true,
    );
  }
}
