import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

export const redisClientFactory: FactoryProvider<Redis> = {
  provide: 'RedisClient',
  useFactory: async (configService: ConfigService) => {
    const redisUrl = configService.get<string>('redis_url');

    if (!redisUrl) {
      throw new Error('Redis URL not provided in the configuration');
    }

    const redisInstance = new Redis(redisUrl);

    redisInstance.on('error', (e) => {
      throw new Error(`Redis connection failed: ${e}`);
    });

    return redisInstance;
  },
  inject: [ConfigService],
};
