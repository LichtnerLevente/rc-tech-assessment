import { BoardName } from "../domain/value-object/board-name";
import { StatusName } from "../domain/value-object/status-name";

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
