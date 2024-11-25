import { TicketRepository } from "../../../domain/repository/ticket.repository";
import { Ticket } from "../../../domain/ticket.entity";

export class GetTickets {
  constructor(readonly repo: TicketRepository) {}

  async onRequest(): Promise<Ticket[]> {
    const tickets = await this.repo.findAllActive();

    return tickets;
  }
}