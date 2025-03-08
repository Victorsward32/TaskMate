import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { colorConstant } from '../../utils/TextConstants';
import CustomButton from '../../comonents/button/CustomButton';
import ImageSelection from '../../comonents/imageSelection/ImageSelection';

const AddTasks = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    Alert.alert('submit btn click')
    console.log('Title:', title);
    console.log('Description:', description);
    // Handle submission logic here
  };

  return (
    <View style={styles.container}>
    <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>

      <Text style={styles.headerTxt}>Add your Task</Text>
      <View>
        <ImageSelection  onSelectImage={()=>{Alert.alert('Select Image click')}} />
      </View>
      
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
      <View>
        <CustomButton title={'Submit Task'} onpress={()=>{handleSubmit()}}/>
      </View>
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
  subContainer: {
    flex:1,
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
    // height:40
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
 
});
