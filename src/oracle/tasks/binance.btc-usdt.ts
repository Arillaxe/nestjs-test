import { Inject, Injectable, Logger } from '@nestjs/common';
import { BaseTask } from './base.task';
import { BinanceProvider, BinanceSymbols } from '../providers/binance.provider';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BinanceBtcUsdtTask implements BaseTask {
  logger = new Logger(BinanceBtcUsdtTask.name);

  name = BinanceBtcUsdtTask.name;
  interval: number;

  constructor(
    private readonly binanceProvider: BinanceProvider,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {
    this.interval = this.configService.get('app.updateInterval');
  }

  async execute() {
    try {
      const price = await this.binanceProvider.getSymbolPrice(
        BinanceSymbols.BTCUSDT,
      );

      if (price.bidPrice && !isNaN(price.bidPrice)) {
        this.cacheManager.set(
          `${BinanceSymbols.BTCUSDT}/bid`,
          price.bidPrice,
          0,
        );
      }

      if (price.askPrice && !isNaN(price.askPrice)) {
        this.cacheManager.set(
          `${BinanceSymbols.BTCUSDT}/ask`,
          price.askPrice,
          0,
        );
      }

      this.logger.log(`Fetched new BTC-USDT prices: ${JSON.stringify(price)}`);
    } catch (e) {
      this.logger.log(`Couldn't fetch BTC-USDT prices`);
      this.logger.error(e);
    }
  }
}
