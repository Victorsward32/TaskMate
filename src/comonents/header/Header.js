import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { Icons } from '../../utils/ImageConstants'

const Header = () => {
  return (
    <View style={styles.mainContainer}>
    <View style={styles.profilePicContainer}>
    <Image source={Icons.user} style={styles.img}/>
    </View>
    <View style={styles.txtContainer}>
        <Text style={styles.headerTxt}>Hello Sumit ...</Text>
    </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    mainContainer:{
        height:80,
        alignItems:'center',
        // justifyContent:"center",
        flexDirection:'row',
        gap:10,
    },
    profilePicContainer:{
        borderRadius:60,
        borderWidth:1,
        overflow:'hidden'
    },
    img:{
        height:40,
        width:40,
        resizeMode:'contain'
    },
    txtContainer:{
        flex:1
    },
    headerTxt:{
        fontSize:16,
        fontWeight:'600',
        lineHeight:24,
    }
})