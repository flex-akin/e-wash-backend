import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'plan' })
export class Plan{
    @PrimaryGeneratedColumn({type: "bigint"})
    id: number;
    @Column()
    type : string;
    @Column({ type: 'decimal', precision : 18, scale: 2 })
    price : number
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
    @OneToMany(() => User, (user) => user.plan)
    users : User[]
}