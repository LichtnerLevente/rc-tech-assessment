import { FastifyReply, FastifyRequest } from "fastify";
import { byIdSchema } from "./schemas";
import { z } from "zod";
import { BadRequestError } from "../../../domain/error/bad-request.error";
import { DeleteTicket } from "../../use-cases/ticket/delete-ticket";
import { SqliteTicketRepository } from "../../../infrastructure/sqlite/repository/ticket.repository";

export async function deleteAction(
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> {
  try {
    const { id } = byIdSchema.parse(req.params);

    const useCase = new DeleteTicket(new SqliteTicketRepository());
    await useCase.onRequest(id);

    return res.status(204).send();
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
