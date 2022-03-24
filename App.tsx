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
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TaskListScreen, TaskListScreenType} from './src/screens/TaskListScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {loadMockData} from './src/db/MockData';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

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

// Create the bottom tab navigator
const Tab = createBottomTabNavigator();

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

  const DataLoadingComponent = () => (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="small" />
    </View>
  );

  const DataLoadedComponent = () => (
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

  return (
    <>
      {mockDataLoaded && <DataLoadedComponent />}
      {!mockDataLoaded && <DataLoadingComponent />}
    </>
  );
};

export default App;
