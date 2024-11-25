import { BadRequestError } from "../../../domain/error/bad-request.error";
import { Ticket } from "../../../domain/ticket.entity";
import { SqliteTicketRepository } from "../../../infrastructure/sqlite/repository/ticket.repository";

export class UpdateTicket {
  constructor(private readonly repo: SqliteTicketRepository) {}

  async onRequest(ticket: Ticket): Promise<Ticket> {
    try {
      return await this.repo.update(ticket);
    } catch (error) {
      throw new BadRequestError(ticket.id, "Ticket not found");
    }
  }
}
