import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Alert, Button, StyleSheet, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Input} from '../components/Input';
import {ToDoItem} from '../models';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
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
      setValue('title', task.title);
      setValue('description', task.description);

      navigation.setOptions({title: 'Task Details'});
    } else {
      navigation.setOptions({title: 'Add Task'});
    }
  });

  const onSubmit = (data: any) => {
    Alert.alert('Form Submitted!', JSON.stringify(data), [{text: 'OK'}]);
  };

  return (
    <View style={containerStyle}>
      <Input name="title" control={control} rules={{required: true}} />
      <Input name="description" control={control} rules={{required: true}} />
      <Button title={submitButtonTitle} onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
