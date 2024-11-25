import { FastifyInstance } from "fastify";
import { getAllAction } from "./get-all.action";
import { getAction } from "./get.action";
import { getByBoardIdAction } from "./get-by-board_id.action";
import { createAction } from "./create.action";
import { updateAction } from "./update.action";


export default async function (fastify: FastifyInstance) {
  fastify.get("/tickets", getAllAction);
  fastify.post("/tickets", createAction);
  fastify.get("/tickets/:id", getAction);
  fastify.patch("/tickets/:id", updateAction);
  fastify.get("/boards/:id/tickets", getByBoardIdAction);
  fastify.get("/statuses/:id/tickets", getByBoardIdAction);
}