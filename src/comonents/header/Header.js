import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Icons } from "../../utils/ImageConstants";
import { colorConstant } from "../../utils/TextConstants";

const Header = ({addOnPress}) => {
  return (
    <View style={styles.mainContainer}>
      {/* Profile & Greeting */}
      <View style={styles.profileSection}>
        <Image source={Icons.user} style={styles.profileImage} />
        <Text style={styles.greetingText}>Hello, Sumit 👋</Text>
      </View>

      {/* "+" Button */}
      <TouchableOpacity style={styles.addButton} onPress={addOnPress}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  mainContainer: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  greetingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginLeft: 12,
  },
  addButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colorConstant.primary,
    justifyContent: "center",
    alignItems: "center",
   
  },
  addButtonText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
});
