import { Player } from './Player';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Draw {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
        nullable: false,
    })
    drawValue: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    nextKeyword: string;

    @Column({
        type: 'int',
        nullable: false,
    })
    phase: number;

    @ManyToOne(() => Player, (player) => player.drawList)
    initKeyword: Player;
}
