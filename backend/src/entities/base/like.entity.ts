import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { User } from '../userinfo/user.entity';
import { getCurrentDate } from 'src/common/util/date';

@Entity()
export class Like extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
    id: number;

    @ManyToOne(() => User, (user) => user.like, {
        cascade: true
    })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;
    @Column({ name: 'user_id', type: 'int' })
    userId: number;

    @Column({ name: 'created_at', type: 'timestamp' })
    createdAt: Date = getCurrentDate();
}
