import React from 'react'
import { Box, Center, Heading, HStack, Text, VStack, FormControl, Input, Image, Button } from 'native-base'
export default function Index({ navigation }) {

    return (
        <Box>
            <Center>
                <Image source={{
                    uri: "https://wallpaperaccess.com/full/317501.jpg"
                }} alt="Alternate Text" size="xl" />
                <Text> Welcome to the System</Text>
            </Center>

            <Button onPress={() => navigation.navigate("SignIn")}>    DLLM </Button>

        </Box >
    );
}