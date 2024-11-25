import { StatusName } from "./value-object/status-name";


type StatusDbProperties = {
    id: number;
    name: string;
    board_id: number;
    position: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
};

type StatusProperties = {
    id: string;
    name: StatusName;
    board_id: string;
    position: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
};

type StatusViewProperties = {
    id: string;
    name: string;
    board_id: string;
    position: string;
    active: boolean;
}


export class Status {
    private constructor(private properties: StatusProperties) { }

    public get id(): string {
        return this.properties.id;
    }
    public get name(): StatusName {
        return this.properties.name;
    }
    public get board_id(): string {
        return this.properties.board_id;
    }
    public get position(): string {
        return this.properties.position;
    }
    public isActive(): boolean {
        return this.properties.deletedAt === null;
    }

    public toView(): StatusViewProperties {
        return {
            id: this.id,
            name: this.name.getValue(),
            board_id: this.board_id,
            position: this.position,
            active: this.isActive(),
        }
    }

    static fromPersistence(dbProps: StatusDbProperties): Status {
        return new Status({
            id: dbProps.id.toString(),
            name: new StatusName(dbProps.name),
            board_id: dbProps.board_id.toString(),
            position: dbProps.position.toString(),
            createdAt: dbProps.created_at,
            updatedAt: dbProps.updated_at,
            deletedAt: dbProps.deleted_at,
        });
    }

    static fromInput(status: StatusProperties): Status {
        return new Status(status);
    }

}





