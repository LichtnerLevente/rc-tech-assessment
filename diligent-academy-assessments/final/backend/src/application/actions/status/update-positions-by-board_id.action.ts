import { FastifyReply, FastifyRequest } from "fastify";
import { operations } from "../../../openapi-spec/types";
import { updatePositionsSchema } from "./schemas";
import { z } from "zod";
import { BadRequestError } from "../../../domain/error/bad-request.error";
import { Status } from "../../../domain/status.entity";
import { UpdateStatusPositionsProperties } from "../../../shared/types";
import { updateStatusPositionsByBoardId } from "../../use-cases/status/update-status-positions-by-board_id";
import { SqliteStatusRepository } from "../../../infrastructure/sqlite/repository/status.repository";
import { UnsuccessfulQuerry } from "../../../infrastructure/error/unsuccessful-query.error";


type RequestParams = operations["updateStatusPositionsByBoardId"]["parameters"]["path"]["board_id"];
type RequestBody = operations["updateStatusPositionsByBoardId"]["requestBody"]["content"]["application/json"];
type Request = {
  Params: RequestParams;
  Body: RequestBody;
}

export async function updatePositionsAction(
  req: FastifyRequest<Request>,
  res: FastifyReply
):Promise<void> {
  try {
    const { params, body } = updatePositionsSchema.parse(req);
    const updatePositions: UpdateStatusPositionsProperties = {
      board_id: params.board_id,
      positions: body
    }

    const useCase = new updateStatusPositionsByBoardId(new SqliteStatusRepository());
    const updatedPositions = await useCase.onRequest(updatePositions)

    return res.status(200).send(updatedPositions.map(status => status.toView()));
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .send({ error: "Invalid parameters", details: error.errors });
    } else if(error instanceof UnsuccessfulQuerry) {
      res.status(400).send({error: "Invalid parameters"});
    } else if (error instanceof BadRequestError) {
      res.status(404).send({ error: "Not found" });
    } else {
    throw error;
    }
  }
}