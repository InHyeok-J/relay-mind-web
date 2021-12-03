import { Player } from './Player';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

export enum status {
    'Open',
    'Gaming',
    'Close',
}

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 50 })
    title: string;

    @Column({
        type: 'enum',
        enum: status,
    })
    status: status;

    @Column({ type: 'varchar', nullable: true, length: 100 })
    password: string;

    @Column({
        default: false,
    })
    isSecret: Boolean;

    @OneToMany(() => Player, (player) => player.gameRoom)
    gamePlayer: Player[];

    @CreateDateColumn()
    createdAt: Date;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    checkPasswordMatch(unhashedPassword: string) {
        return bcrypt.compareSync(unhashedPassword, this.password);
    }
}
