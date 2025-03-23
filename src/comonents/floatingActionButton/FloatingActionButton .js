import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet, Image } from 'react-native';
import { colorConstant } from '../../utils/TextConstants';
import { Icons } from '../../utils/ImageConstants';

const FloatingActionButton = ({deleteOnpress,attachmentOnpress,editOnpress}) => {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;
    
    Animated.spring(animation, {
      toValue,
      friction: 6,
      tension: 80,
      useNativeDriver: true,
    }).start();
    
    setIsOpen(!isOpen);
  };

  // Animation values for each button
  const trashTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -5]
  });

  const trashTranslateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -100]
  });

  const checkTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -80]
  });

  const checkTranslateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -60]
  });

  const editTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -100]
  });

  const editTranslateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20]
  });

  // Animation for opacity
  const opacityAnimation = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1]
  });

  // Animation for rotation
  const rotateAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg']
  });

  return (
    <View style={styles.container}>
      {/* Trash Button */}
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            transform: [
              { translateX: trashTranslateX },
              { translateY: trashTranslateY }
            ],
            opacity: opacityAnimation
          }
        ]}
      >
      {/* Delete Icon Code  */}
        <TouchableOpacity style={styles.actionButton} onPress={deleteOnpress}>
          <View style={styles.iconWrapper}>
          <Image source={Icons.delete}  style={styles.editIcon}/>
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* Check Button */}
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            transform: [
              { translateX: checkTranslateX },
              { translateY: checkTranslateY }
            ],
            opacity: opacityAnimation
          }
        ]}
      >
      {/* Attachment Code  */}
        <TouchableOpacity style={styles.actionButton} onPress={attachmentOnpress}>
          <View style={styles.iconWrapper}>
          <Image source={Icons.attachment}  style={styles.editIcon}/>
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* Edit Button */}
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            transform: [
              { translateX: editTranslateX },
              { translateY: editTranslateY }
            ],
            opacity: opacityAnimation
          }
        ]}
      > 
      {/* edit Icon Code */}
        <TouchableOpacity style={styles.actionButton} onPress={editOnpress}>
          <View style={styles.iconWrapper}>
            <Image source={Icons.editPen}  style={styles.editIcon}/>
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* Main FAB */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={toggleMenu}
        style={styles.fab}
      >
        <Animated.View
          style={[
            styles.fabIconContainer,

            // { transform: [{ rotate: rotateAnimation }] }
          ]}
        >
          <View style={styles.plusIconHorizontal} />
          <View style={styles.plusIconVertical} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    backgroundColor: colorConstant.primary,
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  actionButton: {
    backgroundColor: colorConstant.primary,
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabIconContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIconHorizontal: {
    position: 'absolute',
    backgroundColor: 'white',
    width: 20,
    height: 3,
    borderRadius: 1.5,
  },
  plusIconVertical: {
    position: 'absolute',
    backgroundColor: 'white',
    width: 3,
    height: 20,
    borderRadius: 1.5,
  },
  trashIcon: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 1,
  },
  checkIcon: {
    width: 20,
    height: 20,
    borderColor: 'white',
    resizeMode:'contain',
    transform: [{ rotate: '-45deg' }],
  },
  editIcon: {
    width: 20,
    height: 20,
    borderColor: 'white',
    resizeMode:'contain'
  },
});

export default FloatingActionButton;