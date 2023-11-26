import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Roles, ROLES } from '../types/user.types';
import { ClientProfile } from '../../clients/entities/client.entity';
import { Alert } from '../../alerts/entities/alert.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: ROLES.USER })
  role: Roles;

  @Column({ nullable: true })
  refreshToken?: string;

  @OneToMany(() => ClientProfile, (clientProfile) => clientProfile.user, {
    cascade: true,
  })
  clientProfiles: ClientProfile[];

  @OneToMany(() => Alert, (alert) => alert.user)
  alerts: Alert[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
