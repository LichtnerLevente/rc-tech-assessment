import { BadRequestError } from "../../../domain/error/bad-request.error";
import { StatusRepository } from "../../../domain/repository/status.repository";
import { Status } from "../../../domain/status.entity";
import { NoRecordCreated } from "../../../infrastructure/error/no-record-created.error";
import { RecordNameInvalid } from "../../../infrastructure/error/record-name-invalid.error";
import { CreateStatusProperties } from "../../../shared/types";


export class CreatStatus {
  constructor(private readonly repo: StatusRepository) { }

  async onRequest(properties: CreateStatusProperties): Promise<Status> {
    try {
      return await this.repo.create(properties);
    } catch (error) {
      if (error instanceof RecordNameInvalid) {
        throw new BadRequestError(
          properties.name.getValue(),
          "Record name invalid"
        );
      } else if (error instanceof NoRecordCreated) {
        throw new BadRequestError(
          properties.name.getValue(),
          "No record created"
        );
      }
      throw error;
    }
  }
}

