import { TicketName } from "./value-object/ticket-name"

type TicketProperties = {
  id: string;
  name: TicketName;
  description?: string;
  board_id: string;
  status_id: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

type TicketDbProperties = {
  id: string;
  name: string;
  description?: string;
  board_id: number;
  status_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

type TicketViewProperties = {
  id: string;
  name: string;
  description?: string;
  board_id: string;
  status_id: string;
  active: boolean;
}


export class Ticket {
  private constructor(private properties: TicketProperties) {}

  
  public get id() : string {
    return this.properties.id
  }
  
  public get name() : TicketName {
    return this.properties.name;
  }

  
  public get description() : string | undefined {
    return this.properties.description;
  }
  
  public get board_id() : string {
    return this.properties.board_id;
  }
  
  
  public get status_id() : string {
    return this.properties.status_id;
  }
  
  public isActive(): boolean {
    return this.properties.deleted_at === null;
  }
  
  public toView(): TicketViewProperties {
    return {
      id: this.id,
      name: this.name.getValue(),
      description: this.description,
      board_id: this.board_id,
      status_id: this.status_id,
      active: this.isActive(),
    }
  }

  static fromPersistence(dbProps: TicketDbProperties): Ticket {
    return new Ticket({
      id: dbProps.id,
      name: new TicketName(dbProps.name),
      description: dbProps.description,
      board_id: dbProps.board_id.toString(),
      status_id: dbProps.status_id.toString(),
      created_at: dbProps.created_at,
      updated_at: dbProps.updated_at,
      deleted_at: dbProps.deleted_at,
    });
  }

  static fromInput(ticket: TicketProperties): Ticket {
    return new Ticket(ticket);
  }
}