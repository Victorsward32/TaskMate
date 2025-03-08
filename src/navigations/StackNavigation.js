import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'; // ✅ Added Missing Import
import BottomNavigation from './BottomNavigation.js';
import { colorConstant } from '../utils/TextConstants.js';
import ShowTasks from '../screens/tasksScreens/ShowTasks.js';
import AddTasks from '../screens/tasksScreens/AddTasks.js';
import EditTask from '../screens/tasksScreens/EditTask.js';
import ListEditScreen from '../screens/listScreens/ListEditScreen.js';
import ShowListScreen from '../screens/listScreens/ShowListScreen.js';
import NotesEditScreen from '../screens/notesScreens/NotesEditScreen.js';
import NotesResultScreen from '../screens/notesScreens/NotesResultScreen.js';
import ShowNotesScreen from '../screens/notesScreens/ShowNotesScreen.js';
import ListResultscreen from '../screens/listScreens/ListResultScreen.js';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      {/* ✅ StatusBar should be outside Stack.Navigator */}
      <StatusBar backgroundColor={colorConstant.BabyBlue} barStyle="light-content" />
      <Stack.Navigator  >
        <Stack.Screen 
          name="BottomTab" 
          component={BottomNavigation} 
          options={{ headerShown: false }}  
        />
        {/* Tasks Screens */}
        <Stack.Screen name='ShowResult' component={ShowTasks}  options={{ headerShown: false }}  />
        <Stack.Screen name='AddTasks' component={AddTasks}  options={{ headerShown: false }}  />
        <Stack.Screen name='EditTask' component={EditTask}  options={{ headerShown: false }}  />
       {/* List screens */}
        <Stack.Screen name='ListEditScreen' component={ListEditScreen}  options={{ headerShown: false }}  />
        <Stack.Screen name='ListResultscreen' component={ListResultscreen}  options={{ headerShown: false }}  />
        <Stack.Screen name='ShowListScreen' component={ShowListScreen}  options={{ headerShown: false }}  />
       {/* Notes Screens */}
        <Stack.Screen name='NotesEditScreen' component={NotesEditScreen}  options={{ headerShown: false }}  />
        <Stack.Screen name='NotesResultScreen' component={NotesResultScreen}  options={{ headerShown: false }}  />
        <Stack.Screen name='ShowNotesScreen' component={ShowNotesScreen}  options={{ headerShown: false }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
