import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { BadRequestError } from "../../../domain/error/bad-request.error";
import { operations } from "../../../openapi-spec/types";
import { CreateTicketProperties } from "../../../shared/types";
import { createSchema } from "./schemas";
import { TicketName } from "../../../domain/value-object/ticket-name";
import { CreateTicket } from "../../use-cases/status/create-ticket";
import { SqliteTicketRepository } from "../../../infrastructure/sqlite/repository/ticket.repository";



type RequestBody = operations["createTicket"]["requestBody"]["content"]["application/json"];

export async function createAction(
  req: FastifyRequest<{ Body: RequestBody }>,
  res: FastifyReply
): Promise<void> {
  try {
    const {body} = createSchema.parse(req);

    const createProperties: CreateTicketProperties = {
      name: new TicketName(body.name),
      description: body.description,
      board_id: body.board_id.toString(),
      status_id: body.status_id.toString()
    };

    const useCase = new CreateTicket(new SqliteTicketRepository());
    const createdTicket = await useCase.onRequest(createProperties);

    return res.status(201).send(createdTicket.toView());
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .send({ error: "Invalid parameters", details: error.errors });
    } else if (error instanceof BadRequestError) {
      res.status(400).send({ error: error.message });
    } else {
      console.error(error)
      res.status(500).send({ error: "Internal server error :(" });
    }
  }
}