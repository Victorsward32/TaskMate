import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../comonents/header/Header'
import CalendarComponent from '../comonents/toDosComponents/CalendarComponent'
import ToDoCard from '../comonents/toDosComponents/card/ToDoCard'

const ListScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <Header/>
      <CalendarComponent/>
      <ToDoCard
        title="Go for groceries"
        items={["Cauli flower", "Potato", "Lady finger"]}
        status="In process"
      />
       <ToDoCard
        title="Go for groceries"
        items={["Cauli flower", "Potato", "Lady finger"]}
        status="In process"
      />
       <ToDoCard
        title="Go for groceries"
        items={["Cauli flower", "Potato", "Lady finger"]}
        status="In process"
      />
       <ToDoCard
        title="Go for groceries"
        items={["Cauli flower", "Potato", "Lady finger"]}
        status="In process"
      />
    </View>
  )
}

export default ListScreen

const styles = StyleSheet.create({
  mainContainer:{
    flex: 1,
    backgroundColor: '#d4f1f4',
    paddingHorizontal: 10,
    paddingTop: 10,
    gap:20,
  },
  
})