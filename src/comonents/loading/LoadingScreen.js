import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Easing } from 'react-native';

const LoadingScreen = () => {
  const dots = Array(5).fill(null).map(() => ({
    scale: useRef(new Animated.Value(0)).current,
    translateY: useRef(new Animated.Value(0)).current,
  }));

  useEffect(() => {
    const startAnimation = (dot, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(dot.scale, {
              toValue: 1,
              duration: 500,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(dot.translateY, {
              toValue: -5,
              duration: 500,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(dot.scale, {
              toValue: 0,
              duration: 500,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(dot.translateY, {
              toValue: 5,
              duration: 500,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    };

    dots.forEach((dot, index) => startAnimation(dot, index * 200));
  }, []);

  return (
    <View style={styles.overlay}>  
      <View style={styles.container}>
        {dots.map((dot, index) => (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                transform: [
                  { scale: dot.scale },
                  { translateY: dot.translateY },
                ],
                opacity: dot.scale.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }),
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute', // Ensures it overlays but doesn’t block content
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent to show background
  },
  container: {
    flexDirection: 'row',
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: 'orange',
    marginHorizontal: 5,
  },
});

export default LoadingScreen;
