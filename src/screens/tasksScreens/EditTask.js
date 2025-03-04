import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { colorConstant } from '../../utils/TextConstants';

const EditTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    console.log('Title:', title);
    console.log('Description:', description);
    // Handle submission logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTxt}>Edit your Task</Text>
      
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

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
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
    height: 300,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  button: {
    backgroundColor: colorConstant.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom:20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
