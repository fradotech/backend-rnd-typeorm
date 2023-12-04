import { Seeder } from 'typeorm-seeding';
import { User } from '../../user/user.entity';
import { randFullName } from '@ngneat/falso';
import { createEntityManager } from '../entity-manager';

export default class CreateUsers implements Seeder {
  public async run(): Promise<void> {
    const entityManager = await createEntityManager();

    const users = await this.createMany();

    await entityManager
      .createQueryBuilder(User, 'users')
      .insert()
      .values(users)
      .execute();
  }

  // Utils

  private async createMany(count = 1000): Promise<User[]> {
    const users: User[] = [];

    for (let i = 0; i < count; i++) {
      const user = new User();
      user.name = randFullName();
      users.push(user);
    }

    return users;
  }
}
