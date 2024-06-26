import { registerAs } from '@nestjs/config';
import { DEFAULT_FETCH_TIMEOUT, DEFAULT_PORT } from 'src/util/constants';

export interface IAppConfig {
  serviceCommission: number;
  updateInterval: number;
  fetchTimeout: number;
  port: number;
}

export const appConfig = registerAs(
  'app',
  (): IAppConfig => ({
    serviceCommission: Number(process.env.SERVICE_COMMISSION),
    updateInterval: Number(process.env.UPDATE_INTERVAL),
    fetchTimeout: Number(process.env.FETCH_TIMEOUT) || DEFAULT_FETCH_TIMEOUT,
    port: Number(process.env.PORT) || DEFAULT_PORT,
  }),
);
