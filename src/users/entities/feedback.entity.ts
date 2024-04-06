import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'feedback' })
export class Feedback{
    @PrimaryGeneratedColumn({type: "bigint"})
    id: number; 
    @Column()
    subject : string;
    @Column({ type: 'text'})
    message : string
    @CreateDateColumn()
    created_at: Date;
}