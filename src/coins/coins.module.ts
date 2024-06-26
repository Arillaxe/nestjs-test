import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { CoinsControlller } from './coins.controller';

@Module({
  imports: [CacheModule.register()],
  providers: [CoinsService],
  controllers: [CoinsControlller],
})
export class CoinsModule {}
