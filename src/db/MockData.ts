import {
  getDBConnection,
  createTable,
  getTodoItems,
  saveTodoItems,
} from './DbService';

export const loadMockData = async () => {
  try {
    const db = await getDBConnection();
    await createTable(db);
    const storedTodoItems = await getTodoItems(db);

    if (!storedTodoItems.length) {
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
        {
          id: 3,
          title: 'Daily programming',
          description: 'Description 3',
          completed: true,
        },
      ];
      await saveTodoItems(db, initTodos);
    }
  } catch (error) {
    console.error(error);
  }

  return [];
};
