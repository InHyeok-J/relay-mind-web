import { Player } from './Player';
import {
    Column,
    Entity,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsString, Length } from 'class-validator';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 20, unique: true })
    @IsString()
    @Length(4, 20)
    userId: string;

    @Column('varchar', { length: 20, unique: true })
    @IsString()
    @Length(4, 20)
    nickname: string;

    @Column('varchar', { length: 100 })
    @IsString()
    password: string;

    @OneToMany(() => Player, (player) => player.player)
    myGame: Player[];

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    checkPasswordMatch(unhashedPassword: string) {
        return bcrypt.compareSync(unhashedPassword, this.password);
    }
}
