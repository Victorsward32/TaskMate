import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
// import BottomNavigation from './BottomNavigation.js';
import BottomNavigation from './BottomNavigation';
import { useAuth } from '../context/AuthContext.js';
import LoadingScreen from '../comonents/loading/LoadingScreen.js';
import { colorConstant } from '../utils/TextConstants.js';
import ShowNotesScreen from '../screens/notesScreens/ShowNotesScreen.js';
import AddNotesScreen from '../screens/notesScreens/AddNotesScreen.js';
import NotesEditScreen from '../screens/notesScreens/NotesEditScreen.js';
import ShowListScreen from '../screens/listScreens/ShowListScreen.js';
import AddListScreen from '../screens/listScreens/AddListScreen.js';
import ListEditScreen from '../screens/listScreens/ListEditScreen.js';
import EditTask from '../screens/tasksScreens/EditTask.js';
import AddTasks from '../screens/tasksScreens/AddTasks.js';
import ShowTasks from '../screens/tasksScreens/ShowTasks.js';
import UserProfileScreen from '../screens/userProfile/UserProfileScreen.js';
import RegistrationScreen from '../screens/authentication/RegistrationScreen.js';
import LoginScreen from '../screens/authentication/LoginScreen.js';

const Stack = createNativeStackNavigator();

// Auth Stack - for screens when user is not logged in
const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen 
        name="LoginScreen" 
        component={LoginScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="RegistrationScreen" 
        component={RegistrationScreen} 
        options={{ headerShown: false }} 
      />
      {/* <Stack.Screen 
        name="ForgotPasswordScreen" 
        component={ForgotPasswordScreen} 
        options={{ headerShown: false }} 
      /> */}
      <Stack.Screen 
        name="BottomTabs" 
        component={BottomNavigation} 
        options={{ headerShown: false }}  
      />
    </Stack.Navigator>
  );
};

// App Stack - for screens when user is logged in
const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="BottomTabs">
      <Stack.Screen 
        name="BottomTabs" 
        component={BottomNavigation} 
        options={{ headerShown: false }}  
      />
      {/* userProfile */}
      <Stack.Screen 
        name='UserProfile' 
        component={UserProfileScreen} 
        options={{headerShown:false}}
      />
      {/* Tasks Screens */}
      <Stack.Screen 
        name='ShowResult' 
        component={ShowTasks}  
        options={{ headerShown: false }}  
      />
      <Stack.Screen 
        name='AddTasks' 
        component={AddTasks}  
        options={{ headerShown: false }}  
      />
      <Stack.Screen 
        name='EditTask' 
        component={EditTask}  
        options={{ headerShown: false }}  
      />
      {/* List screens */}
      <Stack.Screen 
        name='ListEditScreen' 
        component={ListEditScreen}  
        options={{ headerShown: false }}  
      />
      <Stack.Screen 
        name='AddListScreen' 
        component={AddListScreen}  
        options={{ headerShown: false }}  
      />
      <Stack.Screen 
        name='ShowListScreen' 
        component={ShowListScreen}  
        options={{ headerShown: false }}  
      />
      {/* Notes Screens */}
      <Stack.Screen 
        name='NotesEditScreen' 
        component={NotesEditScreen}  
        options={{ headerShown: false }}  
      />
      <Stack.Screen 
        name='AddNotesScreen' 
        component={AddNotesScreen}  
        options={{ headerShown: false }}  
      />
      <Stack.Screen 
        name='ShowNotesScreen' 
        component={ShowNotesScreen}  
        options={{ headerShown: false }}  
      />
    </Stack.Navigator>
  );
};

// Main Navigation with authentication flow
const StackNavigation = () => {
  const { isLoading, isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <StatusBar 
        backgroundColor={colorConstant.BabyBlue} 
        barStyle="light-content" 
      />
      
      {isLoading ? (
        // Show loading screen while checking authentication
        <LoadingScreen/>
      ) : (
        // Show either Auth Stack or App Stack based on authentication status
        isAuthenticated ? <AppStack /> : <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});