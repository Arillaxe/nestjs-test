export interface Prices {
  bidPrice: number;
  askPrice: number;
}

export abstract class BaseProvider<SymbolsEnum = unknown> {
  abstract baseApiUrl: string;

  abstract getSymbolPrice(symbol: SymbolsEnum): Promise<Prices>;
}
