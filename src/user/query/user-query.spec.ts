import { UserQueryController } from './user-query.controller';
import { UserTestCaseEnum } from '../user.entity';
import { UserQueryIndexRequest } from './user-query-index.request';
import { createEntityManager } from 'src/database/entity-manager';
import { UserQueryUsecase } from './user-query.usecase';
import { UserQueryNativeService } from './user-query-native.service';
import { UserQuerySplitService } from './user-query-split.service';

describe(UserQueryController.name, async () => {
  const entityManager = await createEntityManager();
  const userQueryNativeService = new UserQueryNativeService(entityManager);
  const userQuerySplitService = new UserQuerySplitService(entityManager);
  const userQueryUsecase = new UserQueryUsecase(
    userQueryNativeService,
    userQuerySplitService,
  );
  const userNativeQueryController = new UserQueryController(userQueryUsecase);

  const commonTest = async (
    query: UserQueryIndexRequest,
    isSplit?: boolean,
  ) => {
    console.log('\n');
    const result =
      await userNativeQueryController[isSplit ? 'split' : 'native'](query);

    console.log(`Name   : ${result?.[0]?.name || 'Failed!'}`);
    console.log(`Length : ${result.length}`);

    expect(result.length).toBeGreaterThan(0);
  };

  const commonDescribe = (testCase: UserTestCaseEnum, nameSearch?: string) => {
    it('NATIVE', async () => commonTest({ testCase, name: nameSearch }));
    it('SPLIT', async () => commonTest({ testCase, name: nameSearch }, true));
  };

  afterAll(async () => await entityManager.connection.destroy());

  describe(UserTestCaseEnum.TC1Relation, () => {
    commonDescribe(UserTestCaseEnum.TC1Relation);
  });

  describe(UserTestCaseEnum.TC10Relation, () => {
    commonDescribe(UserTestCaseEnum.TC10Relation);
  });

  describe(UserTestCaseEnum.TC3Nested, () => {
    commonDescribe(UserTestCaseEnum.TC3Nested);
  });

  describe(UserTestCaseEnum.TC1Relation + ' - WITH WHERE', () => {
    commonDescribe(UserTestCaseEnum.TC1Relation, 'Wirat Ono');
  });

  describe(UserTestCaseEnum.TC10Relation + ' - WITH WHERE', () => {
    commonDescribe(UserTestCaseEnum.TC10Relation, 'Hideo Mahato');
  });

  describe(UserTestCaseEnum.TC3Nested + ' - WITH WHERE', () => {
    commonDescribe(UserTestCaseEnum.TC3Nested, 'Jianping Moshe');
  });
});
