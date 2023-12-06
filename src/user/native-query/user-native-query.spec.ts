import { UserQueryController } from '../user-query.controller';
import { UserTestCaseEnum } from '../user.entity';
import { UserIndexRequest } from '../user-index.request';
import { createEntityManager } from 'src/database/entity-manager';
import { EntityManager } from 'typeorm';
import { UserQueryUsecase } from '../user-query.usecase';
import { UserNativeQueryService } from './user-native-query.service';

describe(UserQueryController.name, () => {
  let userNativeQueryController: UserQueryController;
  let userNativeQueryService: UserNativeQueryService;
  let userQueryUsecase: UserQueryUsecase;
  let commonTest: (query: UserIndexRequest) => Promise<void>;
  let entityManager: EntityManager;

  beforeEach(async () => {
    entityManager = await createEntityManager();

    userNativeQueryService = new UserNativeQueryService(entityManager);

    userQueryUsecase = new UserQueryUsecase(userNativeQueryService);

    userNativeQueryController = new UserQueryController(userQueryUsecase);

    commonTest = async (query: UserIndexRequest) => {
      const result = await userNativeQueryController.index(query);
      console.log(`Name: ${result?.[0].name}`);
      console.log(`Length: ${result.length}`);

      expect(result).toBeInstanceOf(Array);
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
