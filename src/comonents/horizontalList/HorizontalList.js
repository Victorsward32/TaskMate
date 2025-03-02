import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo, useState } from 'react';

// Label Component (Memoized to Prevent Unnecessary Re-renders)
const Label = memo(({ name, count,onPress,isSelected }) => (
  <TouchableOpacity activeOpacity={0.7} 
   style={[styles.labelContainer,isSelected && styles.selectedLabel ]}
   onPress={onPress}
   >
    <Text style={[styles.labelText,isSelected && styles.selectedTxt ]}>{name} ({count})</Text>
  </TouchableOpacity>
));

// Main Component
const HorizontalList = () => {
    const [selectedKey, setSelectedKey] = useState("all"); // Track selected label

  // Static Labels Data
  const labels = {
    all: { items: 'All', count: 0 },
    inProgress: { items: 'In Progress', count: 0 },
    onHold: { items: 'On Hold', count: 0 },
    completed: { items: 'Completed', count: 0 }
  };

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>

        <FlatList
         horizontal
        data={Object.entries(labels)}
        keyExtractor={([key])=>key}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const [key, label] = item; // Destructure key and value
          return <Label key={key} 
          name={label.items} 
          count={label.count} 
          isSelected={selectedKey === key}
          onPress={() => setSelectedKey(key)} 
           />;
        }}
        contentContainerStyle={styles.listContainer} // Adds spacing
        />
      </View>
    </View>
  );
};

export default HorizontalList;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContainer: {
    flexDirection: 'row',
    gap: 10, // Ensures spacing between labels
  },
  labelContainer: {
    backgroundColor: '#75e6da',
    padding: 10,
    borderRadius: 8,
  },
  selectedLabel:{
    backgroundColor:"#05445e"
  },
  labelText: {
    color:'black',
    fontSize: 14,
    fontWeight:'500',
    lineHeight:18,
  },
  selectedTxt:{
    color:'white',
    fontWeight:'500',
    lineHeight:18,
  }
});
