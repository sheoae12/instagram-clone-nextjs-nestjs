import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { User } from './user.entity';
import { getCurrentDate } from 'src/common/util/date';

@Entity({ name: 'follower' })
export class Follower {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number;

    @ManyToOne(() => User, (user) => user.follower, {
        cascade: true
    })
    @JoinColumn({ name: 'follower_id', referencedColumnName: 'id' })
    follower: User;
    @Column({ name: 'follower_id', type: 'int' })
    followerId: number;

    @ManyToOne(() => User, (user) => user.following, {
        cascade: true
    })
    @JoinColumn({ name: 'following_id', referencedColumnName: 'id' })
    following: User;
    @Column({ name: 'following_id', type: 'int' })
    followingId: number;

    @Column({ name: 'accept', type: 'char', length: 1, default: 'F' })
    accept: string;

    @Column({ name: 'created_at', type: 'timestamp' })
    createdAt: Date = getCurrentDate();
}
