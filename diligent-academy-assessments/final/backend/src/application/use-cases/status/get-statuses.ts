import { StatusRepository } from "../../../domain/repository/status.repository";
import { Status } from "../../../domain/status.entity";



export class GetStatuses {
    constructor(readonly statusRepo: StatusRepository) {}

    async onRequest(): Promise<Status[]> {
        const statuses = await this.statusRepo.findAllActive();
        return statuses;
    }
}