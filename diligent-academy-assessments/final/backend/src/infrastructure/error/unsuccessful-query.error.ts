import { InfrastructureError } from "./infrastructure.error";


export class UnsuccessfulQuerry extends InfrastructureError {
  constructor(message: string) {
    super(message);
  }
}



