import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import { User } from '../userinfo/user.entity';
import { getCurrentDate } from 'src/common/util/date';
import { Bookmark } from './bookmark.entity';

@Entity({ name: 'bookmark_group' })
export class BookmarkGroup {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number;

    @ManyToOne(() => User, (user) => user.bookmarkGroup, {
        cascade: true
    })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;
    @Column({ name: 'user_id', type: 'int' })
    userId: number;

    @Column({ name: 'title', type: 'varchar', length: 20 })
    title: string;

    @Column({ name: 'created_at', type: 'timestamp' })
    createdAt: Date = getCurrentDate();

    @OneToMany(() => Bookmark, (bookmark) => bookmark.group)
    bookmark: Bookmark;
}
