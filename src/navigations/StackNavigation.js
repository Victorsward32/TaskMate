import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'; // ✅ Added Missing Import
import BottomNavigation from './BottomNavigation';
import { colorConstant } from '../utils/TextConstants';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      {/* ✅ StatusBar should be outside Stack.Navigator */}
      <StatusBar backgroundColor={colorConstant.BabyBlue} barStyle="light-content" />
      <Stack.Navigator>
        <Stack.Screen 
          name="BottomTab" 
          component={BottomNavigation} 
          options={{ headerShown: false }}  
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
