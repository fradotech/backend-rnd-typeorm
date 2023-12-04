import { Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { DATA_SOURCE } from './data-source';

export const createEntityManager = async (): Promise<EntityManager> => {
  await DATA_SOURCE.initialize()
    .then(async () => {
      console.log('\n');
      Logger.log('Success create connection', 'EntityManager');
    })
    .catch((error) => Logger.error(error));

  return new EntityManager(DATA_SOURCE);
};
