import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Images } from '../../utils/ImageConstants'

const ImageSelection = ({ onSelectImage }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={onSelectImage}>
        <Image source={Images.nothingToShow} style={styles.image} resizeMode="contain" />
      </TouchableOpacity>
      <Text style={styles.note}>Note: Select an image for upload</Text>
    </View>
  )
}

export default ImageSelection

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // alignItems:'center'
  },
  imageContainer: {
    borderWidth: 1,
    borderStyle:'dashed',
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    overflow:'hidden',
    alignItems:'center'
  },
  image: {
    height:140,
    resizeMode:'contain'
  },
  note: {
    marginTop: 10,
    fontSize: 14,
    color: 'black',
    textAlign:'center'
  },
})
