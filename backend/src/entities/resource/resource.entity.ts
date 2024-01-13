import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { FileType } from '../enum/filetype.enum';
import { getCurrentDate } from 'src/common/util/util';

@Entity({ name: 'resource' })
export class Resource {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number;

    @Column({ name: 'type', type: 'enum', enum: FileType })
    type: FileType;

    @Column({ name: 'url', type: 'varchar', length: 255 })
    url: string;

    @Column({ name: 'created_at', type: 'timestamp' })
    createdAt: Date = getCurrentDate();
}
