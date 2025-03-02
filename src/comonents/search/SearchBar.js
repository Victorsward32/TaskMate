import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Icons } from '../../utils/ImageConstants'

const SearchBar = () => {
  return (
    <View style={styles.SearchBar}>
      <Image source={Icons.search} style={styles.icon} />
      <TextInput style={styles.inputTxt} placeholder='search for ... ' />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    SearchBar:{
        borderWidth:0.6,
        paddingHorizontal:10,
        borderRadius:12,
        flexDirection:'row',
        alignItems:'center',
        gap:8,
    },
    icon:{
        height:30,
        width:30,
        resizeMode:'contain'
    },
    inputTxt:{
        flex:1
    }
})