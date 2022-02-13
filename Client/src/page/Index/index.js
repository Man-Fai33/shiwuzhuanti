import React from 'react'
import { View ,TouchableOpacity,Text} from 'react-native'

export default function Index({ navigation }){

    function cancel() {
        navigation.navigate("Login");
    }

    return(
        <View>
            <Text> hello</Text>
         <TouchableOpacity onPress={cancel} ><Text>sd</Text></TouchableOpacity>
        </View>
    )
}