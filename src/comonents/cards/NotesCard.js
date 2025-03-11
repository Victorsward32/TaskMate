import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useCallback, useMemo } from 'react'
import { Icons } from '../../utils/ImageConstants'
import { colorConstant } from '../../utils/TextConstants'
import { useNavigation } from '@react-navigation/native';

const COLORS = [
  '#FAD4D8', '#FFD700', '#FFA07A', '#98FB98', '#DDA0DD', 
  '#87CEEB', '#FFB6C1', '#FFA500', '#E6E6FA', '#B0C4DE'
];

const NotesCard = ({ 
  title, 
  content, 
  date, 
  isBookmarked = false, 
  onBookmarkToggle ,
  // navigation
}) => {
  const [selected, setSelected] = useState(isBookmarked);
  const navigation=useNavigation()

  // ✅ Assign a random color to each card (memoized for consistency)
  const randomColor = useMemo(() => COLORS[Math.floor(Math.random() * COLORS.length)], [])

  const handleBookmarkToggle = useCallback(() => {
    const newStatus = !selected
    onBookmarkToggle && onBookmarkToggle(newStatus)
    Alert.alert("Bookmark", newStatus ? "Added to bookmarks" : "Removed from bookmarks");
    setSelected(newStatus)

  }, [selected, onBookmarkToggle])

  const handleNavigation = ()=>{
    navigation.navigate('ShowNotesScreen')
  }
  return (
    <TouchableOpacity onPress={handleNavigation} delayLongPress={500} onLongPress={handleBookmarkToggle} style={[styles.mainContainer, styles.shadow, { backgroundColor: randomColor }]}>
      
      {/* Title and Bookmark */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleTxt} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>
        <View style={styles.bookmarkContainer} >
          <Image 
            source={Icons.bookMarked} 
            style={[styles.img, { tintColor: selected ? 'white' : colorConstant.primary }]} 
          />
        </View>
      </View>

      {/* Note Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.contentText} numberOfLines={4} ellipsizeMode="tail">
          {content}
        </Text>
      </View>

      {/* Date Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>📅 {date}</Text>
      </View>
      
    </TouchableOpacity>
  )
}

export default NotesCard

const styles = StyleSheet.create({ 
  mainContainer: {
    width: '48%',  
    padding: 12,
    borderRadius: 10,  
    marginVertical: 5, 
    marginHorizontal: 5,
    minHeight: 160,  
    justifyContent: 'space-between',  
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4, 
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleTxt: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,  
    color: '#333',
  },
  bookmarkContainer: {
    padding: 5,
  },
  img: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
  },
  infoContainer: {
    alignSelf: 'flex-end',
    marginTop: 8,
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  infoText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#555',
  },
  contentContainer: {
    flex: 1,  
    justifyContent: 'center',
    marginTop: 8,
  },
  contentText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 18,
  },
})
