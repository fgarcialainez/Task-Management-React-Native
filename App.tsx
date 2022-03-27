/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TaskListScreen, TaskListScreenType} from './src/screens/TaskListScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {loadMockData} from './src/database/MockData';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {TaskDetailScreen} from './src/screens/TaskDetailScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

// Create the bottom tab and stack navigators
const Tab = createBottomTabNavigator();
const AllTasksStack = createStackNavigator();
const TodoTasksStack = createStackNavigator();
const DoneTasksStack = createStackNavigator();

const App = () => {
  const [mockDataLoaded, setMockDataLoaded] = useState(false);

  useEffect(() => {
    // Load mock data
    fetchData();
  }, []);

  const fetchData = async () => {
    // Load mock data
    await loadMockData();

    // Set mock data loaded flag
    setMockDataLoaded(true);
  };

  const AllTasksStackScreen = () => (
    <AllTasksStack.Navigator>
      <AllTasksStack.Screen
        name="TaskListScreen"
        children={() => <TaskListScreen type={TaskListScreenType.ALL} />}
        options={{title: 'All Tasks'}}
      />
      <AllTasksStack.Screen
        name="TaskDetailScreen"
        component={TaskDetailScreen}
        options={{title: 'Task Details', headerBackTitle: 'Back'}}
      />
    </AllTasksStack.Navigator>
  );

  const TodoTasksStackScreen = () => (
    <TodoTasksStack.Navigator>
      <TodoTasksStack.Screen
        name="TaskListScreen"
        children={() => <TaskListScreen type={TaskListScreenType.TODO} />}
        options={{title: 'TODO'}}
      />
      <TodoTasksStack.Screen
        name="TaskDetailScreen"
        component={TaskDetailScreen}
        options={{title: 'Task Details', headerBackTitle: 'Back'}}
      />
    </TodoTasksStack.Navigator>
  );

  const DoneTasksStackScreen = () => (
    <DoneTasksStack.Navigator>
      <DoneTasksStack.Screen
        name="TaskListScreen"
        children={() => <TaskListScreen type={TaskListScreenType.DONE} />}
        options={{title: 'Done'}}
      />
      <DoneTasksStack.Screen
        name="TaskDetailScreen"
        component={TaskDetailScreen}
        options={{title: 'Task Details', headerBackTitle: 'Back'}}
      />
    </DoneTasksStack.Navigator>
  );

  const DataLoadingComponent = () => (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="small" />
    </View>
  );

  const DataLoadedComponent = () => (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="All Tasks"
          component={AllTasksStackScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'All Tasks',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="format-list-bulleted"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="TODO"
          component={TodoTasksStackScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'TODO',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="calendar-clock"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Done"
          component={DoneTasksStackScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Done',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="calendar-check"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );

  return (
    <>
      {mockDataLoaded && <DataLoadedComponent />}
      {!mockDataLoaded && <DataLoadingComponent />}
    </>
  );
};

export default App;
