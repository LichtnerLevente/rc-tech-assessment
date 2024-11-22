import { StatusRepository } from "../../../domain/repository/status.repository";
import { Status } from "../../../domain/status.entity";


export class GetStatusByBoardId {
  constructor(private readonly repo: StatusRepository) {}

  async onRequest(boardId: string): Promise<Status[]> {
    try {
      return await this.repo.findByBoardId(boardId);
    } catch (error) {
      throw error;  //todo: proper error handling
    }
  }
}