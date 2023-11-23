import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';

import { RedisRepositoryInterface } from './interface/redis.repository.interface';

@Injectable()
export class RedisRepository
  implements OnModuleDestroy, RedisRepositoryInterface
{
  constructor(@Inject('RedisClient') private readonly redisClient: Redis) {}

  onModuleDestroy(): void {
    this.redisClient.disconnect();
  }

  public async get(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  public async set(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  public async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  public async exists(key: string): Promise<number> {
    return await this.redisClient.exists(key);
  }

  public async sadd(
    key: string,
    member: string | number | Buffer,
  ): Promise<number> {
    return await this.redisClient.sadd(key, member);
  }

  public async setWithExpiry(
    key: string,
    value: string,
    expiry: number,
  ): Promise<void> {
    await this.redisClient.set(key, value, 'EX', expiry);
  }

  public async sismember(
    key: string,
    member: string | number | Buffer,
  ): Promise<number> {
    return await this.redisClient.sismember(key, member);
  }
}
