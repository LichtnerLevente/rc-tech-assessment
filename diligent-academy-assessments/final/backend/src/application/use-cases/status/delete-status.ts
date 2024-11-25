import { BadRequestError } from "../../../domain/error/bad-request.error";
import { StatusRepository } from "../../../domain/repository/status.repository";
import { NoRecordUpdated } from "../../../infrastructure/error/no-record-updated.error";



export class DeletStatus {
  constructor(private readonly repo: StatusRepository) {}

  async onRequest(id:string): Promise<void> {
    try {
      await this.repo.delete(id);
    } catch (error) {
      if(error instanceof NoRecordUpdated) {
        throw new BadRequestError(id, "No record deleted");
      }

      throw error;
    }
  }
}