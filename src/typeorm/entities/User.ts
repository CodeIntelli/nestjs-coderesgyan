import { Document } from 'mongoose';
import { Column, Entity, JoinColumn, ObjectID, ObjectIdColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from './Profile';

@Entity({ name: 'user' })
export class User {
    @ObjectIdColumn()
    id: ObjectID;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    createdAt: Date;

    @Column({ nullable: true })
    authStrategy: string;

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile;

}