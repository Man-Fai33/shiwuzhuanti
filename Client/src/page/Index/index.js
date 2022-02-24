import React from 'react'
import { View ,TouchableOpacity} from 'react-native'
import {  Text, Box } from 'native-base';
export default function Index({ navigation }){

    function cancel() {
        navigation.navigate("Login");
    }

    return(
        <View>
        <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
        <Text>Open up App.js to start working on your app!</Text>
      </Box>
      </View>
        // <View>
        //     <Text> hello</Text>
        //  <TouchableOpacity onPress={cancel} ><Text>sd</Text></TouchableOpacity>
        // </View>
    )
}   