import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { BadRequestError } from "../../../domain/error/bad-request.error";
import { operations } from "../../../openapi-spec/types";
import { createSchema } from "./schemas";
import { CreateStatusProperties } from "../../../shared/types";
import { StatusName } from "../../../domain/value-object/status-name";
import { CreatStatus } from "../../use-cases/status/create-status";
import { SqliteStatusRepository } from "../../../infrastructure/sqlite/repository/status.repository";


type RequestBody = operations["createStatus"]["requestBody"]["content"]["application/json"];

export async function createAction(
  req: FastifyRequest<{ Body: RequestBody }>,
  res: FastifyReply
): Promise<void> {
  try {
    const {body} = createSchema.parse(req);

    const createProperties: CreateStatusProperties = {
      name: new StatusName(body.name),
      board_id: body.board_id.toString()
    };

    const useCase = new CreatStatus(new SqliteStatusRepository());
    const createdStatus = await useCase.onRequest(createProperties);

    return res.status(201).send(createdStatus.toView());
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .send({ error: "Invalid parameters", details: error.errors });
    } else if (error instanceof BadRequestError) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(500).send({ error: "Internal server error :(" });
    }
  }
}
