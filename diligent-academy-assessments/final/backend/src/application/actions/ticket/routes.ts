import { FastifyInstance } from "fastify";
import { getAllAction } from "./get-all.action";


export default async function (fastify: FastifyInstance) {
  fastify.get("/tickets", getAllAction);
  // getbyId
  // getByBoardId
  // getByStatusId
  // post
  // patch
  // delete
}