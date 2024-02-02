import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    OneToMany,
    OneToOne,
    ManyToMany,
    JoinTable
} from 'typeorm';
import { Feed } from '../feed/feed.entity';
import { FeedResourceGroup } from '../feed/feed-resource-group.entity';
import { Profile } from './profile.entity';
import { Bookmark } from '../bookmark/bookmark.entity';
import { BookmarkGroup } from '../bookmark/bookmark-group.entity';
import { getCurrentDate } from 'src/common/util/date';
import { LoginHistory } from '../history/login-history.entity';
import { Like } from '../base/like.entity';
import { Comment } from '../base/comment.entity';
import { Follower } from './follower.entity';

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number;

    @Column({ name: 'uid', type: 'uuid', unique: true })
    uid: string;

    @Column({ name: 'firebase_uid', type: 'varchar', length: 128 })
    firebaseUid: string;

    @Column({ name: 'account', type: 'varchar', length: 64 })
    account: string;

    @Column({ name: 'phone_number', type: 'varchar', length: 64, nullable: true })
    phoneNumber: string | null;

    @Column({ name: 'name', type: 'varchar', length: 50, comment: '이름' })
    name: string;

    @Column({ name: 'nickname', type: 'varchar', length: 15, comment: '유저이름' })
    nickname: string;

    @Column({ name: 'profile_img', type: 'varchar', length: 255, nullable: true })
    profileImg: string;

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
    feedResourceGroup: FeedResourceGroup[];

    @OneToOne(() => Profile, (profile) => profile.user)
    profile: Profile;

    @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
    bookmark: Bookmark[];

    @OneToMany(() => BookmarkGroup, (bookmarkGroup) => bookmarkGroup.user)
    bookmarkGroup: BookmarkGroup[];

    @OneToMany(() => LoginHistory, (loginHistory) => loginHistory.user)
    loginHistory: LoginHistory[];

    @OneToMany(() => Like, (like) => like.user)
    like: Like[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comment: Comment[];

    @OneToMany(() => Follower, follower => follower.follower)
    follower: Follower[];

    @OneToMany(() => Follower, follower => follower.following)
    following: Follower[];
}
