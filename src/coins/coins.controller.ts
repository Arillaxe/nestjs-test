import { Controller, Get } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CoinPricesResponseDto } from './coins.dto';

@Controller('coins')
@ApiTags('Coins')
export class CoinsControlller {
  constructor(private readonly coinsService: CoinsService) {}

  @Get('/BTC-USDT')
  @ApiOkResponse({ type: CoinPricesResponseDto })
  async getBtc(): Promise<CoinPricesResponseDto> {
    return await this.coinsService.getBtcUsdtPrices();
  }
}
