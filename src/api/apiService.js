import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {API_BASE_URL} from '@env'
import { getToken,removeToken, removeUserData} from "../utils/tokenStorage";
import API_URLS from './apiUrls';
import envConfig from '../config/environment';

// Create Axios instance with default config
const apiClient = axios.create({
    baseURL: envConfig.apiUrl,
    timeout: envConfig.timeout,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
})

//Request interceptors too add authentication token
apiClient.interceptors.request.use(
    async (config) =>{
        //get token from async storage
        const token = await getToken();
        //if Token exists , add it to the header 
        if(token){
            config.headers['Authorization']=`Bearer ${token}`
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
)

//response interceptor to handle common errors
apiClient.interceptors.response.use(
    (response)=>{
        return response;
    },
    async (error) => {
        // Handle 401 Unauthorized errors (expired token, etc.)
        if (error.response && error.response.status === 401) {
          await removeToken();
          await removeUserData();
          // Here you could navigate to login screen or trigger a global event
          // For example: EventEmitter.emit('SESSION_EXPIRED');
        }
        
        return Promise.reject(error);
      }
)


// API service for authentication
export const authService = {
    // Register a new user
    register: (userData) => {
      return apiClient.post(API_URLS.AUTH.REGISTER, userData);
    },
    
    // Login user
    login: async (username, password) => {
      return apiClient.post(API_URLS.AUTH.LOGIN, { username, password });
    },
    
    // Forgot password
    forgotPassword: (email) => {
      return apiClient.post(API_URLS.AUTH.FORGOT_PASSWORD, { email });
    },
    
    // Reset password
    resetPassword: (token, newPassword) => {
      return apiClient.post(API_URLS.AUTH.RESET_PASSWORD, { token, newPassword });
    },
    
    // Upload profile photo (with FormData)
    uploadProfilePhoto: (photoFile) => {
      const formData = new FormData();
      formData.append('profilePhoto', {
        uri: photoFile.uri,
        type: photoFile.type,
        name: photoFile.fileName || 'profile.jpg',
      });
      
      return apiClient.post(API_URLS.AUTH.UPLOAD_PROFILE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
  };
  
  // API service for tasks
  export const taskService = {
    // Create a new task
    createTask: async (taskData) => {
      const token = await getToken();
      return apiClient.post(API_URLS.TASK.CREATE_TASK, taskData,{
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token ? `Bearer ${token}` : '', // Include token if needed
        },
      })
    },

    //
    // createTaskWithImage: async (taskData) => {
    //   return await axios.post(API_URLS.TASK.CREATE_TASK, taskData, {
    //     headers: { 'Content-Type': 'multipart/form-data' },
    //   });
    // },
    // Get all tasks
    getTasks: (userId) => {
      return apiClient.get(API_URLS.TASK.GET_TASK,userId);
    },
    
    // Edit a task
    editTask: async (taskId, taskData) => {
      const token = await getToken();
      return apiClient.put(`${API_URLS.TASK.EDIT_TASK}${taskId}`, taskData,{
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token ? `Bearer ${token}` : '', // Include token if needed
        },});
    },
    
    // Delete a task
    deleteTask: (taskId) => {
      return apiClient.delete(`${API_URLS.TASK.DELETE}${taskId}`);
    },
  };
  
  // API service for notes
  export const noteService = {
    // Create a new note
    createNote: (noteData) => {
      return apiClient.post(API_URLS.NOTE.CREATE, noteData);
    },
    
    // Get all notes
    getNotes: () => {
      return apiClient.get(API_URLS.NOTE.GET_ALL);
    },
    
    // Edit a note
    editNote: (noteId, noteData) => {
      return apiClient.put(`${API_URLS.NOTE.EDIT}${noteId}`, noteData);
    },
    
    // Delete a note
    deleteNote: (noteId) => {
      return apiClient.delete(`${API_URLS.NOTE.DELETE}${noteId}`);
    },
  };
  
  // API service for todos
  export const todoService = {
    // Create a new todo
    createTodo: (todoData) => {
      return apiClient.post(API_URLS.TODO.CREATE, todoData);
    },
    
    // Get all todos
    getTodos: () => {
      return apiClient.get(API_URLS.TODO.GET_ALL);
    },
    
    // Edit a todo
    editTodo: (todoId, todoData) => {
      return apiClient.put(`${API_URLS.TODO.EDIT}${todoId}`, todoData);
    },
    
    // Delete a todo
    deleteTodo: (todoId) => {
      return apiClient.delete(`${API_URLS.TODO.DELETE}${todoId}`);
    },
  };
  