import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { redisClientFactory } from './redis.client.factory';
import { RedisRepository } from './repository/redis.repository';
import { RedisService } from './redis.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [],
  providers: [redisClientFactory, RedisRepository, RedisService],
  exports: [RedisService, redisClientFactory],
})
export class RedisModule {}
