import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from '../base/comment.entity';
import { Feed } from './feed.entity';
import { User } from '../userinfo/user.entity';
import { getCurrentDate } from 'src/common/util/date';

@Entity({ name: 'feed_comment' })
export class FeedComment {
    @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
    id: number;

    @ManyToOne(() => User, (user) => user.comment, {
        cascade: true
    })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;
    @Column({ name: 'user_id', type: 'int' })
    userId: number;
    
    @ManyToOne(() => Feed, (feed) => feed.comment, {
        cascade: true
    })
    @JoinColumn({ name: 'feed_id' })
    feed: Feed;
    @Column({ name: 'feed_id', type: 'int' })
    feedId: number;

    @Column({ name: 'content', type: 'varchar', length: 2200 })
    content: string;

    @Column({ name: 'created_at', type: 'timestamp' })
    createdAt: Date = getCurrentDate();

    @Column({ name: 'updated_at', type: 'timestamp', nullable: true })
    updatedAt: Date | null;
}
