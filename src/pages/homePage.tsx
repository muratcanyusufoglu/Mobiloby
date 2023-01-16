import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
const window = Dimensions.get('window');


export default function HomePage() {
const navigation = useNavigation()

return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttons} onPress={()=>navigation.navigate('enterJob' as never)}>
        <Text style={styles.buttonText}>İş İlanı Ekle</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttons} onPress={()=>navigation.navigate('listJobs' as never)}>
        <Text style={styles.buttonText}>İlanları görüntüle</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles =StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttons: {
        width: window.width/2.5,
        height: window.height/6,
        backgroundColor: '#33FF33',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    buttonText:  {
        fontSize: 20,

    }
})