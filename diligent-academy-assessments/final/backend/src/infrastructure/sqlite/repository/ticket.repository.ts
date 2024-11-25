import { TicketRepository } from "../../../domain/repository/ticket.repository";
import { Ticket } from "../../../domain/ticket.entity";
import { CreateTicketProperties } from "../../../shared/types";
import { NoRecordFound } from "../../error/no-record-found";
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
  async create(status: CreateTicketProperties): Promise<Ticket> {
    throw new Error("Method not implemented.");
  }
  async getById(id: string): Promise<Ticket> {
    const database = await db;
    const ticket = await database.get("SELECT * FROM tickets WHERE id = ?", [id]);

    if (!ticket) {
      throw new NoRecordFound(id);
    }

    return Ticket.fromPersistence(ticket);
  }
  
  async updateById(status: Ticket): Promise<Ticket> {
    throw new Error("Method not implemented.");
  }
  
}