// transactions.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dtos/transactions.dto';
import { Transaction } from './entities/transactions.entity';
import { WalletService } from '../wallet/wallet.service';
import { UsersService } from 'src/users/users.service';
import { InvoicesService } from '../invoices/invoices.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,

    private invoicesService: InvoicesService,
    private walletService: WalletService,
    private usersService: UsersService,
  ) {}

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    try {
      const { invoiceId, amount } = createTransactionDto;

      const invoiceDetails =
        await this.invoicesService.getInvoiceDetails(invoiceId);

      const clientEmail = invoiceDetails.user.email;

      const user = await this.usersService.findByEmail(clientEmail);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const newTransaction = this.transactionRepository.create({
        invoice: invoiceDetails,
        amount,
        status: 'pending',
      });

      newTransaction.user = user;

      const savedTransaction =
        await this.transactionRepository.save(newTransaction);
      await this.walletService.updateWalletBalance(user.id, amount);

      return savedTransaction;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create transaction');
    }
  }
}
