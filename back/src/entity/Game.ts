import { Player } from './Player';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
    IsBoolean,
    IsEnum,
    IsOptional,
    IsString,
    Length,
} from 'class-validator';

export enum gameStatus {
    open = 'Open',
    gaming = 'Gaming',
    close = 'Close',
}

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 50 })
    @IsString()
    @Length(1, 30)
    title: string;

    @Column({
        type: 'int',
    })
    phase: number;

    @Column({
        type: 'enum',
        enum: gameStatus,
    })
    @IsEnum(gameStatus)
    status: gameStatus;

    @Column({ type: 'varchar', nullable: true, length: 100 })
    @IsOptional()
    @IsString()
    password: string;

    @Column({
        default: false,
    })
    @IsBoolean()
    isSecret: Boolean;

    @OneToMany(() => Player, (player) => player.gameRoom)
    gamePlayer: Player[];

    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: 'datetime', nullable: true })
    updatedAt: Date;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    checkPasswordMatch(unhashedPassword: string) {
        return bcrypt.compareSync(unhashedPassword, this.password);
    }
}
