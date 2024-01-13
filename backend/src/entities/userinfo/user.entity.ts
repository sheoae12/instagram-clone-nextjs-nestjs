import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    OneToMany
} from 'typeorm';
import { Feed } from '../feed/feed.entity';
import { FeedResourceGroup } from '../feed/feed-resource-group.entity';
import { Profile } from './profile.entity';
import { Bookmark } from '../bookmark/bookmark.entity';
import { BookmarkGroup } from '../bookmark/bookmark-group.entity';
import { getCurrentDate } from 'src/common/util/util';
import { LoginHistory } from '../history/login-history.entity';
import { Like } from '../base/like.entity';
import { Comment } from '../base/comment.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number;

    @Column({ name: 'user_id', type: 'uuid', unique: true })
    userId: string = uuidv4();

    @Column({ name: 'account', type: 'varchar', length: 15 })
    account: string;

    @Column({ name: 'nickname', type: 'varchar', length: 15 })
    nickname: string;

    @Column({ name: 'mail', type: 'varchar', length: 64 })
    mail: string;

    @Column({ name: 'tel', type: 'varchar', length: 15 })
    tel: string;

    @Column({ name: 'created_at', type: 'timestamp' })
    createdAt: Date = getCurrentDate();

    @Column({ name: 'updated_at', type: 'timestamp', nullable: true })
    updatedAt: Date | null;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt: Date | null;

    @OneToMany(() => Feed, (feed) => feed.user)
    feed: Feed;

    @OneToMany(
        () => FeedResourceGroup,
        (feedResourceGroup) => feedResourceGroup.user
    )
    feedResourceGroup: FeedResourceGroup;

    @OneToMany(() => Profile, (profile) => profile.user)
    profile: Profile;

    @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
    bookmark: Bookmark;

    @OneToMany(() => BookmarkGroup, (bookmarkGroup) => bookmarkGroup.user)
    bookmarkGroup: BookmarkGroup;

    @OneToMany(() => LoginHistory, (loginHistory) => loginHistory.user)
    loginHistory: LoginHistory;

    @OneToMany(() => Like, (like) => like.user)
    like: Like;

    @OneToMany(() => Comment, (comment) => comment.user)
    comment: Comment;
}
