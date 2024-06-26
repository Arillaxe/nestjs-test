import { BINANCE_API } from 'src/util/constants';
import { BaseProvider, Prices } from './base.provider';
import axios from 'axios';
import { Injectable, Logger } from '@nestjs/common';

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

  baseApiUrl: string = `${BINANCE_API}`;

  async getSymbolPrice(symbol): Promise<Prices> {
    const tickerReponse = await axios.get<PricesRepsponse>(
      `${this.baseApiUrl}/ticker/bookTicker?symbol=${symbol}`,
    );

    const bidPrice = Number(tickerReponse.data.bidPrice);
    const askPrice = Number(tickerReponse.data.askPrice);

    return {
      bidPrice,
      askPrice,
    };
  }
}
