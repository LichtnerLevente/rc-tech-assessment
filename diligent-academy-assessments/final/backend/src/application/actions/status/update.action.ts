import { FastifyReply, FastifyRequest } from "fastify";
import { updateSchema } from "./schemas";
import { operations } from "../../../openapi-spec/types";
import { StatusName } from "../../../domain/value-object/status-name";
import { UpdateStatusPropertires } from "../../../shared/types";
import { UpdateStatus } from "../../use-cases/status/update-status";
import { SqliteStatusRepository } from "../../../infrastructure/sqlite/repository/status.repository";
import { BadRequestError } from "../../../domain/error/bad-request.error";
import { z } from "zod";


type RequestParams = operations["updateStatus"]["parameters"]["path"]["id"];
type RequestBody = operations["updateStatus"]["requestBody"]["content"]["application/json"];
type Request = {
  Params: RequestParams;
  Body: RequestBody;
};

export async function updateAction(
  req: FastifyRequest<Request>,
  res: FastifyReply
): Promise<void> {
  try {
    const { params, body } = updateSchema.parse(req)

    const updateStatus: UpdateStatusPropertires = {
      id: params.id,
      name: new StatusName(body.name)
    }

    const useCase = new UpdateStatus(new SqliteStatusRepository());
    const updatedStatus = await useCase.onRequest(updateStatus);

    return res.status(200).send(updatedStatus.toView());
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .send({ error: "Invalid parameters", details: error.errors });
    } else if (error instanceof BadRequestError) {
      res.status(404).send({ error: "Not Found" });
    } else {
      res.status(500).send({ error: "Internal server error :(" });
    }
  }
}
