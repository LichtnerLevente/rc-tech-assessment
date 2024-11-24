import { StatusRepository } from "../../../domain/repository/status.repository";
import { Status } from "../../../domain/status.entity";
import { UpdateStatusPositionsProperties } from "../../../shared/types";

export class updateStatusPositionsByBoardId {
  constructor(private readonly statusRepo: StatusRepository) {}

  async onRequest(positions: UpdateStatusPositionsProperties):Promise<Status[]> {
    try {
      return await this.statusRepo.updatePositionsByBoardId(positions);
    } catch (error) {
      throw error;
    }   
  }
}