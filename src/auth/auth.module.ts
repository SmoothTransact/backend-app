// auth.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { RedisModule } from 'src/redis/redis.module';
import { RedisRepository } from '../redis/repository/redis.repository';
import { RedisService } from 'src/redis/redis.service';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    UsersModule,
    RedisModule,
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot(),
    JwtModule.register({}),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UsersService,
    RedisService,
    RedisRepository,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
