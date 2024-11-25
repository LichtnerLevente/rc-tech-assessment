import { BadRequestError } from "../../../domain/error/bad-request.error";
import { TicketRepository } from "../../../domain/repository/ticket.repository";
import { Ticket } from "../../../domain/ticket.entity";
import { NoRecordFound } from "../../../infrastructure/error/no-record-found";


export class getTicketById {
  constructor(readonly repo: TicketRepository) { }

  async onRequest(id: string): Promise<Ticket> {
    try {
      return await this.repo.getById(id);
    } catch (error) {
      if (error instanceof NoRecordFound) {
        throw new BadRequestError(id, "No record found");
      }

      throw error;
    }
  }
}