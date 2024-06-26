import { ApiProperty } from '@nestjs/swagger';

export class CoinPricesResponseDto {
  @ApiProperty({ nullable: true })
  bidPrice: number | null;

  @ApiProperty({ nullable: true })
  askPrice: number | null;

  @ApiProperty({ nullable: true })
  midPrice: number | null;
}
