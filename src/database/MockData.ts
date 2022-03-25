import {
  getDBConnection,
  createTable,
  saveTodoItems,
  deleteTable,
} from './DbService';

export const loadMockData = async () => {
  try {
    const db = await getDBConnection();

    // Delete the previous table
    await deleteTable(db);

    // Create a new table
    await createTable(db);

    // Store an initial set of items
    const initTodos = [
      {
        id: 0,
        name: 'Go to shop',
        description: 'Description 0',
        completed: false,
      },
      {
        id: 1,
        name: 'Eat healthy food',
        description: 'Description 1',
        completed: false,
      },
      {
        id: 2,
        name: 'Do some exercise',
        description: 'Description 2',
        completed: false,
      },
      {
        id: 3,
        name: 'Daily programming',
        description: 'Description 3',
        completed: true,
      },
    ];
    await saveTodoItems(db, initTodos);
  } catch (error) {
    console.error(error);
  }

  return [];
};
