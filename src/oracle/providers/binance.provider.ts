import { BINANCE_API } from 'src/util/constants';
import { BaseProvider, Prices } from './base.provider';
import axios from 'axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface PricesRepsponse {
  bidPrice: string;
  askPrice: string;
}

export enum BinanceSymbols {
  BTCUSDT = 'BTCUSDT',
}

@Injectable()
export class BinanceProvider implements BaseProvider<BinanceSymbols> {
  logger = new Logger(BinanceProvider.name);

  constructor(private readonly configService: ConfigService) {}

  baseApiUrl: string = `${BINANCE_API}`;

  async getSymbolPrice(symbol): Promise<Prices> {
    const tickerReponse = await axios.get<PricesRepsponse>(
      `${this.baseApiUrl}/ticker/bookTicker?symbol=${symbol}`,
      {
        timeout: this.configService.get('app.fetchTimeout'),
      },
    );

    const bidPrice = Number(tickerReponse.data.bidPrice);
    const askPrice = Number(tickerReponse.data.askPrice);

    return {
      bidPrice,
      askPrice,
    };
  }
}
