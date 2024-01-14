import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { User } from '../userinfo/user.entity';
import { Application } from '../enum/application.enum';
import { getCurrentDate } from 'src/common/util/date';

@Entity({ name: 'login_history' })
export class LoginHistory {
    @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
    id: number;

    @ManyToOne(() => User, (user) => user.loginHistory, {
        cascade: true
    })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;
    @Column({ name: 'user_id', type: 'int' })
    userId: number;

    @Column({ name: 'ip', type: 'varchar', length: 50 })
    ip: string;

    @Column({ name: 'application', type: 'enum', enum: Application })
    application: Application;

    @Column({ name: 'platform', type: 'varchar', length: 50 })
    platform: string;

    @Column({ name: 'logged_in', type: 'timestamp' })
    loggedIn: Date = getCurrentDate();

    @Column({ name: 'logged_out', type: 'timestamp', nullable: true })
    loggedOut: Date | null;
}
