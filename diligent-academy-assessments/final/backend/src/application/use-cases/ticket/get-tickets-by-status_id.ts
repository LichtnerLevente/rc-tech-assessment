import { BadRequestError } from "../../../domain/error/bad-request.error";
import { Ticket } from "../../../domain/ticket.entity";
import { NoRecordFound } from "../../../infrastructure/error/no-record-found";
import { SqliteTicketRepository } from "../../../infrastructure/sqlite/repository/ticket.repository";


export class getTicketsByStatusId {
  constructor(private readonly repo: SqliteTicketRepository) {}

  async onRequest(status_id: string): Promise<Ticket[]> {
    try {
      return await this.repo.findAllByStatusId(status_id);
    } catch (error) {
      if(error instanceof NoRecordFound){
        throw new BadRequestError(status_id, "No record found")
      }
      throw error;
    }
  }
}