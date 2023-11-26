import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayStack } from './entities/paystack.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PayStack])],
})
export class PaystackModule {}
