import { StatusRepository } from "../../../domain/repository/status.repository";
import { Status } from "../../../domain/status.entity";
import { CreateStatusProperties } from "../../../shared/types";



export class SqliteStatusRepository implements StatusRepository {
    async findAllActive(): Promise<Status[]> {
        throw new Error("Method not implemented.");
    }
    async findByBoardId(id: string): Promise<Status[]> {
        throw new Error("Method not implemented.");
    }
    async getById(id: string): Promise<Status> {
        throw new Error("Method not implemented.");
    }
    async create(status: CreateStatusProperties): Promise<Status> {
        throw new Error("Method not implemented.");
    }
    async update(status: Status): Promise<Status> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}