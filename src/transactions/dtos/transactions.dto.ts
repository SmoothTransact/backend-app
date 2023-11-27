// transaction.dto.ts
import { IsUUID, IsNumber } from 'class-validator';
// import { Transaction } from '../entities/transactions.entity';

export class CreateTransactionDto {
  @IsUUID()
  invoiceId: string;

  @IsNumber()
  amount: number;
}
