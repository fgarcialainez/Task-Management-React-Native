import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {getDBConnection, getTodoItems} from '../db/DbService';
import {ToDoItem} from '../models';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    justifyContent: 'center',
  },
});

export enum TaskListScreenType {
  ALL,
  TODO,
  DONE,
}

export interface TaskListScreenProps {
  type: TaskListScreenType;
}

export const TaskListScreen = (props: TaskListScreenProps) => {
  const [todoItems, setTodoItems] = useState<ToDoItem[]>([]);

  const isDarkMode = useColorScheme() === 'dark';

  const containerStype = {
    ...styles.container,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    // Load data
    loadData();
  });

  const loadData = async () => {
    const db = await getDBConnection();

    switch (props.type) {
      case TaskListScreenType.ALL:
        setTodoItems(await getTodoItems(db));
        break;
      case TaskListScreenType.TODO:
        setTodoItems(await getTodoItems(db, false));
        break;
      case TaskListScreenType.DONE:
        setTodoItems(await getTodoItems(db, true));
        break;
    }
  };

  return (
    <View style={containerStype}>
      {props.type === TaskListScreenType.ALL && (
        <Text style={styles.text}>All Tasks ({todoItems.length})</Text>
      )}
      {props.type === TaskListScreenType.TODO && (
        <Text style={styles.text}>TODO ({todoItems.length})</Text>
      )}
      {props.type === TaskListScreenType.DONE && (
        <Text style={styles.text}>Done ({todoItems.length})</Text>
      )}
    </View>
  );
};
