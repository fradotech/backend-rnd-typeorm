import { Seeder } from 'typeorm-seeding'
import { UserTestCaseEnum } from '../../user/user.entity'
import { UserService } from '../../user/user.service'
import { createEntityManager } from '../entity-manager'

export default class User3NestedSeeder implements Seeder {
  public async run(): Promise<void> {
    const userService = new UserService(await createEntityManager())

    const testCase = UserTestCaseEnum.TC3Nested

    await userService.createMany(
      testCase,
      250,
      {
        testCase,
        length: 10,
        level: 3,
      },
      undefined,
      true,
    )
  }
}
