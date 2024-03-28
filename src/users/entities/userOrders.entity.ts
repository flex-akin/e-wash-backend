import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
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
    @Column({ type: 'boolean', default: false })
    isDelivered: boolean;
    @Column({ type: 'boolean', default: false })
    isCompleted: boolean;
    @Column({nullable: true})
    pickUpDate : Date;
    @Column()
    orderCode : string;
    @ManyToOne(() => User, (user) => user.userOrders, {
      onDelete : "CASCADE"
    } )
    @JoinColumn({ name: 'user_id' })
    user : User
  }
 