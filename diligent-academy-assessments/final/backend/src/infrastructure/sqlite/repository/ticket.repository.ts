import { TicketRepository } from "../../../domain/repository/ticket.repository";
import { Ticket } from "../../../domain/ticket.entity";
import { CreateTicketProperties } from "../../../shared/types";


export class SqliteTicketRepository implements TicketRepository {
  async findAll(): Promise<Ticket[]> {
    throw new Error("Method not implemented.");
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