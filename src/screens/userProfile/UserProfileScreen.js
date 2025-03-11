import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image
} from 'react-native';
import { colorConstant } from '../../utils/TextConstants';

// This is a component for user profile screen
// It handles both viewing and editing user information
const UserProfileScreen = () => {
  // ---------- STATE SETUP ----------
  // Default user information
  const [email, setEmail] = useState('user@example.com');
  const [username, setUsername] = useState('johnsmith');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  
  // Profile photo URL - default is a placeholder image
  const [profilePhoto, setProfilePhoto] = useState('https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  
  // Track if we're in edit mode or view mode
  const [isEditing, setIsEditing] = useState(false);
  
  // Store any error messages for form fields
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [otpError, setOtpError] = useState('');

  // ---------- HELPER FUNCTIONS ----------
  
  // Function to switch to edit mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Function to handle form cancellation
  const handleCancel = () => {
    // Reset any entered form data
    setPassword('');
    setConfirmPassword('');
    setOtp('');
    
    // Clear all error messages
    setEmailError('');
    setUsernameError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setOtpError('');
    
    // Exit edit mode
    setIsEditing(false);
  };

  // Function to validate the form before submission
  const validateForm = () => {
    // Reset all error messages first
    setEmailError('');
    setUsernameError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setOtpError('');
    
    let isValid = true;
    
    // Check if email is valid
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }
    
    // Check if username is valid
    if (!username) {
      setUsernameError('Username is required');
      isValid = false;
    } else if (username.length < 3) {
      setUsernameError('Username must be at least 3 characters');
      isValid = false;
    }
    
    // Only validate password if user is trying to change it
    if (password) {
      // Check password length
      if (password.length < 6) {
        setPasswordError('Password must be at least 6 characters');
        isValid = false;
      }
      
      // Check if passwords match
      if (password !== confirmPassword) {
        setConfirmPasswordError('Passwords do not match');
        isValid = false;
      }
      
      // Check if OTP is provided for password change
      if (!otp) {
        setOtpError('OTP is required when changing password');
        isValid = false;
      } else if (otp.length !== 6) {
        setOtpError('OTP must be 6 digits');
        isValid = false;
      }
    }
    
    return isValid;
  };

  // Function to save profile changes
  const handleSubmit = () => {
    // First validate the form
    if (validateForm()) {
      // Here you would send the data to your API/backend
      // For this example, we'll just show a success message
      
      Alert.alert(
        "Success",
        "Your profile has been updated successfully!",
        [{ text: "OK", onPress: () => setIsEditing(false) }]
      );
      
      // Clear sensitive data
      setPassword('');
      setConfirmPassword('');
      setOtp('');
    }
  };

  // Function to handle profile photo change
  // In a real app, this would open image picker
  const handleChangePhoto = () => {
    Alert.alert(
      "Change Profile Photo",
      "In a real app, this would open an image picker. For now, we'll just simulate changing the photo.",
      [
        { text: "Cancel" },
        { 
          text: "Change Photo", 
          onPress: () => {
            // For demo purposes, just change to another placeholder
            const randomId = Math.floor(Math.random() * 1000);
            setProfilePhoto(`https://via.placeholder.com/150?text=User+${randomId}`);
          }
        }
      ]
    );
  };

  // ---------- RENDER UI ----------
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>User Profile</Text>
          
          {/* Only show Edit button when not in edit mode */}
          {!isEditing && (
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEdit}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Profile Photo Section (Always visible) */}
        <View style={styles.photoContainer}>
          <Image
            source={{ uri: profilePhoto }}
            style={styles.profilePhoto}
          />
          
          {/* Only show change photo button in edit mode */}
          {isEditing && (
            <TouchableOpacity
              style={styles.changePhotoButton}
              onPress={handleChangePhoto}
            >
              <Text style={styles.changePhotoText}>Change Photo</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Content Section - Either Profile Info or Edit Form */}
        {isEditing ? (
          // ---------- EDIT MODE ----------
          <View style={styles.form}>
            {/* Email Field */}
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, emailError ? styles.inputError : null]}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Enter your email"
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            {/* Username Field */}
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={[styles.input, usernameError ? styles.inputError : null]}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholder="Enter your username"
            />
            {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}

            {/* Password Field (Optional) */}
            <Text style={styles.label}>New Password (optional)</Text>
            <TextInput
              style={[styles.input, passwordError ? styles.inputError : null]}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Leave blank to keep current password"
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            {/* Confirm Password Field */}
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={[styles.input, confirmPasswordError ? styles.inputError : null]}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholder="Confirm new password"
              editable={password.length > 0} // Only enabled if password field has content
            />
            {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

            {/* OTP Field */}
            <Text style={styles.label}>OTP Code (for password change)</Text>
            <TextInput
              style={[styles.input, otpError ? styles.inputError : null]}
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              editable={password.length > 0} // Only enabled if password field has content
            />
            {otpError ? <Text style={styles.errorText}>{otpError}</Text> : null}

            {/* Button Row */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={handleCancel}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.submitButton} 
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          // ---------- VIEW MODE ----------
          <View style={styles.profileInfo}>
            {/* Display Email */}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{email}</Text>
            </View>
            
            {/* Display Username */}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Username:</Text>
              <Text style={styles.infoValue}>{username}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UserProfileScreen;

// Styles for the component
const styles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    backgroundColor: colorConstant.BabyBlue,
  },
  scrollContainer: {
    padding: 20,
  },
  
  // Header styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  editButton: {
    backgroundColor: colorConstant.primary,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  
  // Profile photo styles
  photoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#fff',
  },
  changePhotoButton: {
    backgroundColor: colorConstant.primary,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  changePhotoText: {
    color: 'white',
    fontWeight: '500',
  },
  
  // Profile info styles (view mode)
  profileInfo: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 15,
  },
  infoLabel: {
    width: '30%',
    fontWeight: '600',
    color: '#555',
    fontSize: 16,
  },
  infoValue: {
    flex: 1,
    color: '#333',
    fontSize: 16,
  },
  
  // Form styles (edit mode)
  form: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 18,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#e74c3c',
    borderWidth: 2,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 14,
    marginTop: -14,
    marginBottom: 14,
    paddingLeft: 4,
  },
  
  // Button styles
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: colorConstant.secondary,
    paddingVertical: 14,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: colorConstant.primary,
    paddingVertical: 14,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
});