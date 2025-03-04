import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../comonents/header/Header';
import CalendarComponent from '../comonents/toDosComponents/CalendarComponent';
import ToDoCard from '../comonents/toDosComponents/card/ToDoCard';
import { todoData } from '../utils/StaticData';

const ListScreen = () => {

  const renderToDoItem = ({ item }) => {
    return (
      <ToDoCard
        title={item.title}
        items={item.items}
        status={item.status}
      />
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Header />
      <CalendarComponent />
      <View>
        <FlatList
          data={todoData}
          keyExtractor={(item, index) => index.toString()} // Use index if `id` is not present
          renderItem={renderToDoItem}
          showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent} // Padding & spacing
        ListFooterComponent={<View style={styles.footerSpacing}></View>}
        />
      </View>
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#d4f1f4',
    paddingHorizontal: 10,
    paddingTop: 10,
    gap: 20,
  },
  flatListContent: {
    paddingBottom: 160, // Extra space at bottom
  },
  footerSpacing: {
    height: 200, // Ensures bottom spacing for last item visibility
  },
});
