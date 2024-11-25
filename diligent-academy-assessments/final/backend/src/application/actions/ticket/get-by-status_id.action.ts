import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { BadRequestError } from "../../../domain/error/bad-request.error";
import { byIdSchema } from "./schemas";
import { SqliteTicketRepository } from "../../../infrastructure/sqlite/repository/ticket.repository";
import { GetTicketsByBoardId } from "../../use-cases/ticket/get-tickets-by-board_id";
import { Ticket } from "../../../domain/ticket.entity";
import { getTicketsByStatusId } from "../../use-cases/ticket/get-tickets-by-status_id";


export async function getByStatusIdAction(
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> {
  try {
    const { id: status_id } = byIdSchema.parse(req.params);

    const useCase = new getTicketsByStatusId(new SqliteTicketRepository());
    const tickets: Ticket[] = await useCase.onRequest(status_id);

    return res.status(200).send(tickets.map(status => status.toView()));
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