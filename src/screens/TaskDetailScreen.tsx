import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Button, StyleSheet, useColorScheme, View, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Input} from '../components/Input';
import {
  getDBConnection,
  getMaxTodoId,
  saveTodoItems,
} from '../database/DbService';
import {ToDoItem} from '../models';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 15,
  },
  inputLabel: {
    paddingHorizontal: 10,
    marginTop: 5,
  },
});

export interface TaskDetailScreenProps {
  task: ToDoItem;
}

//@ts-ignore
export const TaskDetailScreen = ({navigation, route}) => {
  const {task} = route.params;
  const {control, handleSubmit, setValue} = useForm();

  const isDarkMode = useColorScheme() === 'dark';
  const submitButtonTitle = task ? 'Update Task' : 'Create Task';

  const containerStyle = {
    ...styles.container,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    if (task) {
      setValue('name', task.name);
      setValue('description', task.description);

      navigation.setOptions({title: 'Task Details'});
    } else {
      navigation.setOptions({title: 'Add Task'});
    }
  });

  const onSubmit = async (data: any) => {
    // Alert.alert('Form Submitted!', JSON.stringify(data), [{text: 'OK'}]);

    // Save in the db
    const db = await getDBConnection();

    // Get the next TODO item id
    const taskId = task ? task.id : (await getMaxTodoId(db)) + 1;

    // Create the item object
    const todoItem = {...data, id: taskId, completed: false};

    // Save the items in the db
    await saveTodoItems(db, [todoItem]);

    // Close the details screen
    navigation.pop();
  };

  return (
    <View style={containerStyle}>
      <Text style={styles.inputLabel}>Name</Text>
      <Input name="name" control={control} rules={{required: true}} />
      <Text style={styles.inputLabel}>Description</Text>
      <Input name="description" control={control} rules={{required: true}} />
      <Button title={submitButtonTitle} onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
