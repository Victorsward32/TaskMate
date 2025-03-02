import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../comonents/header/Header'
import SearchBar from '../comonents/search/SearchBar'
import HorizontalList from '../comonents/horizontalList/HorizontalList'
import TaskCard from '../comonents/cards/TaskCard'
import { TASKS } from '../utils/StaticData'

const TaskScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <Header />
      <SearchBar />
      <HorizontalList />
      <FlatList
        data={TASKS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskCard 
            title={item.title} 
            description={item.description} 
            status={item.status} 
          />
        )}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default TaskScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#d4f1f4',
    paddingHorizontal: 10,
    gap: 20,
  },
  flatListContent: {
    flexGrow: 1,
    paddingBottom: 80, // Extra space at bottom
  },
})