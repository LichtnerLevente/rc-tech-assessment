import { StatusRepository } from "../../../domain/repository/status.repository";
import { Status } from "../../../domain/status.entity";

export class updateStatusPositionsByBoardId {
  constructor(private readonly statusRepo: StatusRepository) {}

  async onRequest():Promise<Status[]> {
    try {
      throw new Error("Not Implemented");
      
    } catch (error) {
      throw error;
    }   
  }
}