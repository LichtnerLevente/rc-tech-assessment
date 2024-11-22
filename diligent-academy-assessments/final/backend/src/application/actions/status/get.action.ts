import { FastifyReply, FastifyRequest } from "fastify";
import { GetStatusById } from "../../use-cases/status/get-status-by-id";
import { SqliteStatusRepository } from "../../../infrastructure/sqlite/repository/status.repository";
import { Status } from "../../../domain/status.entity";
import { byIdSchema } from "./schemas";



export async function getAction(
    req: FastifyRequest,
    res: FastifyReply
): Promise<void> {
    try {
        const { id } = byIdSchema.parse(req.params);

        const useCase = new GetStatusById(new SqliteStatusRepository());
        const status: Status = await useCase.onRequest(id);
        
        return res.status(200).send(status.toView());
    } catch (error) {
        return res.status(500).send(error);
    }
}