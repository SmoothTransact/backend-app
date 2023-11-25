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
import { MailgunService } from '../mailgun/mailgun.service';
import { User } from '../users/entities/user.entity';
import { ClientsModule } from 'src/clients/clients.module';

@Module({
  imports: [
    UsersModule,
    ClientsModule,
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot(),
    JwtModule.register({}),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UsersService,
    MailgunService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
