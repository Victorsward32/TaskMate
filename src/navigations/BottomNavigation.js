import { Image, StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TaskScreen from '../screens/TaskScreen'
import NotesScreen from '../screens/NotesScreen'
import ListScreen from '../screens/ListScreen'
import { Icons } from '../utils/ImageConstants'

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Tasks') {
            iconName = Icons.tasks;
          } else if (route.name === 'Notes') {
            iconName = Icons.notes;
          } else if (route.name === 'List') {
            iconName = Icons.list;
          }

          return (
            <View style={styles.iconContainer}>
              <Image 
                source={iconName} 
                style={[
                  styles.icons, 
                  { tintColor: color },
                  focused && styles.activeIcon
                ]} 
              />
              {focused && <View style={styles.indicator} />}
            </View>
          );
        },
        tabBarLabel: ({ focused, color }) => (
          <Text style={[
            styles.tabLabel,
            { color },
            focused && styles.activeLabel
          ]}>
            {route.name}
          </Text>
        ),
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: '#75e6da', // Active icon color
        tabBarInactiveTintColor: '#d1d1d1', // Inactive icon color - slightly darker for better contrast
        headerShown: false,
        tabBarItemStyle: styles.tabBarItemStyle,
      })}
    >
      <Tab.Screen name='Tasks' component={TaskScreen} />
      <Tab.Screen name='Notes' component={NotesScreen} />
      <Tab.Screen name='List' component={ListScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#05445e',
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    borderRadius: 25,
    height: 65,
    paddingBottom: 5,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 15,
    elevation: 10, // For Android shadow
    borderTopWidth: 0, // Remove default border
    marginHorizontal:24,
    // alignSelf:'center'
    justifyContent:"center"
  },
  tabBarItemStyle: {
    height: 50,
    paddingBottom: 5,
  },
  icons: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
  },
  activeIcon: {
    transform: [{ scale: 1.1 }], // Slightly larger when active
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    height: 3,
    width: 15,
    backgroundColor: '#75e6da',
    borderRadius: 10,
    marginTop: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: -2,
    marginBottom: 5,
  },
  activeLabel: {
    fontWeight: '700',
  }
});