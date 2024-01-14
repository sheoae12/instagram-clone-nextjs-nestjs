import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { BookmarkGroup } from './bookmark-group.entity';
import { User } from '../userinfo/user.entity';
import { getCurrentDate } from 'src/common/util/date';

@Entity({ name: 'bookmark' })
export class Bookmark {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number;

    @ManyToOne(() => BookmarkGroup, (bookmarkGroup) => bookmarkGroup.bookmark, {
        cascade: true
    })
    @JoinColumn({ name: 'group_id' })
    group!: BookmarkGroup | null;
    @Column({ name: 'group_id', type: 'int', nullable: true })
    groupId: number;

    @ManyToOne(() => User, (user) => user.bookmark, {
        cascade: true
    })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;
    @Column({ name: 'user_id', type: 'int' })
    userId: number;

    @Column({ name: 'created_at', type: 'timestamp' })
    createdAt: Date = getCurrentDate();
}
