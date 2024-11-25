import { FastifyReply, FastifyRequest } from "fastify";
import { updateSchema } from "./schemas";
import { operations } from "../../../openapi-spec/types";
import { StatusName } from "../../../domain/value-object/status-name";
import { UpdateStatusPropertires } from "../../../shared/types";
import { UpdateStatus } from "../../use-cases/status/update-status";
import { SqliteStatusRepository } from "../../../infrastructure/sqlite/repository/status.repository";
import { BadRequestError } from "../../../domain/error/bad-request.error";
import { z } from "zod";
import { Status } from "../../../domain/status.entity";
import { Ticket } from "../../../domain/ticket.entity";
import { TicketName } from "../../../domain/value-object/ticket-name";
import { UpdateTicket } from "../../use-cases/status/update-ticket";
import { SqliteTicketRepository } from "../../../infrastructure/sqlite/repository/ticket.repository";


type RequestParams = operations["updateTicket"]["parameters"]["path"]["id"];
type RequestBody = operations["updateTicket"]["requestBody"]["content"]["application/json"];
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

    const updateTicket: Ticket = Ticket.fromInput({
      id: params.id,
      name: new TicketName(body.name),
      description: body.description,
      board_id: body.board_id.toString(),
      status_id: body.status_id.toString()
    })

    const useCase = new UpdateTicket(new SqliteTicketRepository());
    const updatedStatus = await useCase.onRequest(updateTicket);

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
