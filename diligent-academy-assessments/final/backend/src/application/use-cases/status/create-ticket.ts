import { BadRequestError } from "../../../domain/error/bad-request.error";
import { Ticket } from "../../../domain/ticket.entity";
import { NoRecordCreated } from "../../../infrastructure/error/no-record-created.error";
import { RecordNameInvalid } from "../../../infrastructure/error/record-name-invalid.error";
import { SqliteTicketRepository } from "../../../infrastructure/sqlite/repository/ticket.repository";
import { CreateTicketProperties } from "../../../shared/types";


export class CreateTicket {
  constructor(private readonly repo: SqliteTicketRepository) {}

  async onRequest(properties: CreateTicketProperties): Promise<Ticket> {
    try {
      return await this.repo.create(properties);
    } catch (error) {
      if (error instanceof RecordNameInvalid) {
        throw new BadRequestError(
          properties.name.getValue(),
          "Record name invalid"
        );
      } else if (error instanceof NoRecordCreated) {
        throw new BadRequestError(
          properties.name.getValue(),
          "No record created"
        );
      }
      throw error;
    }
  }
}