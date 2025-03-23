import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import StackNavigation from './src/navigations/StackNavigation.js';
import { AuthProvider } from './src/context/AuthContext.js';
import SplashScreen from './src/comonents/spash/SplashScreen.js';
import Toast from 'react-native-toast-message';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer); // Clean up timeout
  }, []);

  return (
    <AuthProvider>
      <SafeAreaView style={styles.container}>
        {isLoading ? <SplashScreen/> : <StackNavigation />}
        <Toast/>
      </SafeAreaView>
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
