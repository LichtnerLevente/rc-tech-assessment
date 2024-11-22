import { StatusRepository } from "../../../domain/repository/status.repository";
import { Status } from "../../../domain/status.entity";
import { CreateStatusProperties } from "../../../shared/types";
import { NoRecordCreated } from "../../error/no-record-created.error";
import { NoRecordFound } from "../../error/no-record-found";
import { NoRecordUpdated } from "../../error/no-record-updated.error";
import { RecordNameInvalid } from "../../error/record-name-invalid.error";
import { db } from "../db";



export class SqliteStatusRepository implements StatusRepository {
    async findAllActive(): Promise<Status[]> {
        const database = await db;
        const statuses = await database.all(
            "SELECT * FROM statuses WHERE statuses.deleted_at IS NULL"
        );

        return statuses.map(Status.fromPersistence);
    }

    async findByBoardId(board_id: string): Promise<Status[]> {

        const database = await db;
        const statuses = await database.all(
            "SELECT * FROM statuses WHERE statuses.board_id = ?  AND statuses.deleted_at IS NULL", [board_id]);

        if(statuses.length === 0){
            throw new NoRecordFound(board_id)
        }
        // todo: error check for no results (wrong board id vs no status for a board)

        return statuses.map(Status.fromPersistence);
    }

    async getById(id: string): Promise<Status> {
        const database = await db;
        const status = await database.get("SELECT * FROM statuses WHERE id = ?", [id]);

        if (!status) {
            throw new NoRecordFound(id);
        }

        return Status.fromPersistence(status)
    }

    async create(properties: CreateStatusProperties): Promise<Status> {
        const database = await db;
        try {
            const created = await database.get(
                "Insert Into statuses (name, board_id, position) VALUES (?, ?, ?) RETURNING *",
                [properties.name.getValue(), Number(properties.board_id), Number(properties.position)]
            );

            if (created.changes === 0) {
                throw new NoRecordCreated();
            }

            return Status.fromPersistence(created);
        } catch (error) {
            if ((error as { code: string })?.code === "SQLITE_CONSTRAINT") {
                throw new RecordNameInvalid(properties.name.getValue());
            }

            throw error;
        }
    }

    async update(status: Status): Promise<Status> {
        const database = await db;

        try {
          const updated = await database.get(
            "UPDATE statuses SET name = ?, board_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? RETURNING *",
            [status.name.getValue(), status.board_id, status.id]
          );
    
          if (updated.changes === 0) {
            throw new NoRecordUpdated(status.id);
          }
    
          return Status.fromPersistence(updated);
        } catch (error) {
          if ((error as { code: string })?.code === "SQLITE_CONSTRAINT") {
            throw new RecordNameInvalid(status.name.getValue());
          }
    
          throw error;
        }
    }

    // TODO: update position

    async delete(id: string): Promise<void> {
        const database = await db;
        const deleted = await database.run(
            "UPDATE statuses SET deleted_at = CURRENT_TIMESTAMP WHERE id  = ? AND deleted_at IS NULL",
            [id]
        );

        if (deleted.changes === 0) {
            throw new NoRecordUpdated(id);
        }
    }
}
