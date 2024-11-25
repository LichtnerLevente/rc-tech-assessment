import { FastifyReply, FastifyRequest } from "fastify";
import { byIdSchema } from "./schemas";
import { SqliteStatusRepository } from "../../../infrastructure/sqlite/repository/status.repository";
import { GetStatusByBoardId } from "../../use-cases/status/get-statuses-by-board_id";
import { Status } from "../../../domain/status.entity";
import { BadRequestError } from "../../../domain/error/bad-request.error";
import { z } from "zod";


export async function GetByBoardIdAction(
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> {
  try {
    const { id: board_id } = byIdSchema.parse(req.params);

    const useCase = new GetStatusByBoardId(new SqliteStatusRepository());
    const statuses: Status[] = await useCase.onRequest(board_id);

    return res.status(200).send(statuses.map(status => status.toView()));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send({ error: "Invalid parameter", details: error.errors })
    } else if (error instanceof BadRequestError) {
      return res.status(404).send({ error: "Not found" })
    } else {
      return res.status(500).send({ error: "Internal server error :(" });
    }
  }
}