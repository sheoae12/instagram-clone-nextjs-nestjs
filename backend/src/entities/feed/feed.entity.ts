import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import { User } from '../userinfo/user.entity';
import { FeedResourceGroup } from './feed-resource-group.entity';
import { FeedLike } from './feed-like.entity';
import { FeedComment } from './feed-comment.entity';
import { getCurrentDate } from 'src/common/util/date';
import { Resource } from '../resource/resource.entity';
import { Bookmark } from '../bookmark/bookmark.entity';

@Entity({ name: 'feed' })
export class Feed {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number;

    @ManyToOne(() => User, (user) => user.feed, {
        cascade: true
    })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;
    @Column({ name: 'user_id', type: 'int' })
    userId: number;

    @Column({ name: 'caption', type: 'varchar', length: 2200 })
    caption: string;

    @Column({ name: 'created_at', type: 'timestamp' })
    createdAt: Date = getCurrentDate();

    @Column({ name: 'updated_at', type: 'timestamp', nullable: true })
    updatedAt: Date | null;

    @OneToMany(
        () => FeedResourceGroup,
        (feedResourceGrouop) => feedResourceGrouop.feed
    )
    feedResourceGroup: FeedResourceGroup[];

    @OneToMany(() => FeedLike, (feedLike) => feedLike.feed)
    like: FeedLike[];

    @OneToMany(() => Bookmark, (bookmark) => bookmark.feed)
    bookmark: Bookmark[];

    @OneToMany(() => FeedComment, (feedComment) => feedComment.feed)
    comment: FeedComment[];

    @ManyToOne(() => Resource, (resource) => resource.feed, {
        cascade: true
    })
    @JoinColumn({ name: 'resource_id', referencedColumnName: 'id' })
    resource: Resource;
    @Column({ name: 'resource_id', type: 'int' })
    resourceId: number;
}
