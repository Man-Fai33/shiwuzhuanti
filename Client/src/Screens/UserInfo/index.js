import { Center, ScrollView, Avatar, VStack } from 'native-base';
import React from 'react'
export default function UserInfo() {
    return (
        <>
            <Center>
                <ScrollView>
                    <VStack>
                    <Center mt="3" mb="4">
                        <Heading fontSize="xl">Cyan</Heading>
                    </Center>
                    <Avatar bg="purple.600" alignSelf="center" size="2xl" source={{
                        uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
                    }}>
                        RB
                    </Avatar>
                    </VStack>
                </ScrollView>
            </Center>
        </>
    );
}