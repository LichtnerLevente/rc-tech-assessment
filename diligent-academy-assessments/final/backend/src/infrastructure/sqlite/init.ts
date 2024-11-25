import { db } from "./db";

async function setup() {
  const database = await db;

  await database.exec(`
    DROP TABLE IF EXISTS statuses;
  `);

  await database.exec(`
    DROP TABLE IF EXISTS boards;
  `);

  await database.exec(`
    DROP TABLE IF EXISTS tickets;
  `);

  await database.exec(`
    DROP INDEX IF EXISTS idx_statuses_board_id;
  `);


  await database.exec(`
    CREATE TABLE IF NOT EXISTS boards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP
    );
  `);

  await database.exec(`
    CREATE TABLE IF NOT EXISTS statuses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      board_id INTEGER NOT NULL,
      position INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP,
      FOREIGN KEY (board_id) REFERENCES boards(id),
      UNIQUE (name, board_id)
    ); 
  `);  //shouldnt allow multyple non deleted statuses with the same position for within a board

  await database.exec(`
    CREATE TABLE IF NOT EXISTS tickets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      board_id INTEGER NOT NULL,
      status_id INTEGER NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP,
      FOREIGN KEY (board_id) REFERENCES boards(id),
      FOREIGN KEY (status_id) REFERENCES statuses(id)
    );
  `);

  await database.exec(`
    CREATE INDEX IF NOT EXISTS idx_statuses_board_id ON statuses(board_id);
  `);

  await database.exec(`
    INSERT INTO boards (name, description) VALUES
    ('Alpha Project', 'Description for Project Alpha'),
    ('Beta Project', 'Description for Project Beta'),
    ('Gamma Project', 'Description for Project Gamma'),
    ('Delta Project', 'Description for Project Delta');
  `);

  await database.exec(`
    INSERT INTO tickets (name, description, board_id, status_id) VALUES
    ('First task', 'Description for first task', 1, 1),
    ('Second task', 'Description for second task', 1, 1),
    ('Third task', 'Description for third task', 2, 4),
    ('Forth task', 'Description for forth task', 3, 7),
    ('Fifth task', 'Description for fifth task', 3, 7),
    ('Sixth task', 'Description for sixth task', 3, 7);
  `);

  await database.exec(`
    INSERT INTO statuses (name, board_id, position) VALUES
    ('To Do', 1, 1),
    ('In Progress', 1, 2),
    ('Done', 1, 3),
    ('To Do', 2, 1),
    ('In Progress', 2, 2),
    ('Done', 2, 3),
    ('To Do', 3, 1),
    ('In Progress', 3, 2),
    ('Done', 3, 3),
    ('To Do', 4, 1),
    ('In Progress', 4, 2),
    ('Done', 4, 3);
  `);

  await database.exec(`
    ALTER TABLE boards ADD COLUMN _key_ TEXT;
    `)
  await database.exec(`
    CREATE UNIQUE INDEX idx_boards_key ON boards(_key_);
  `)
  await database.exec(`
    UPDATE boards SET _key_ = id || name;
  `)

  console.log("Database setup complete with default boards and statuses.");
}

setup().catch((err) => {
  console.error("Error setting up the database:", err);
});
