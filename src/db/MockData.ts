import {
  getDBConnection,
  createTable,
  getTodoItems,
  saveTodoItems,
} from './DbService';
import {ToDoItem} from '../models';

export const loadMockData = async (): Promise<ToDoItem[]> => {
  try {
    const initTodos = [
      {
        id: 0,
        title: 'Go to shop',
        description: 'Description 0',
        completed: false,
      },
      {
        id: 1,
        title: 'Eat healthy food',
        description: 'Description 1',
        completed: false,
      },
      {
        id: 2,
        title: 'Do some exercise',
        description: 'Description 2',
        completed: false,
      },
    ];

    const db = await getDBConnection();
    await createTable(db);
    const storedTodoItems = await getTodoItems(db);

    if (storedTodoItems.length) {
      return storedTodoItems;
    } else {
      await saveTodoItems(db, initTodos);
      return initTodos;
    }
  } catch (error) {
    console.error(error);
  }

  return [];
};
