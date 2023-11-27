// wallet.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './entities/wallet.entity';
import { generateUniqueWalletId } from 'src/utils/generateRandom';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
  ) {}

  async createWallet(): Promise<Wallet> {
    const wallet = this.walletRepository.create({
      walletId: generateUniqueWalletId(10),
      balance: { amount: 0 },
    });

    return this.walletRepository.save(wallet);
  }
}
