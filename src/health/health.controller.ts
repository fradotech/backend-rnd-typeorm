import { Controller, Get } from '@nestjs/common'
import {
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
} from '@nestjs/terminus'

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    return await this.health.check([
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
    ])
  }

  @Get('memory-usage')
  @HealthCheck()
  async memoryUsage() {
    const memoryUsage = process.memoryUsage()

    delete memoryUsage.external
    delete memoryUsage.arrayBuffers

    for (const [key, value] of Object.entries(memoryUsage)) {
      memoryUsage[key] = value / 1000000 + ' MB'
    }

    console.log('MemoryUsage (RSS):', memoryUsage.rss)

    return memoryUsage
  }
}
