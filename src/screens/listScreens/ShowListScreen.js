
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { colorConstant } from '../../utils/TextConstants'
import { Icons, Images } from '../../utils/ImageConstants'
import { useNavigation } from '@react-navigation/native'
import FloatingActionButton from '../../comonents/floatingActionButton.js/FloatingActionButton '

const ShowListScreen = () => {
  const navigation = useNavigation()

  const handleEditNavigation = () => {
    navigation.navigate('ListEditScreen')
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image source={Images.nothingToShow} style={styles.image} />
        </View>
        <Text style={styles.titleTxt}>Meeting with manager at park</Text>
        <Text style={styles.descriptionTxt}>
          This meeting shouldn’t be missed at any cost. It’s really an important meeting with this manager.
        </Text>
      </ScrollView>

      {/* Floating Action Button stays fixed at the bottom */}
      <FloatingActionButton
        editOnpress={()=>{handleEditNavigation()}}
        deleteOnpress={()=>{}}
        attachmentOnpress={() => {handleEditNavigation()}}
      />
    </View>
  )
}

export default ShowListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorConstant.BabyBlue,
    paddingHorizontal: 10,
  },
  scrollContainer: {
    paddingBottom: 100, // Increased to prevent button overlap
  },
  imageContainer: {
    borderWidth: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 20,
    overflow: 'hidden',
    backgroundColor: colorConstant.primary,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  titleTxt: {
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 36,
    color: 'black',
    textAlign: 'left',
    marginTop: 15,
    paddingHorizontal: 5,
    textTransform: 'capitalize',
  },
  descriptionTxt: {
    fontSize: 18,
    color: 'black',
    marginTop: 8,
    paddingHorizontal: 5,
    textAlign: 'justify',
    lineHeight: 26, // Improved readability
  },
})
