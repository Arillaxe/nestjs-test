import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { OracleService } from './oracle.service';
import { CacheModule } from '@nestjs/cache-manager';
import { DiscoveryModule } from '@nestjs/core';
import tasksProviders from './tasks/tasks.providers';
import providerProviders from './providers/provider.providers';

@Module({
  imports: [ScheduleModule.forRoot(), CacheModule.register(), DiscoveryModule],
  providers: [OracleService, ...providerProviders, ...tasksProviders],
})
export class OracleModule {}
