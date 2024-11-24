import { FastifyInstance } from "fastify";
import { getAllAction } from "./get-all.action";
import { getAction } from "./get.action";
import { createAction } from "./create.action";
import { GetByBoardIdAction } from "./get-by-board_id.action";
import { deleteAction } from "./delete.action";
import { updateAction } from "./update.action";


export default async function (fastify: FastifyInstance) {
    fastify.get("/boards/:id/statuses", GetByBoardIdAction);
    // fastify.patch("/boards/:id/statuses/positions", updatePositionsAction);
    fastify.get("/statuses", getAllAction);
    fastify.post("/statuses", createAction);
    fastify.get("/statuses/:id", getAction);
    fastify.patch("/statuses/:id", updateAction);
    fastify.delete("/statuses/:id/delete", deleteAction);

}


