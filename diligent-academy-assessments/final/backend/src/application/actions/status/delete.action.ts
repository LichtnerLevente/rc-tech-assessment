import { FastifyReply, FastifyRequest } from "fastify";
import { byIdSchema } from "./schemas";
import { DeletStatus } from "../../use-cases/status/delete-status";
import { SqliteStatusRepository } from "../../../infrastructure/sqlite/repository/status.repository";
import { z } from "zod";
import { BadRequestError } from "../../../domain/error/bad-request.error";



export async function deleteAction(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const { id } = byIdSchema.parse(req.params);

    const useCase = new DeletStatus(new SqliteStatusRepository());
    await useCase.onRequest(id);

    return res.status(204).send();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: "Invalid parameters", details: error.errors });
    } else if (error instanceof BadRequestError) {
      res.status(404).send({ error: "Not found" });
    } else {
      return res.status(500).send({ error: "Internal server error :(" });
    }
  }
}
