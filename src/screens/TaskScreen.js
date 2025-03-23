import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../comonents/header/Header';
import SearchBar from '../comonents/search/SearchBar';
import TaskCard from '../comonents/cards/TaskCard';
import { useNavigation } from '@react-navigation/native';
import LoadingScreen from '../comonents/loading/LoadingScreen';
import { taskService } from '../api/apiService';
import { useAuth } from '../context/AuthContext';

const TaskScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [taskData, setTaskData] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const handleGetTask = async () => {
      setIsLoading(true); // Ensure loading starts
      try {
        const userId = user?._id;
        const response = await taskService.getTasks(userId);
        if (response.data) {
          // Sort tasks in descending order (latest first)
          const sortedTasks = response.data.sort((a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
          );

          setTaskData(sortedTasks);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setIsLoading(false); // Ensure loading stops
      }
    };
    handleGetTask();
  }, [user?._id]);

  const handleNavigation = () => {
    navigation.navigate('AddTasks');
  };
  const handleShowTaskNavigation = (task) => {
    navigation.navigate('ShowResult', { taskData: task })
  }

  return (
    <View style={styles.mainContainer}>
      <Header addOnPress={handleNavigation} />
      <SearchBar />

      {/* Show Loading Indicator while fetching data */}
      {isLoading ? (
        <View style={styles.loadingOverlay}>
          <LoadingScreen />
        </View>
      ) : (
        <FlatList
          data={taskData}
          keyExtractor={(item, index) => item.id || item._id || index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onLongPress={()=>{}} onPress={() => handleShowTaskNavigation(item)}>
              <TaskCard
                title={item.title}
                description={item.description}
                status={item.status}
              />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#d4f1f4',
    paddingHorizontal: 10,
    gap: 20,
  },
  flatListContent: {
    flexGrow: 1,
    paddingBottom: 80, // Extra space at bottom
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
