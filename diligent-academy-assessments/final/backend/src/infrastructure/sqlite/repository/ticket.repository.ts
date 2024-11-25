import { TicketRepository } from "../../../domain/repository/ticket.repository";
import { Ticket } from "../../../domain/ticket.entity";
import { CreateTicketProperties } from "../../../shared/types";
import { db } from "../db";


export class SqliteTicketRepository implements TicketRepository {
  async findAllActive(): Promise<Ticket[]> {
    const database = await db;
    const tickets = await database.all("SELECT * FROM tickets WHERE deleted_at IS NULL");

    return tickets.map(Ticket.fromPersistence);
  }
  async findAllByBoardId(board_id: string): Promise<Ticket[]> {
    throw new Error("Method not implemented.");
  }
  async findAllByStatusId(status_id: string): Promise<Ticket[]> {
    throw new Error("Method not implemented.");
  }
  async create(status: CreateTicketProperties): Promise<Ticket> {
    throw new Error("Method not implemented.");
  }
  async getById(id: string): Promise<Ticket> {
    throw new Error("Method not implemented.");
  }
  async updateById(status: Ticket): Promise<Ticket> {
    throw new Error("Method not implemented.");
  }
  
}