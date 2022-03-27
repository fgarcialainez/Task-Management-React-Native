import React, {useCallback, useLayoutEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
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
import {getDBConnection, getTodoItems} from '../database/DbService';
import {ToDoItem} from '../models';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  noDataText: {
    marginTop: 100,
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
  itemSeparator: {
    backgroundColor: 'gray',
    height: 0.5,
  },
  headerButtonRight: {
    paddingRight: 10,
    paddingTop: 1,
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
  const navigation = useNavigation();

  const [todoItems, setTodoItems] = useState<ToDoItem[]>([]);

  const isDarkMode = useColorScheme() === 'dark';

  const containerStyle = {
    ...styles.container,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useFocusEffect(
    useCallback(() => {
      //View did appear load data
      loadData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialCommunityIcons
          name={'pencil-plus-outline'}
          size={22}
          style={styles.headerButtonRight}
          onPress={() =>
            navigation.navigate(
              'TaskDetailScreen' as never,
              {task: null} as never,
            )
          }
        />
      ),
    });
  }, [navigation]);

  const loadData = async () => {
    // Create the db connection
    const db = await getDBConnection();

    // Create the list of tasks
    var items = [];

    switch (props.type) {
      case TaskListScreenType.ALL:
        items = await getTodoItems(db);
        break;
      case TaskListScreenType.TODO:
        items = await getTodoItems(db, false);
        break;
      case TaskListScreenType.DONE:
        items = await getTodoItems(db, true);
        break;
    }

    // Update the state
    setTodoItems(items);
  };

  return (
    <View style={containerStyle}>
      {todoItems.length > 0 && (
        <FlatList
          data={todoItems}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  'TaskDetailScreen' as never,
                  {task: item} as never,
                )
              }>
              <View style={styles.itemRow}>
                <MaterialCommunityIcons
                  name={item.completed ? 'calendar-check' : 'calendar-clock'}
                  size={34}
                  color="black"
                />
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {todoItems.length === 0 && (
        <Text style={styles.noDataText}>There are no tasks available</Text>
      )}
    </View>
  );
};
