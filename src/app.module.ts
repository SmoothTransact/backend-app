import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import { MailgunModule } from './mailgun/mailgun.module';
import { ClientsModule } from './clients/clients.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => ({
        type: 'postgres',
        host: configService.get<string>('database.dev.host'),
        port: configService.get<number>('database.dev.port'),
        username: configService.get<string>('database.dev.username'),
        password: configService.get<string>('database.dev.password'),
        database: configService.get<string>('database.dev.db'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    DatabaseModule,
    AuthGoogleModule,
    MailgunModule,
    ClientsModule,
  ],
})
export class AppModule {}
