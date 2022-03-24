import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
  itemRow: {
    flex: 1,
    height: 55,
    padding: 10,
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    padding: 11,
    fontSize: 18,
    height: 44,
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

  const containerStyle = {
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
    <View style={containerStyle}>
      {todoItems.length > 0 && (
        <FlatList
          data={todoItems}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => console.log(`Clicked ${item.id}`)}>
              <View style={styles.itemRow}>
                <MaterialCommunityIcons
                  name={item.completed ? 'calendar-check' : 'calendar-clock'}
                  size={34}
                  color="black"
                />
                <Text style={styles.itemText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {todoItems.length === 0 && (
        <Text style={styles.text}>There are no tasks available</Text>
      )}
    </View>
  );
};
