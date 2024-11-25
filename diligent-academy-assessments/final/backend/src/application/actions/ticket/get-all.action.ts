import { FastifyReply, FastifyRequest } from "fastify";
import { GetTickets } from "../../use-cases/ticket/get-tickets";
import { SqliteTicketRepository } from "../../../infrastructure/sqlite/repository/ticket.repository";
import { Ticket } from "../../../domain/ticket.entity";

export async function getAllAction(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const useCase = new GetTickets(new SqliteTicketRepository());
    const tickets: Ticket[] = await useCase.onRequest();
    
    return res.status(200).send(tickets.map(ticket => ticket.toView()));
  } catch (error) {
    res.status(500).send(error);
  }
}