import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Like } from '../base/like.entity';
import { Feed } from './feed.entity';

@Entity({ name: 'feed_like' })
export class FeedLike extends Like {
    @ManyToOne(() => Feed, (feed) => feed.like, {
        cascade: true
    })
    @JoinColumn({ name: 'feed_id' })
    feed: Feed;
    @Column({ name: 'feed_id', type: 'int' })
    feedId: number;
}
