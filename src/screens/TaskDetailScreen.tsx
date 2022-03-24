import React from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ToDoItem} from '../models';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleText: {
    marginTop: 10,
  },
  descriptionText: {
    marginTop: 10,
  },
});

export interface TaskDetailScreenProps {
  task: ToDoItem;
}

export const TaskDetailScreen = (props: TaskDetailScreenProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const containerStyle = {
    ...styles.container,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={containerStyle}>
      <Text style={styles.titleText}>{props.task.title}</Text>
      <Text style={styles.descriptionText}>{props.task.description}</Text>
    </View>
  );
};
