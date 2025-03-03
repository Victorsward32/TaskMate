import React from 'react';
import { Image, StyleSheet, View, SafeAreaView, Dimensions, StatusBar } from 'react-native';
import { colorConstant } from '../../utils/TextConstants';

const { width, height } = Dimensions.get('window'); 

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
    <StatusBar backgroundColor={colorConstant.primary} barStyle={'light-content'}></StatusBar>
      <View style={styles.mainContainer}>
        <Image
          source={require('../../assets/images/logo/logo.png')}
          style={styles.image}
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colorConstant.primary, 
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorConstant.primary,
  },
  image: {
    width: width * 0.6, 
    height: height * 0.3, 
    resizeMode: 'contain',
  },
});
