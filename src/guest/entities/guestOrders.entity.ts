import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { Guest } from './guest.entity';
  
  @Entity({ name: 'guest_orders' })
  export class GuestOrders {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
    @Column()
    clotheType: string;
    @Column()
    quantity: number;
    @Column({ type: 'decimal', precision : 18, scale: 2 })
    amount: number;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
    @ManyToOne(() => Guest, (guest) => guest.guestOrders )
    guest : Guest
  }
 