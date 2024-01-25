import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FileType } from '../enum/filetype.enum';
import { getCurrentDate } from 'src/common/util/date';
import { FeedResourceGroup } from '../feed/feed-resource-group.entity';
import { Feed } from '../feed/feed.entity';

@Entity({ name: 'resource' })
export class Resource {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number;

    @Column({ name: 'type', type: 'varchar', length: 10 })
    type: string;

    @Column({ name: 'url', type: 'varchar', length: 255 })
    url: string;

    @Column({ name: 'created_at', type: 'timestamp' })
    createdAt: Date = getCurrentDate();

    @OneToOne(() => Feed, (feed) => feed.resource) 
    feed: Feed;
}
