import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { Icons } from '../../utils/ImageConstants';

// 🎨 Define 10 Random Background Colors
const COLORS = [
  '#A8DADC', // Soft teal
  '#F4A261', // Warm orange
  '#E76F51', // Muted red-orange
  '#8ECAE6', // Soft blue
  '#FFB4A2', // Peach
  '#A2D2FF', // Sky blue
  '#BDE0FE', // Soft pastel blue
  '#CDB4DB', // Muted lavender
  '#FFAFCC', // Light pink
  '#D4A373', // Warm beige
];

const TaskCard = ({ 
  title, 
  description, 
  status, 
  date = "12 Sep, 2024", 
  time = "05:20 PM" 
}) => {
  // ✅ Assign a random background color (memoized for consistency)
  const randomColor = useMemo(() => COLORS[Math.floor(Math.random() * COLORS.length)], []);

  return (
    <View style={[styles.cardContainer, styles.shadow, { backgroundColor: randomColor }]}>
      
      {/* 🔹 Header Section */}
      <View style={styles.header}>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.dateText}>{date}</Text>
          <Text style={styles.timeText}>{time}</Text>
        </View>

        {/* ✅ Status Icon */}
        <View style={styles.iconContainer}>
          <Image source={Icons.check} style={styles.iconImg} />
        </View>
      </View>

      {/* 🔹 Title & Description */}
      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{title}</Text>
      <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">{description}</Text>

      {/* 🔹 Status Indicator */}
      <View style={[styles.statusBadge, styles[status]]}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
      
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  cardContainer: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 6, // Improved Android shadow
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dateText: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  timeText: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  iconContainer: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  iconImg: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#f0f0f0',
    lineHeight: 18,
    marginBottom: 12,
  },
  statusBadge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: 'white',
  },

  // 🎨 Dynamic Status Colors
  completed: { backgroundColor: '#4CAF50' }, // Green
  inProgress: { backgroundColor: '#FFC107' }, // Yellow
  pending: { backgroundColor: '#FF9800' }, // Orange
  onHold: { backgroundColor: '#FF5722' }, // Red
});
