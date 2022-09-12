import { Column, Entity, JoinColumn, ObjectID, ObjectIdColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from './User';

@Entity({ name: 'profiles' })
export class Profile {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @Column()
    avatar: string
}