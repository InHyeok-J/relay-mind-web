import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 20, unique: true })
    userId: string;

    @Column('varchar', { length: 20, unique: true })
    nickname: string;

    @Column('varchar', { length: 100 })
    password: string;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    checkPasswordMatch(unhashedPassword: string) {
        return bcrypt.compareSync(unhashedPassword, this.password);
    }
}
