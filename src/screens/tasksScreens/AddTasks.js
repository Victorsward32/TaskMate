import { 
  StyleSheet, Text, View, TextInput, Alert, ScrollView, Image, TouchableOpacity 
} from 'react-native';
import React, { useState } from 'react';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { colorConstant } from '../../utils/TextConstants';
import CustomButton from '../../comonents/button/CustomButton';
import { taskService } from '../../api/apiService';
import Toast from 'react-native-toast-message';
import LoadingScreen from '../../comonents/loading/LoadingScreen';

const AddTasks = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const openImagePicker = () => {
    Alert.alert(
      "Choose Image",
      "Select an image from gallery or capture from camera",
      [
        { text: "Gallery", onPress: () => selectImage("gallery") },
        { text: "Camera", onPress: () => selectImage("camera") },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  const selectImage = (type) => {
    let options = {
      mediaType: 'photo',
      quality: 1,
    };

    if (type === "gallery") {
      launchImageLibrary(options, responseHandler);
    } else if (type === "camera") {
      launchCamera(options, responseHandler);
    }
  };

  const responseHandler = (response) => {
    if (response.didCancel) {
      Alert.alert('Image selection canceled');
    } else if (response.errorMessage) {
      Alert.alert('Error:', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      setImage(response.assets[0].uri);
    }
  };

  const handleCreateTask = async () => {
    if (!title.trim()) {
      return Toast.show({ type: 'error', text1: 'Task Submission Failed', text2: 'Title is required!' });
    }
  
    setIsLoading(true);
  
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      
      if (image) {
        formData.append('image', {
          uri: image,
          name: image.split('/').pop(), // Extracts file name
          type: 'image/jpeg', // Adjust if necessary
        });
      }
  
      const response = await taskService.createTask(formData);
  
      if (!response || response.status !== 201) {
        throw new Error('Invalid response from server');
      }
  
      Toast.show({
        type: 'success',
        text1: 'Task Submitted',
        text2: 'Your task has been added successfully! 🎉'
      });
  
    } catch (error) {
      console.error('❌ Error while Creating Task:', error?.message || error);
      Toast.show({ type: 'error', text1: 'Submission Failed', text2: error?.message || 'Something went wrong!' });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      {/* Main UI */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTxt}>Add your Task</Text>
  
        {/* Image Picker */}
        <View style={styles.imageContainer}>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <TouchableOpacity style={styles.imagePickerButton} onPress={openImagePicker}>
            <Text style={styles.imagePickerText}>
              {image ? "Change Image" : "Select Image"}
            </Text>
          </TouchableOpacity>
        </View>
  
        {/* Input Fields */}
        <View style={styles.subContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput 
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter task title"
          />
  
          <Text style={styles.label}>Description</Text>
          <TextInput 
            style={styles.textArea}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter task description"
            multiline
          />
        </View>
      </ScrollView>
  
      {/* Submit Button */}
      <View>
        <CustomButton title={'Submit Task'} onpress={handleCreateTask} />
      </View>
  
      {/* Loading Screen Overlay */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <LoadingScreen />
        </View>
      )}
    </View>
  );
  
};

export default AddTasks;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorConstant.BabyBlue,
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  headerTxt: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  imagePickerButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  imagePickerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    height: 200,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  loadingOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  justifyContent: 'center',
  alignItems: 'center',
},

});
