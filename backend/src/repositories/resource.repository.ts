import { Injectable } from "@nestjs/common";
import { getCurrentDate } from "src/common/util/date";
import { Resource } from "src/entities/resource/resource.entity";

import { DataSource, Repository } from "typeorm";

@Injectable()
export class ResourceRepository extends Repository<Resource> {
    constructor(dataSource: DataSource) {
        super(Resource, dataSource.createEntityManager());
    }

    createResource (url: string, type: string): Promise<Resource> {
        const resource = this.create();
        resource.url = decodeURI(url);
        resource.type = type;

        return this.save(resource);
    }
    
}