import { HealthCheckService, MemoryHealthIndicator } from '@nestjs/terminus'
import { HealthCheckExecutor } from '@nestjs/terminus/dist/health-check/health-check-executor.service'
import { createEntityManager } from 'src/database/entity-manager'
import { HealthController } from 'src/health/health.controller'
import { UserTestCaseEnum } from '../user.entity'
import { UserQueryIndexRequest } from './user-query-index.request'
import { UserQueryNativeService } from './user-query-native.service'
import { UserQuerySplitService } from './user-query-split.service'
import { UserQueryController } from './user-query.controller'
import { UserQueryUsecase } from './user-query.usecase'

describe(UserQueryController.name, async () => {
  const healthCheckService = new HealthCheckService(
    new HealthCheckExecutor(),
    null,
    null,
  )
  const memoryHealthIndicator = new MemoryHealthIndicator()
  const healthController = new HealthController(
    healthCheckService,
    memoryHealthIndicator,
  )

  const entityManager = await createEntityManager()
  const userQueryNativeService = new UserQueryNativeService(entityManager)
  const userQuerySplitService = new UserQuerySplitService(entityManager)
  const userQueryUsecase = new UserQueryUsecase(
    userQueryNativeService,
    userQuerySplitService,
  )
  const userNativeQueryController = new UserQueryController(userQueryUsecase)

  const commonTest = async (
    query: UserQueryIndexRequest,
    isSplit?: boolean,
  ) => {
    console.log('\n')
    const result =
      await userNativeQueryController[isSplit ? 'split' : 'native'](query)

    console.log(`Name   : ${result?.[0]?.name || 'Failed!'}`)
    console.log(`Length : ${result.length}`)

    await healthController.memoryUsage()

    expect(result.length).toBeGreaterThan(0)
  }

  const commonDescribe = (testCase: UserTestCaseEnum, name?: string) => {
    it('NATIVE', async () => commonTest({ testCase, name }), 300000)
    it('SPLIT', async () => commonTest({ testCase, name }, true), 300000)
  }

  afterAll(async () => await entityManager.connection.destroy())

  describe(UserTestCaseEnum.TC1Relation, () => {
    commonDescribe(UserTestCaseEnum.TC1Relation)
  })

  describe(UserTestCaseEnum.TC1Relation + ' - WITH WHERE', () => {
    commonDescribe(UserTestCaseEnum.TC1Relation, 'a')
  })

  describe(UserTestCaseEnum.TC10Relation, () => {
    commonDescribe(UserTestCaseEnum.TC10Relation)
  })

  describe(UserTestCaseEnum.TC10Relation + ' - WITH WHERE', () => {
    commonDescribe(UserTestCaseEnum.TC10Relation, 'a')
  })

  describe(UserTestCaseEnum.TC3Nested, () => {
    commonDescribe(UserTestCaseEnum.TC3Nested)
  })

  describe(UserTestCaseEnum.TC3Nested + ' - WITH WHERE', () => {
    commonDescribe(UserTestCaseEnum.TC3Nested, 'a')
  })

  describe(UserTestCaseEnum.TC2Relation2Nested, () => {
    commonDescribe(UserTestCaseEnum.TC2Relation2Nested)
  })

  describe(UserTestCaseEnum.TC2Relation2Nested + ' - WITH WHERE', () => {
    commonDescribe(UserTestCaseEnum.TC2Relation2Nested, 'a')
  })
})
