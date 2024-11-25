import { BoardName } from "../domain/value-object/board-name";
import { StatusName } from "../domain/value-object/status-name";
import { TicketName } from "../domain/value-object/ticket-name";

export type CreateBoardProperties = {
  name: BoardName;
  description?: string;
};

export type CreateStatusProperties = {
  name: StatusName;
  board_id: string;
};

export type UpdateStatusPropertires = {
  id: string;
  name: StatusName;
};

export type UpdateStatusPositionsProperties = {
  board_id: string;
  positions: {id: number; position: number;}[]
}

export type CreateTicketProperties = {
  name: TicketName;
  description?: string;
  board_id: string;
  status_id: string;
}