import { FastifyInstance } from "fastify";
import { getAllAction } from "./get-all.action";
import { getAction } from "./get.action";


export default async function (fastify: FastifyInstance) {
  fastify.get("/tickets", getAllAction);
  fastify.get("/tickets/:id", getAction);
  // getByBoardId
  // getByStatusId
  // post
  // patch
  // delete
}