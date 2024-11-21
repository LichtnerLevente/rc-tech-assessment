import { CreateStatusProperties } from "../../shared/types";
import { Status } from "../status.entity";



export interface StatusRepository {
    findAll(): Promise<Status[]>;
    findByBoardId(id: string): Promise<Status[]>;
    getById(id: string): Promise<Status>;
    create(status: CreateStatusProperties): Promise<Status>;
    update(status: Status): Promise<Status>;
    delete(id: string): Promise<void>;
}


