import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { User } from './User';
import { Game } from './Game';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: '20', nullable: true })
    @IsOptional()
    @IsString()
    @Length(1, 20)
    keyword: string;

    @Column({ default: false })
    @IsBoolean()
    isOwner: boolean;

    @ManyToOne(() => Game, (game) => game.gamePlayer)
    gameRoom: Game;

    @ManyToOne(() => User, (user) => user.myGame)
    player: User;
}
