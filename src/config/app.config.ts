import { registerAs } from '@nestjs/config';
import { DEFAULT_PORT } from 'src/util/constants';

export interface IAppConfig {
  serviceCommission: number;
  updateInterval: number;
  port: number;
}

export const appConfig = registerAs(
  'app',
  (): IAppConfig => ({
    serviceCommission: Number(process.env.SERVICE_COMMISSION),
    updateInterval: Number(process.env.UPDATE_INTERVAL),
    port: Number(process.env.PORT) || DEFAULT_PORT,
  }),
);
