import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { BinanceSymbols } from 'src/oracle/providers/binance.provider';
import { CoinPricesResponseDto } from './coins.dto';

@Injectable()
export class CoinsService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getBtcUsdtPrices(): Promise<CoinPricesResponseDto> {
    const bidPrice = await this.cacheManager.get<number>(
      `${BinanceSymbols.BTCUSDT}/bid`,
    );
    const askPrice = await this.cacheManager.get<number>(
      `${BinanceSymbols.BTCUSDT}/ask`,
    );

    const commision = this.configService.get('app.serviceCommission');

    const adjustedBid = bidPrice - bidPrice * commision;
    const adjustedAsk = askPrice + askPrice * commision;
    const midPrice = (adjustedBid + adjustedAsk) / 2;

    return {
      bidPrice: adjustedBid,
      askPrice: adjustedAsk,
      midPrice,
    };
  }
}
