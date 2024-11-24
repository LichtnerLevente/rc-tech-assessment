import { CreateStatusProperties, UpdateStatusPropertires } from "../../shared/types";
import { Status } from "../status.entity";



export interface StatusRepository {
    findAllActive(): Promise<Status[]>;
    findByBoardId(id: string): Promise<Status[]>;
    getById(id: string): Promise<Status>;
    create(status: CreateStatusProperties): Promise<Status>;
    update(status: UpdateStatusPropertires): Promise<Status>;
    delete(id: string): Promise<void>;
}


