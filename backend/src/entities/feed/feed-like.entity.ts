import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Feed } from './feed.entity';
import { getCurrentDate } from 'src/common/util/date';
import { User } from '../userinfo/user.entity';

@Entity({ name: 'feed_like' })
export class FeedLike {
    @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
    id: number;

    @ManyToOne(() => User, (user) => user.like, {
        cascade: true
    })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;
    @Column({ name: 'user_id', type: 'int' })
    userId: number;

    @ManyToOne(() => Feed, (feed) => feed.like, {
        cascade: true
    })
    @JoinColumn({ name: 'feed_id', referencedColumnName: 'id'  })
    feed: Feed;
    @Column({ name: 'feed_id', type: 'int' })
    feedId: number;

    @Column({ name: 'created_at', type: 'timestamp' })
    createdAt: Date = getCurrentDate();
}
