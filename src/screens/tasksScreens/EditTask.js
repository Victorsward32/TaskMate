import { StyleSheet, Text, View, TextInput, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colorConstant } from '../../utils/TextConstants';
import CustomButton from '../../comonents/button/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { taskService } from '../../api/apiService';
import Toast from 'react-native-toast-message';

const EditTask = () => {
  const navigation=useNavigation()
  const route = useRoute();
  const { taskData } = route.params || {};

  console.log("Data from edit task",taskData)

  // State for form fields
  const [title, setTitle] = useState(taskData?.title || '');
  const [description, setDescription] = useState(taskData?.description || '');
  const [image, setImage] = useState(taskData?.image || null);

  useEffect(() => {
    setTitle(taskData?.title || '');
    setDescription(taskData?.description || '');
    setImage(taskData?.image || null);
  }, [taskData]);

  const openImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error:', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0].uri);
      }
    });
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Title and Description cannot be empty.',
      });
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
  
      // Append image only if it is changed
      if (image && image !== taskData.image) {
        formData.append('image', {
          uri: image,
          name: 'task_image.jpg',
          type: 'image/jpeg',
        });
      }
  
      console.log('Submitting FormData:', formData);

      const response=await taskService.editTask(taskData._id,formData)
      
  
      console.log('API Response:', response.data);
  
      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Task updated successfully!',
        });

        setTimeout(() => {
          navigation.goBack()
        }, 2000);
      } else {
        throw new Error(response.data.message || 'Failed to update task.');
      }
    } catch (error) {
      console.error('Error updating task:', error);
  
      if (error.response) {
        console.log('API Error Response:', error.response.data);
      }
  
      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2: error.response?.data?.message || error.message || 'Something went wrong.',
      });
    }
  };
  
  
  

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTxt}>Edit your Task</Text>

        {/* Image Picker */}
        <View style={styles.imageContainer}>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <TouchableOpacity style={styles.imagePickerButton} onPress={openImagePicker}>
            <Text style={styles.imagePickerText}>
              {image ? 'Change Image' : 'Select Image'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Task Fields */}
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
        <CustomButton title="Submit Task" onpress={handleSubmit} />
      </View>
    </View>
  );
};

export default EditTask;

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
});
