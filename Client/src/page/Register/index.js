import React from 'react'
import { View ,TouchableOpacity,Text} from 'react-native'

export default function Register({ navigation }){

    function cancel() {
        navigation.navigate("CameraPage");
    }

    return(
        <View>
            <Text>register</Text>
        </View>
    )
}