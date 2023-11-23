import { Inject, Injectable } from '@nestjs/common';
import { RedisRepository } from '../redis/repository/redis.repository';

const tenMinutesInSeconds = 60 * 10;

@Injectable()
export class RedisService {
  constructor(
    @Inject(RedisRepository) private readonly redisRepository: RedisRepository,
  ) {}

  async saveResetToken(userId: string, token: string): Promise<void> {
    // Expiry is set to 10 minutes
    await this.redisRepository.setWithExpiry(
      token,
      userId,
      tenMinutesInSeconds,
    );
  }

  async getResetToken(token: string): Promise<string | null> {
    return await this.redisRepository.get(token);
  }
}
