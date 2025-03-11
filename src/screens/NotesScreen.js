import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../comonents/header/Header'
import SearchBar from '../comonents/search/SearchBar'
import HorizontalList from '../comonents/horizontalList/HorizontalList'
import NotesCard from '../comonents/cards/NotesCard'
import { notesData } from '../utils/StaticData'
import { useNavigation } from '@react-navigation/native'

const NotesScreen = () => {
  const navigation=useNavigation()

  const handleNavigation =()=>{
    navigation.navigate('AddNotesScreen')
    
  }
  const renderNoteItem = ({ item }) => (
    <NotesCard
      title={item.title}
      content={item.content}
      date={item.date}
      isBookmarked={item.isBookmarked}
      onBookmarkToggle={(status) => console.log(`Bookmark toggled for ${item.title}:`, status)}
    />
  )

  return (
    <View style={styles.mainContainer}>
      {/* Header & Search Bar */}
      <Header addOnPress={()=>{handleNavigation()}} />
      <SearchBar />
      <HorizontalList />

      {/* Notes List */}
      <FlatList
        data={notesData}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()} // Ensure keys are strings
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.flatListContent} // Padding & spacing
        renderItem={renderNoteItem}
        showsVerticalScrollIndicator={false} // Hide scroll bar
      />
    </View>
  )
}

export default NotesScreen

const styles = StyleSheet.create({ 
  mainContainer: {
    flex: 1,
    backgroundColor: '#d4f1f4',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  flatListContent: {
    paddingBottom: 80, // Extra space at bottom
  },
  columnWrapper: {
    justifyContent: 'space-between', // Better spacing for grid layout
    paddingHorizontal: 5, // Adjust column spacing
    marginBottom: 10,
  },
})
