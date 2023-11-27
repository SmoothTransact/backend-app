import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Roles } from '../types/user.types';
import { Types } from '../types/user.types';
import { ClientProfile } from '../../clients/entities/client.entity';
import { Alert } from '../../alerts/entities/alert.entity';
import { Wallet } from '../../wallet/entities/wallet.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  types: Types;

  @OneToOne(() => Wallet, (wallet) => wallet.user, { cascade: true })
  @JoinColumn()
  wallet: Wallet;

  @Column({ default: 'user' })
  role: Roles;

  @Column({ nullable: true })
  refreshToken?: string;

  @OneToMany(() => ClientProfile, (clientProfile) => clientProfile.user, {
    cascade: true,
  })
  clientProfiles: ClientProfile[];

  @OneToMany(() => Alert, (alert) => alert.user, { cascade: true })
  alerts: Alert[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
