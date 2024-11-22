import { FastifyInstance } from "fastify";
import { getAllAction } from "./get-all.action";


export default async function (fastify: FastifyInstance) {
    // fastify.get("/boards/:id/statuses", );
    fastify.get("/statuses", getAllAction);
    // fastify.post("/statuses", );
    // fastify.get("/statuses/:id", );
    // fastify.patch("/statuses/:id", );
    // fastify.delete("/statuses/:id/delete", );

}


