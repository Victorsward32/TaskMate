import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colorConstant } from '../../utils/TextConstants'

const CustomButton = ({onpress,title,isDisabled=false}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onpress} disabled={isDisabled}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
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
})