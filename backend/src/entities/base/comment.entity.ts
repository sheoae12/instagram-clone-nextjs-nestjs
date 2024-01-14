import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { User } from '../userinfo/user.entity';
import { getCurrentDate } from 'src/common/util/date';

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
    id: number;

    @ManyToOne(() => User, (user) => user.comment, {
        cascade: true
    })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;
    @Column({ name: 'user_id', type: 'int' })
    userId: number;

    @Column({ name: 'content', type: 'varchar', length: 2200 })
    content: string;

    @Column({ name: 'created_at', type: 'timestamp' })
    createdAt: Date = getCurrentDate();

    @Column({ name: 'updated_at', type: 'timestamp', nullable: true })
    updatedAt: Date | null;
}
