import React, { useMemo, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";


const COLORS = [
  '#FAD4D8', '#FFD700', '#FFA07A', '#98FB98', '#DDA0DD', 
  '#87CEEB', '#FFB6C1', '#FFA500', '#E6E6FA', '#B0C4DE'
];
const ToDoCard = ({ title, items, status }) => {
  const [selected, setSelected] = useState(false);

  // ✅ Assign a random color to each card (memoized for consistency)
    const randomColor = useMemo(() => COLORS[Math.floor(Math.random() * COLORS.length)], [])
  

  const handlePress = () => {
    setSelected(!selected);
    if (!selected) {
      Alert.alert("Card Selected", `You selected: ${title}`);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      {/* Left Side Indicator */}
      <View style={styles.leftSection}>
        <View style={[styles.circle, selected && styles.filledCircle]} />
        <View style={styles.line} />
      </View>

      {/* Right Side Content */}
      <View style={styles.rightSection}>
        {/* Status Text */}
        <Text style={styles.statusText}>{status}</Text>

        {/* Card Content */}
        <View style={[styles.card,{backgroundColor:randomColor}]}>
          <Text style={styles.title}>{title}</Text>
          {items.map((item, index) => (
            <Text key={index} style={styles.item}>
              • {item}
            </Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ToDoCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 10,
  },
  leftSection: {
    alignItems: "center",
    marginRight: 15,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10, 
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "transparent",
  },
  filledCircle: {
    backgroundColor: "black",
  },
  line: {
    flex:1,
    // height:100,
    width:2,
    backgroundColor: "#555",
    marginTop: 5,
  },
  rightSection: {
    flex: 1,
  },
  statusText: {
    fontSize: 12,
    color: "#777",
    backgroundColor: "#f0ebe3",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  card: {
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#A5D6FF", // Light blue background
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  item: {
    fontSize: 14,
    color: "#fff",
  },
});
