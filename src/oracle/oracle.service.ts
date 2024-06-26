import { Injectable, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { BaseTask } from './tasks/base.task';
import { BinanceBtcUsdtTask } from './tasks/binance.btc-usdt';

@Injectable()
export class OracleService implements OnModuleInit {
  private tasks: BaseTask[] = [this.binanceBtcUsdtTask];

  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly binanceBtcUsdtTask: BinanceBtcUsdtTask,
  ) {}

  onModuleInit() {
    for (const task of this.tasks) {
      const intervalId = setInterval(task.execute.bind(task), task.interval);

      this.schedulerRegistry.addInterval(task.name, intervalId);

      task.execute();
    }
  }
}
