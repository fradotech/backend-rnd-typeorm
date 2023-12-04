import { Seeder } from 'typeorm-seeding';
import { User } from '../../user/user.entity';
import { randFullName } from '@ngneat/falso';
import { createEntityManager } from '../entity-manager';

export default class CreateUsers implements Seeder {
  public async run(): Promise<any> {
    const entityManager = await createEntityManager();
    const users = [];

    for (let i = 0; i < 1000; i++) {
      const user = new User();
      user.name = randFullName();
      users.push(user);
    }

    await entityManager
      .createQueryBuilder(User, 'users')
      .insert()
      .into(User)
      .values(users)
      .execute();
  }
}
