import { FastifyInstance } from "fastify";
import { getAllAction } from "./get-all.action";
import { getAction } from "./get.action";


export default async function (fastify: FastifyInstance) {
    // fastify.get("/boards/:id/statuses", );
    fastify.get("/statuses", getAllAction);
    // fastify.post("/statuses", );
    fastify.get("/statuses/:id", getAction);
    // fastify.patch("/statuses/:id", );
    // fastify.delete("/statuses/:id/delete", );

}


