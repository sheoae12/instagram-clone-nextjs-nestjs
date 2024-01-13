import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Comment } from '../base/comment.entity';
import { Feed } from './feed.entity';

@Entity({ name: 'feed_comment' })
export class FeedComment extends Comment {
    @ManyToOne(() => Feed, (feed) => feed.comment, {
        cascade: true
    })
    @JoinColumn({ name: 'feed_id' })
    feed: Feed;
    @Column({ name: 'feed_id', type: 'int' })
    feedId: number;
}
