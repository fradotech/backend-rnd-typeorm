import { HealthCheckService, MemoryHealthIndicator } from '@nestjs/terminus'
import { HealthCheckExecutor } from '@nestjs/terminus/dist/health-check/health-check-executor.service'
import { createEntityManager } from '../../database/entity-manager'
import { HealthController } from '../../health/health.controller'
import { UserTestCaseEnum } from '../user.entity'
import {
  UserQueryIndexRequest,
  UserQueryWhereType,
} from './user-query-index.request'
import { UserQueryNativeService } from './user-query-native.service'
import { UserQuerySplitService } from './user-query-split.service'
import { UserQueryController } from './user-query.controller'
import { UserQueryUsecase } from './user-query.usecase'

describe(UserQueryController.name + ' WHERE', async () => {
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
    whereType?: UserQueryWhereType,
  ) => {
    console.log('\n')

    query.whereType = whereType
    const result = await userNativeQueryController.split(query)

    console.log(`Name   : ${result?.[0]?.name1 || 'Failed!'}`)
    console.log(`Length : ${result.length}`)

    await healthController.memoryUsage()

    expect(result.length).toBeGreaterThan(0)
  }

  const commonDescribe = (testCase: UserTestCaseEnum, name?: string) => {
    it('JOIN', async () => commonTest({ testCase, name }, 'join'), 300000)
    it('IN', async () => commonTest({ testCase, name }, 'in'), 300000)
    it('EXIST', async () => commonTest({ testCase, name }, 'exist'), 300000)
  }

  afterAll(async () => await entityManager.connection.destroy())

  describe(UserTestCaseEnum.TC2Relation2Nested + ' - WITH WHERE', () => {
    commonDescribe(UserTestCaseEnum.TC2Relation2Nested, 's')
  })
})
