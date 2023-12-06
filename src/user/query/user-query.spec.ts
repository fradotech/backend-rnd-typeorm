import { UserQueryController } from './user-query.controller';
import { UserTestCaseEnum } from '../user.entity';
import { UserQueryIndexRequest } from './user-query-index.request';
import { createEntityManager } from 'src/database/entity-manager';
import { EntityManager } from 'typeorm';
import { UserQueryUsecase } from './user-query.usecase';
import { UserQueryNativeService } from './user-query-native.service';

describe(UserQueryController.name, () => {
  let userNativeQueryController: UserQueryController;
  let userQueryNativeService: UserQueryNativeService;
  let userQueryUsecase: UserQueryUsecase;
  let commonTest: (query: UserQueryIndexRequest) => Promise<void>;
  let entityManager: EntityManager;

  beforeEach(async () => {
    entityManager = await createEntityManager();
    userQueryNativeService = new UserQueryNativeService(entityManager);
    userQueryUsecase = new UserQueryUsecase(userQueryNativeService);
    userNativeQueryController = new UserQueryController(userQueryUsecase);

    commonTest = async (query: UserQueryIndexRequest) => {
      const result = await userNativeQueryController.native(query);
      console.log(`Name   : ${result?.[0].name}`);
      console.log(`Length : ${result.length}`);

      expect(result.length).toBeGreaterThan(0);
    };
  });

  afterEach(async () => {
    await entityManager.connection.destroy();
  });

  describe('Without Where', () => {
    it(UserTestCaseEnum.T1Relation, async () =>
      commonTest({ testCase: UserTestCaseEnum.T1Relation, name: undefined }),
    );

    it(UserTestCaseEnum.T10Relation, async () =>
      commonTest({ testCase: UserTestCaseEnum.T10Relation, name: undefined }),
    );

    it(UserTestCaseEnum.T3Nested, async () =>
      commonTest({ testCase: UserTestCaseEnum.T3Nested, name: undefined }),
    );
  });

  describe('With Where', () => {
    it(UserTestCaseEnum.T1Relation, async () =>
      commonTest({ testCase: UserTestCaseEnum.T1Relation, name: 'Gang Sahu' }),
    );

    it(UserTestCaseEnum.T10Relation, async () =>
      commonTest({
        testCase: UserTestCaseEnum.T10Relation,
        name: 'Nushi Segel',
      }),
    );

    it(UserTestCaseEnum.T3Nested, async () =>
      commonTest({
        testCase: UserTestCaseEnum.T3Nested,
        name: 'Marek Reuben',
      }),
    );
  });
});
