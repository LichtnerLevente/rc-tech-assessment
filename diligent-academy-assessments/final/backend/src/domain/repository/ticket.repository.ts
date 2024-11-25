import { CreateTicketProperties } from "../../shared/types";
import { Ticket } from "../ticket.entity";


export interface TicketRepository {
  findAll(): Promise<Ticket[]>;
  findAllByBoardId(board_id: string): Promise<Ticket[]>;
  findAllByStatusId(status_id: string): Promise<Ticket[]>;
  create(status: CreateTicketProperties): Promise<Ticket>;
  getById(id: string): Promise<Ticket>;
  updateById(status: Ticket): Promise<Ticket>;
}