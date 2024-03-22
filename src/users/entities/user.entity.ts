import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { UserOrders } from './userOrders.entity';
import { Role } from 'src/auth/dtos/role.enum';
import { Plan } from './plan.entity';

@Entity({ name: 'users' })
@Unique('UQ_EMAIL', ['email'])
@Unique('UQ_USERNAME', ['username'])
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column()
  profile_picture: string;
  @Column()
  username: string;
  @Column()
  first_name: string;
  @Column()
  last_name: string;
  @Column()
  email: string;
  @Column()
  phone_number: string;
  @Column({ type: 'text' })
  address: string;
  @Column()
  password: string;
  @Column({ type: 'boolean', default: false })
  isDelivered: boolean;
  @Column({ type: 'boolean', default: false })
  isSubscribed : boolean;
  @Column({ type: 'boolean', default: false })
  isCompleted: boolean;
  @CreateDateColumn()
  @Column()
  remnant : number
  @Column({
    type: "enum",
    enum: Role,
    default: Role.User,
})
  role: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;


  @OneToMany(() => UserOrders, (userOrders)=> userOrders.user) 
  userOrders: UserOrders[]

  @ManyToOne(() => Plan, (plan)=> plan.users) 
  plan: Plan
}
