import { Image, StyleSheet, Text, View, ScrollView, Modal, TouchableOpacity } from 'react-native'
import React, { useState, useMemo } from 'react'
import { colorConstant } from '../../utils/TextConstants'
import { Images } from '../../utils/ImageConstants'
import { useNavigation, useRoute } from '@react-navigation/native'
import FloatingActionButton from '../../comonents/floatingActionButton/FloatingActionButton '

const ShowTasks = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { taskData } = route.params || {}
  const [modalVisible, setModalVisible] = useState(false)

  const handleEditNavigation = () => navigation.navigate('EditTask', { taskData:taskData })
  const handleImagePress = () => taskData?.image?.trim() && setModalVisible(true)

  const imageSource = useMemo(() => 
    taskData?.image?.trim() ? { uri: taskData.image } : Images.nothingToShow,
    [taskData?.image]
  )

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <TouchableOpacity onPress={handleImagePress} activeOpacity={0.8}>
          <View style={styles.imageContainer}>
            <Image source={imageSource} style={styles.image} />
          </View>
        </TouchableOpacity>

        <Text style={styles.titleTxt}>{taskData?.title}</Text>
        <Text style={styles.descriptionTxt}>{taskData?.description}</Text>
      </ScrollView>

      <FloatingActionButton
        editOnpress={handleEditNavigation}
        deleteOnpress={() => {}}
        attachmentOnpress={handleEditNavigation}
      />

      <Modal visible={modalVisible} transparent>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>close</Text>
          </TouchableOpacity>
          <Image source={imageSource} style={styles.fullImage} />
        </View>
      </Modal>
    </View>
  )
}

export default ShowTasks

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorConstant.BabyBlue,
    paddingHorizontal: 10,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 20,
    overflow: 'hidden',
    backgroundColor: colorConstant.primary,
    padding: 5,
  },
  image: {
    width: '100%',
    height: 220,
    maxHeight: 300,
    resizeMode: 'cover',
    borderRadius: 15,
    aspectRatio: 16 / 9,
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
    lineHeight: 26,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '10%',
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  fullImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
  },
})
