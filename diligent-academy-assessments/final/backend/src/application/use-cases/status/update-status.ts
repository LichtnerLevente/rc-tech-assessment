import { BadRequestError } from "../../../domain/error/bad-request.error";
import { StatusRepository } from "../../../domain/repository/status.repository";
import { Status } from "../../../domain/status.entity";
import { UpdateStatusPropertires } from "../../../shared/types";


export class UpdateStatus {
    constructor(private readonly statusRepo: StatusRepository) { }

    async onRequest(status: UpdateStatusPropertires): Promise<Status> {
        try {
            return await this.statusRepo.update(status);
        } catch (error) {
            throw new BadRequestError(status.id, "Status not found");
        }
    }
}

