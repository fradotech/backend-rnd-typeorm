import { Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { DATA_SOURCE } from './data-source';

export const createEntityManager = async (): Promise<EntityManager> => {
  await DATA_SOURCE.initialize()
    .then(async () => {
      // Logger.log('Success create connection', 'EntityManager');
    })
    .catch(async (error) => {
      const entityManager = await createEntityManager();
      entityManager.connection.isInitialized && Logger.error(error);
    });

  return new EntityManager(DATA_SOURCE);
};
