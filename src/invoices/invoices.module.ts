import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesService } from './invoices.service';
import { InvoiceController } from './invoices.controller';
import { Invoice } from './entities/invoice.entity';
import { TransactionsModule } from '../transactions/transactions.module';
import { PaystackService } from 'src/paystack/paystack.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice]),
    forwardRef(() => TransactionsModule),
  ],
  providers: [InvoicesService, PaystackService],
  controllers: [InvoiceController],
  exports: [InvoicesService],
})
export class InvoicesModule {}
