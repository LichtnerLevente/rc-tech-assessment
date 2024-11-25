import { BadRequestError } from "../../../domain/error/bad-request.error";
import { StatusRepository } from "../../../domain/repository/status.repository";
import { Status } from "../../../domain/status.entity";
import { NoRecordFound } from "../../../infrastructure/error/no-record-found";
import { UnsuccessfulQuerry } from "../../../infrastructure/error/unsuccessful-query.error";
import { UpdateStatusPositionsProperties } from "../../../shared/types";

export class updateStatusPositionsByBoardId {
  constructor(private readonly statusRepo: StatusRepository) {}

  async onRequest(properties: UpdateStatusPositionsProperties):Promise<Status[]> {
    try {
      return await this.statusRepo.updatePositionsByBoardId(properties);
    } catch (error) {
      if(error instanceof NoRecordFound){
        throw new BadRequestError("board_id", properties.board_id);
      }
      throw error;
    }   
  }
}