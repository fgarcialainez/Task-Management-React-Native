import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {ToDoItem} from '../models';

const tableName = 'todoData';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'todo-data.db', location: 'default'});
};

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          createDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          completed BOOLEAN NOT NULL CHECK (completed IN (0, 1))
      );`;

  await db.executeSql(query);
};

export const getTodoItems = async (
  db: SQLiteDatabase,
  completed?: boolean,
): Promise<ToDoItem[]> => {
  try {
    const todoItems: ToDoItem[] = [];
    var sqlQuery = `SELECT id,title,description,createDate,completed FROM ${tableName}`;

    if (completed !== undefined) {
      sqlQuery += ` WHERE completed = ${completed ? 1 : 0}`;
    }

    const results = await db.executeSql(sqlQuery);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        todoItems.push(result.rows.item(index));
      }
    });
    return todoItems;
  } catch (error) {
    console.error(error);
    throw Error('Error retrieving TODO items');
  }
};

export const saveTodoItems = async (
  db: SQLiteDatabase,
  todoItems: ToDoItem[],
) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(id, title, description, completed) values` +
    todoItems
      .map(
        i =>
          `(${i.id}, '${i.title}', '${i.description}', '${
            i.completed ? 1 : 0
          }')`,
      )
      .join(',');

  return db.executeSql(insertQuery);
};

export const deleteTodoItem = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${tableName} where id = ${id}`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};
