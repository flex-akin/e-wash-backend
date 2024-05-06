import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GuestOrders } from './guestOrders.entity';

@Entity({ name: 'guests' })
export class Guest {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column()
  email: string;
  @Column()
  fullName : string;
  @Column()
  phoneNumber: string;
  @Column({nullable: true})
  transactionRef: string;
  @Column()
  location: string;
  @Column({ type: 'text' })
  streetAddress: string;
  @Column({ type: 'text', nullable: true })
  instructions: string;
  @Column({ type: 'text' })
  guestCode: string;
  @Column({ type: 'decimal', precision: 18, scale: 2 })
  amount: number
  @Column({ type: 'boolean', default: false })
  isDelivered: boolean;
  @Column({ type: 'boolean', default: false })
  isPaid: boolean;
  @Column({ type: 'boolean', default: false })
  isCompleted: boolean;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => GuestOrders, (guestOrders)=> guestOrders.guest) 
  guestOrders: GuestOrders[]
}
