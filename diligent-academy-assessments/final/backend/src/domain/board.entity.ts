import { BoardKey } from "./value-object/board-key";
import { BoardName } from "./value-object/board-name";

type BoardDbProperties = {
  id: number;
  name: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  _key_: string;
};

type BoardProperties = {
  id: string;
  name: BoardName;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  _key_: BoardKey;
};

type ViewProperties = {
  id: string;
  name: string;
  description: string | undefined;
  active: boolean;
  _key_: string;
};

export class Board {
  private constructor(private properties: BoardProperties) {}

  public get id(): string {
    return this.properties.id;
  }

  public get name(): BoardName {
    return this.properties.name;
  }

  public get description(): string | undefined {
    return this.properties.description;
  }
  
  public get key() : BoardKey{
    return this.properties._key_;
  }
  

  public isActive(): boolean {
    return this.properties.deletedAt === null;
  }

  public toView(): ViewProperties {
    return {
      id: this.id,
      name: this.name.getValue(),
      description: this.description,
      active: this.isActive(),
      _key_: this.key.getValue()
    };
  }

  static fromPersistence(dbProps: BoardDbProperties): Board {
    return new Board({
      id: dbProps.id.toString(),
      name: new BoardName(dbProps.name),
      description: dbProps.description,
      createdAt: dbProps.created_at,
      updatedAt: dbProps.updated_at,
      deletedAt: dbProps.deleted_at,
      _key_: new BoardKey(dbProps._key_),
    });
  }

  static fromInput(board: BoardProperties): Board {
    return new Board(board);
  }
}
