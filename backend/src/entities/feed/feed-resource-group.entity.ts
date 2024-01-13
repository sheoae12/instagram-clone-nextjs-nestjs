import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { User } from '../userinfo/user.entity';
import { Feed } from './feed.entity';

@Entity({ name: 'feed_resource_group' })
export class FeedResourceGroup {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number;

    @ManyToOne(() => User, (user) => user.feedResourceGroup, {
        cascade: true
    })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;
    @Column({ name: 'user_id', type: 'int' })
    userId: number;

    @ManyToOne(() => Feed, (feed) => feed.feedResourceGroup, {
        cascade: true
    })
    @JoinColumn({ name: 'feed_id', referencedColumnName: 'id' })
    feed: Feed;
    @Column({ name: 'feed_id', type: 'int' })
    feedId: number;

    @Column({ name: 'items', type: 'json' })
    items: JSON;
}
