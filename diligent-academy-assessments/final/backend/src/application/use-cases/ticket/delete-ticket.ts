import { BadRequestError } from "../../../domain/error/bad-request.error";
import { TicketRepository } from "../../../domain/repository/ticket.repository";
import { NoRecordUpdated } from "../../../infrastructure/error/no-record-updated.error";

export class DeleteTicket {
  constructor(private readonly repo: TicketRepository) {}

  async onRequest(id: string): Promise<void> {
    try {
      await this.repo.deleteById(id);
    } catch (error) {
      if (error instanceof NoRecordUpdated) {
        throw new BadRequestError(id, "No record deleted");
      }

      throw error;
    }
  }
}
