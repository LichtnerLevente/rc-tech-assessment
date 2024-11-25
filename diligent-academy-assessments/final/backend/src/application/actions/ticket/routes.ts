import { FastifyInstance } from "fastify";
import { getAllAction } from "./get-all.action";
import { getAction } from "./get.action";
import { getByBoardIdAction } from "./get-by-board_id.action";


export default async function (fastify: FastifyInstance) {
  fastify.get("/tickets", getAllAction);
  fastify.get("/tickets/:id", getAction);
  fastify.get("/boards/:id/tickets", getByBoardIdAction);
  fastify.get("/statuses/:id/tickets", getByBoardIdAction);
  // getByBoardId
  // getByStatusId
  // post
  // patch
  // delete
}