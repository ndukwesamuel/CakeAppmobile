import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppScreenThree from '../../../components/shared/AppScreenThree'

export default function EditProfile() {
  return (
    <AppScreenThree arrrow={"true"} title={"Edit Profile"}>
        <ScrollView style={styles.container} contentContainerStyle={{justifyContent:"space-between"}}>
            <View>

            </View>
            <View>
                
            </View>
        </ScrollView>
    </AppScreenThree>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        flex:1,
        top:60
    }
})