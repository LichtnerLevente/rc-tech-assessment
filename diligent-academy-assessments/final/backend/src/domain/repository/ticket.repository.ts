import { CreateTicketProperties } from "../../shared/types";
import { Ticket } from "../ticket.entity";


export interface TicketRepository {
  findAllActive(): Promise<Ticket[]>;
  findAllByBoardId(board_id: string): Promise<Ticket[]>;
  findAllByStatusId(status_id: string): Promise<Ticket[]>;
  create(status: CreateTicketProperties): Promise<Ticket>;
  getById(id: string): Promise<Ticket>;
  update(status: Ticket): Promise<Ticket>;
  delete(id: string):Promise<void>;
}