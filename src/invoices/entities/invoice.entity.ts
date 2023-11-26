import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Transaction } from '../../transactions/entities/transactions.entity';
import { Alert } from '../../alerts/entities/alert.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ default: 'unpaid' }) // 'unpaid', 'partially_paid', 'paid'
  status: string;

  @OneToMany(() => Transaction, (transaction) => transaction.invoice, {
    cascade: true,
  })
  transactions: Transaction[];

  @OneToMany(() => Alert, (alert) => alert.invoice, { cascade: true })
  alerts: Alert[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
