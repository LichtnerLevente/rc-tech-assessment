import { FastifyReply, FastifyRequest } from "fastify";
import { GetStatuses } from "../../use-cases/status/get-statuses";
import { SqliteStatusRepository } from "../../../infrastructure/sqlite/repository/status.repository";
import { Status } from "../../../domain/status.entity";



export async function getAllAction(
    req: FastifyRequest,
    res: FastifyReply
): Promise<void> {
    try {
        const useCase = new GetStatuses(new SqliteStatusRepository());
        const statuses: Status[] = await useCase.onRequest();

        return res.status(200).send(statuses.map(status => status.toView()));
    } catch (error) {
        return res.status(500).send(error);
    }
}

