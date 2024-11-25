import { TicketRepository } from "../../../domain/repository/ticket.repository";
import { Ticket } from "../../../domain/ticket.entity";
import { CreateTicketProperties } from "../../../shared/types";
import { NoRecordCreated } from "../../error/no-record-created.error";
import { NoRecordFound } from "../../error/no-record-found";
import { NoRecordUpdated } from "../../error/no-record-updated.error";
import { RecordNameInvalid } from "../../error/record-name-invalid.error";
import { db } from "../db";


export class SqliteTicketRepository implements TicketRepository {


  async findAllActive(): Promise<Ticket[]> {
    const database = await db;
    const tickets = await database.all("SELECT * FROM tickets WHERE deleted_at IS NULL");

    return tickets.map(Ticket.fromPersistence);
  }
  async findAllByBoardId(board_id: string): Promise<Ticket[]> {
    const database = await db;
    const tickets = await database.all(
      "SELECT * FROM tickets WHERE tickets.board_id = ?  AND tickets.deleted_at IS NULL", [board_id]);

    if (tickets.length === 0) {
      throw new NoRecordFound(board_id)
    }

    return tickets.map(Ticket.fromPersistence);
  }
  async findAllByStatusId(status_id: string): Promise<Ticket[]> {
    const database = await db;
    const tickets = await database.all(
      "SELECT * FROM tickets WHERE tickets.status_id = ?  AND tickets.deleted_at IS NULL", [status_id]);

    if (tickets.length === 0) {
      throw new NoRecordFound(status_id)
    }

    return tickets.map(Ticket.fromPersistence);
  }
  async create(properties: CreateTicketProperties): Promise<Ticket> {
    const database = await db;
    try {
      const created = await database.get(
        "INSERT INTO tickets (name, description, board_id, status_id) VALUES (?, ?, ?, ?) RETURNING *"
        , [properties.name.getValue(), properties.description, properties.board_id, properties.status_id]);

      if (created.changes === 0) {
        throw new NoRecordCreated();
      }
      
      return Ticket.fromPersistence(created);
    } catch (error) {
      if ((error as { code: string })?.code === "SQLITE_CONSTRAINT") {
        throw new RecordNameInvalid(properties.name.getValue());
      }
      throw error;
    }
  }

  async getById(id: string): Promise<Ticket> {
    const database = await db;
    const ticket = await database.get("SELECT * FROM tickets WHERE id = ?", [id]);

    if (!ticket) {
      throw new NoRecordFound(id);
    }

    return Ticket.fromPersistence(ticket);
  }
  async update(ticket: Ticket): Promise<Ticket> {
    const database = await db;

    try {
      const updated = await database.get(
        "UPDATE tickets SET name = ?, description = ?, status_id = ? updated_at = CURRENT_TIMESTAMP WHERE id = ? RETURNING *",
        [ticket.name.getValue(), ticket.description, ticket.status_id, ticket.id]
      );

      if (updated.changes === 0) {
        throw new NoRecordUpdated(ticket.id);
      }

      return Ticket.fromPersistence(updated);
    } catch (error) {
      if ((error as { code: string })?.code === "SQLITE_CONSTRAINT") {
        throw new RecordNameInvalid(ticket.name.getValue());
      }

      throw error;
    }

  }
  async delete(id: string): Promise<void> {
    const database = await db;
    const deleted = await database.run(
      "UPDATE tickets SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?",
      [id]
    );

    if (deleted.changes === 0) {
      throw new NoRecordUpdated(id);
    }
  }
}
