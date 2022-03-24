import React, {useEffect} from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ToDoItem} from '../models';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
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

//@ts-ignore
export const TaskDetailScreen = ({route}) => {
  const {task} = route.params;

  const isDarkMode = useColorScheme() === 'dark';

  const containerStyle = {
    ...styles.container,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    console.log(task);
  });

  return (
    <View style={containerStyle}>
      <Text style={styles.titleText}>{task.title}</Text>
      <Text style={styles.descriptionText}>{task.description}</Text>
    </View>
  );
};
