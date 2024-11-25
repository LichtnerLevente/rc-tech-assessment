import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { BadRequestError } from "../../../domain/error/bad-request.error";
import { byIdSchema } from "./schemas";
import { operations } from "../../../openapi-spec/types";
import { getTicketById } from "../../use-cases/ticket/get-ticket-by-id";
import { SqliteTicketRepository } from "../../../infrastructure/sqlite/repository/ticket.repository";

export async function getAction(
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> {
  try {
    const { id } = byIdSchema.parse(req.params);

    const useCase = new getTicketById(new SqliteTicketRepository());
    const ticket = await useCase.onRequest(id);

    return res.status(200).send(ticket.toView());
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .send({ error: "Invalid parameters", details: error.errors });
    } else if (error instanceof BadRequestError) {
      res.status(404).send({ error: "Not found" });
    } else {
      res.status(500).send({ error: "Internal server error" });
    }
  }
}
