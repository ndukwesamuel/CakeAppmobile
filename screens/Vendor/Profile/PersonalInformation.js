import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PersonalInformation = () => {
  return (
    <View style={styles.container}>
        <View style={styles.textGroup}>
            <Text style={{fontSize:12, fontWeight:"400"}}>Phone Number</Text>
            <Text style={{fontSize:16, fontWeight:"500"}}>08112121212</Text>
        </View>
        <View style={styles.textGroup}>
            <Text style={{fontSize:12, fontWeight:"400"}}>Email</Text>
            <Text style={{fontSize:16, fontWeight:"500"}}>opakunleeniolail2019@gmail.com</Text>
        </View>
        <View style={styles.textGroup}>
            <Text style={{fontSize:12, fontWeight:"400"}}>Home Location</Text>
            <Text style={{fontSize:16, fontWeight:"500"}}>Iyana-Ipaja, Lagos</Text>
        </View>
    </View>
  )
}

export default PersonalInformation

const styles = StyleSheet.create({
    container:{
        padding:20,
        gap:10,
        paddingTop:40,

    },
    textGroup:{
        backgroundColor:"white",
        padding:15,
        gap:5,
        borderRadius: 8
    }
})