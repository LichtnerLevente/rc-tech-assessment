import { BadRequestError } from "../../../domain/error/bad-request.error";
import { StatusRepository } from "../../../domain/repository/status.repository";
import { Status } from "../../../domain/status.entity";
import { NoRecordFound } from "../../../infrastructure/error/no-record-found";


export class GetStatusById {
    constructor(readonly statusRepo: StatusRepository) {}

    async onRequest(id:string):Promise<Status> {
        try {
            return await this.statusRepo.getById(id);
        } catch (error) {
            if (error instanceof NoRecordFound) {
                throw new BadRequestError(id, "No record found");
              }
        
              throw error;
            }
    }
}