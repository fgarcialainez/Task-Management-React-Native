import React from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export enum TaskScreenType {
  ALL,
  TODO,
  DONE,
}

export interface TaskScreenProps {
  type: TaskScreenType;
}

export const TaskScreen = (props: TaskScreenProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const containerStype = {
    ...styles.container,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={containerStype}>
      {props.type === TaskScreenType.ALL && (
        <Text style={styles.text}>All Tasks</Text>
      )}
      {props.type === TaskScreenType.TODO && (
        <Text style={styles.text}>TODO</Text>
      )}
      {props.type === TaskScreenType.DONE && (
        <Text style={styles.text}>Done</Text>
      )}
    </View>
  );
};

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
