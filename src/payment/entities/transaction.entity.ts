import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';

  
  @Entity({ name: 'transactions' })
  export class Transaction {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
    @Column()
    transactionRef: string;
    @Column()
    transactionDate: Date;
    @Column()
    module: string;
    @Column({ type: 'text' })
    status: string;
    @Column({ type: 'text', nullable: true })
    channel: string;
    @Column()
    guestCode : string;
    @Column()
    userId: number;
    @Column({ type: 'longtext' , nullable: true })
    response: string;
    @Column({ type: 'decimal', precision: 18, scale: 2 })
    amount: number
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
  }
