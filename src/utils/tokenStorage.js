import AsyncStorage from "@react-native-async-storage/async-storage"


// Define the missing constants
const TOKEN_KEY = "auth_token";
const USER_KEY = "user_data";
const USER_ID="user_id"

// Save authentication token
export const saveToken  = async (token) => {
    try {
        // Make sure token is a string
        if (typeof token !== 'string') {
            console.error('Token must be a string:', token);
            return false;
        }
        
        await AsyncStorage.setItem(TOKEN_KEY, token);
        console.log('Token saved successfully');
        return true;
    } catch (error) {
        console.error("Error Saving Token: ", error);
        return false;
    }
}
// Get the authentication token
export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        console.log("Getting token:", token);
        return token;
    } catch (error) {
        console.error("Error getting token: ", error);
        return null;
    }
}

// Remove the token (logout)
export const removeToken = async () => {
    try {
        await AsyncStorage.removeItem(TOKEN_KEY);
        return true;
    } catch (error) {
        console.error("Error removing Token:", error);
        return false;

    }
}

//save user Data 
export const saveUserData = async (userData) => {
    try {
        const jsonValue = JSON.stringify(userData);
        await AsyncStorage.setItem(USER_KEY, jsonValue);
        return true;
    } catch (error) {
        console.error("Error Saving User Data: ", error);
        return false;
    }
}

//get User Data

export const getUserData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(USER_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (error) {
        console.error('Error getting user data:', error);
        return null;
      }
}

//Remove user Data 
export const removeUserData = async () => {
    try {
        await AsyncStorage.removeItem(USER_KEY);
        return true;
    } catch (error) {
        console.error('Error removing user data:', error);
        return false;
    }
};

//Store UserId
