/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TaskListScreen, TaskListScreenType} from './src/screens/TaskListScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Create the bottom tab navigator
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="All"
          children={() => <TaskListScreen type={TaskListScreenType.ALL} />}
          options={{
            tabBarLabel: 'All Tasks',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="format-list-bulleted"
                color={color}
                size={size}
              />
            ),
            tabBarBadge: 2,
          }}
        />
        <Tab.Screen
          name="TODO"
          children={() => <TaskListScreen type={TaskListScreenType.TODO} />}
          options={{
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
          children={() => <TaskListScreen type={TaskListScreenType.DONE} />}
          options={{
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
};

export default App;
