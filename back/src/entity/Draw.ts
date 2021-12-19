import { User } from './User';
import { Player } from './Player';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Draw {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
        nullable: true,
    })
    drawValue: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    nextKeyword: string;

    @Column({
        type: 'int',
        nullable: true,
    })
    phase: number;

    @ManyToOne(() => Player, (player) => player.drawList)
    initKeyword: Player;

    @ManyToOne(() => User, (user) => user.drawing)
    drwaingUser: User;
}
