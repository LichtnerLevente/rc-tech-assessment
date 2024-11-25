import { BadRequestError } from "../../../domain/error/bad-request.error";
import { StatusRepository } from "../../../domain/repository/status.repository";
import { Status } from "../../../domain/status.entity";
import { NoRecordFound } from "../../../infrastructure/error/no-record-found";


export class GetStatusByBoardId {
  constructor(private readonly repo: StatusRepository) {}

  async onRequest(board_id: string): Promise<Status[]> {
    try {
      return await this.repo.findByBoardId(board_id);
    } catch (error) {
      if(error instanceof NoRecordFound){
        throw new BadRequestError(board_id, "No record found")
      }
      throw error;
    }
  }
}