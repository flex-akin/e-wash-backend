import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { User } from './user.entity';
  
  @Entity({ name: 'user_orders' })
  export class UserOrders {
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
    @ManyToOne(() => User, (user) => user.userOrders, {
      onDelete : "CASCADE"
    } )
    user : User
  }
 