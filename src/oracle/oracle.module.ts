import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { OracleService } from './oracle.service';
import { CacheModule } from '@nestjs/cache-manager';
import tasksProviders from './tasks/tasks.providers';
import providerProviders from './providers/provider.providers';

@Module({
  imports: [ScheduleModule.forRoot(), CacheModule.register()],
  providers: [OracleService, ...providerProviders, ...tasksProviders],
})
export class OracleModule {}
