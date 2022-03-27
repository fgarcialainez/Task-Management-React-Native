import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {
  Button,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  Alert,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {FormControlType, FormControl} from '../components/FormControl';
import {
  deleteTodoItem,
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
  button: {
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
      setValue('completed', task.completed ? true : false);

      navigation.setOptions({title: 'Task Details'});
    } else {
      navigation.setOptions({title: 'Add Task'});
    }
  });

  const onSubmit = async (data: any) => {
    // Alert.alert('Form Submitted!', JSON.stringify(data), [{text: 'OK'}]);

    // Get db connection
    const db = await getDBConnection();

    // Get the next TODO item id
    const taskId = task ? task.id : (await getMaxTodoId(db)) + 1;

    // Create the item object
    const todoItem = {...data, id: taskId};

    // Save the items in the db
    await saveTodoItems(db, [todoItem]);

    // Close the screen
    navigation.pop();
  };

  const handleDeleteTask = () => {
    // Show confirmation dialog
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          // Get db connection
          const db = await getDBConnection();

          // Delete the items from the db
          await deleteTodoItem(db, task.id);

          // Close the screen
          navigation.pop();
        },
      },
    ]);
  };

  return (
    <View style={containerStyle}>
      <Text style={styles.inputLabel}>Name</Text>
      <FormControl
        type={FormControlType.TEXT}
        name="name"
        control={control}
        rules={{required: true}}
      />
      <Text style={styles.inputLabel}>Description</Text>
      <FormControl
        type={FormControlType.TEXT}
        name="description"
        control={control}
        rules={{required: true}}
      />
      <Text style={styles.inputLabel}>Completed</Text>
      <FormControl
        type={FormControlType.SWITCH}
        name="completed"
        control={control}
        rules={{}}
      />
      <Button title={submitButtonTitle} onPress={handleSubmit(onSubmit)} />
      {task && (
        <Button
          title={'Delete Task'}
          color="#FF0000"
          onPress={handleDeleteTask}
        />
      )}
    </View>
  );
};
