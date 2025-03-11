import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet,
  Keyboard,
  Platform,
  Alert
} from 'react-native';
import CustomButton from '../../comonents/button/CustomButton';
import { colorConstant } from '../../utils/TextConstants';
import ImageSelection from '../../comonents/imageSelection/ImageSelection';

const AddListScreen = () => {
  // State for note data
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState([{ id: Date.now(), text: '' }]);
  
  // Timer references for debouncing
  const titleTimerRef = useRef(null);
  const noteTimersRef = useRef({});
  
  // References for TextInputs
  const titleInputRef = useRef(null);
  const noteInputRefs = useRef({});
  
  // ScrollView reference for scrolling to new inputs
  const scrollViewRef = useRef(null);
  
  // Function to debounce title updates
  const updateTitleWithDebounce = (newTitle) => {
    setTitle(newTitle); // Update UI immediately
    
    // Clear any existing timer
    if (titleTimerRef.current) {
      clearTimeout(titleTimerRef.current);
    }
    
    // Set new timer for actual processing
    titleTimerRef.current = setTimeout(() => {
      console.log('Title processed after debounce:', newTitle);
      // Any additional processing for title can go here
    }, 300);
  };
  
  // Function to debounce note updates
  const updateNoteWithDebounce = (id, newText) => {
    // Update state immediately for UI responsiveness
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === id ? { ...note, text: newText } : note
      )
    );
    
    // Clear existing timer for this specific note
    if (noteTimersRef.current[id]) {
      clearTimeout(noteTimersRef.current[id]);
    }
    
    // Set new timer for processing
    noteTimersRef.current[id] = setTimeout(() => {
      console.log(`Note ${id} processed after debounce:`, newText);
      // Any additional processing for note can go here
    }, 300);
  };
  
  // Add a new note
  const addNote = () => {
    const newNoteId = Date.now();
    const newNote = { id: newNoteId, text: '' };
    
    setNotes(prevNotes => [...prevNotes, newNote]);
    
    // Focus on new note after rendering
    setTimeout(() => {
      if (noteInputRefs.current[newNoteId]) {
        noteInputRefs.current[newNoteId].focus();
        
        // Scroll to make the new input visible
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }
      }
    }, 100);
  };
  
  // Remove a note
  const removeNote = (idToRemove) => {
    // Only allow removal if there's more than one note
    if (notes.length <= 1) return;
    
    // Find index of note to be removed
    const indexToRemove = notes.findIndex(note => note.id === idToRemove);
    if (indexToRemove === -1) return;
    
    // Find the note to focus on after removal (previous or next)
    const nextFocusIndex = Math.max(0, indexToRemove - 1);
    const nextFocusId = notes[nextFocusIndex]?.id;
    
    // Update notes state
    setNotes(prevNotes => prevNotes.filter(note => note.id !== idToRemove));
    
    // Clean up timer for removed note
    if (noteTimersRef.current[idToRemove]) {
      clearTimeout(noteTimersRef.current[idToRemove]);
      delete noteTimersRef.current[idToRemove];
    }
    
    // Focus on adjacent note
    setTimeout(() => {
      if (nextFocusId && noteInputRefs.current[nextFocusId]) {
        noteInputRefs.current[nextFocusId].focus();
      }
    }, 50);
  };
  
  // Handle submit button press
  const handleSubmit = () => {
    // Filter out empty notes
    const validNotes = notes.filter(note => note.text.trim() !== '');
    
    // Log the final data
    console.log({
      title,
      notes: validNotes.map(note => note.text)
    });
    
    // Here you would typically save the data or navigate away
  };
  
  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (titleTimerRef.current) {
        clearTimeout(titleTimerRef.current);
      }
      
      Object.values(noteTimersRef.current).forEach(timer => {
        clearTimeout(timer);
      });
    };
  }, []);
  
  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.headerText}>Add your Todo-List</Text>

        <View>
        <ImageSelection  onSelectImage={()=>{Alert.alert('Select Image click')}} />
      </View>
        
        {/* Title Section */}
        <Text style={styles.sectionLabel}>Todo Title</Text>
        <View style={styles.inputContainer}>
          <TextInput
            ref={titleInputRef}
            style={styles.textInput}
            placeholder="Add your note title here"
            value={title}
            onChangeText={updateTitleWithDebounce}
            returnKeyType="next"
            onSubmitEditing={() => {
              if (notes.length > 0 && noteInputRefs.current[notes[0].id]) {
                noteInputRefs.current[notes[0].id].focus();
              }
            }}
          />
        </View>
        
        {/* Notes Section */}
        <Text style={styles.sectionLabel}>Todo Description</Text>
        
        {notes.map((note, index) => (
          <View key={note.id} style={styles.inputContainer}>
            <TextInput
              ref={ref => {
                if (ref) noteInputRefs.current[note.id] = ref;
              }}
              style={styles.textInput}
              placeholder={`Note Description ${index + 1}`}
              value={note.text}
              onChangeText={(text) => updateNoteWithDebounce(note.id, text)}
              returnKeyType={index === notes.length - 1 ? "done" : "next"}
              onSubmitEditing={() => {
                if (index < notes.length - 1) {
                  // Focus on next note
                  const nextNoteId = notes[index + 1].id;
                  if (noteInputRefs.current[nextNoteId]) {
                    noteInputRefs.current[nextNoteId].focus();
                  }
                } else {
                  // Add new note if this is the last one
                  addNote();
                }
              }}
              blurOnSubmit={false}
            />
            
            <View style={styles.actionButtons}>
              {notes.length > 1 && (
                <TouchableOpacity 
                  style={[styles.iconButton, styles.removeButton]} 
                  onPress={() => removeNote(note.id)}
                >
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
              )}
              
              {index === notes.length - 1 && (
                <TouchableOpacity 
                  style={[styles.iconButton, styles.addButton]} 
                  onPress={addNote}
                >
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
      
      {/* Submit Button */}
      <View style={styles.submitContainer}>
        <CustomButton 
          title="Submit Todo" 
          onpress={handleSubmit} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorConstant.BabyBlue,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 8,
    color: '#34495e',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  textInput: {
    flex: 1,
    padding: Platform.OS === 'ios' ? 14 : 12,
    fontSize: 16,
    color: '#2c3e50',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingRight: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  addButton: {
    backgroundColor: colorConstant.primary,
  },
  removeButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  submitContainer: {
    padding: 16,
    paddingTop: 8,
  },
});

export default AddListScreen;