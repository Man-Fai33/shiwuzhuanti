import { Box, Center, HStack, Text, Pressable, Icon } from 'native-base';
import React from 'react'

export default function Footer({ navigation }) {
    const [selected, setSelected] = React.useState(1);
    return (
        <Box bg="white" safeAreaTop width="100%" maxW="100%" alignSelf="center">

            <Center flex={1}></Center>
            <HStack bg="indigo.600" alignItems="center" safeAreaBottom shadow={6}>
                <Pressable cursor="pointer" opacity={selected === 0 ? 1 : 0.5} py="3" flex={1} 
                // onPress={() => setSelected(0)}
                onPress={() => navigation.navigate("Home")}

                >
                    <Center>
                        {/* <Entypo name="home" size={24} color="black" /> */}
                        <Text color="white" fontSize="12">
                            Home
                        </Text>
                    </Center>
                </Pressable>
                <Pressable cursor="pointer" opacity={selected === 1 ? 1 : 0.5} py="2" flex={1} 
                // onPress={() => setSelected(1)}
                onPress={() => navigation.navigate("Home")}
                >
                    <Center>
                        {/* <Icon mb="1" as={<MaterialIcons name="search" />} color="white" size="sm" /> */}
                        <Text color="white" fontSize="12">
                            Search
                        </Text>
                    </Center>
                </Pressable>
                <Pressable cursor="pointer" opacity={selected === 2 ? 1 : 0.6} py="2" flex={1} 
                // onPress={() => setSelected(2)}
                onPress={() => navigation.navigate("Home")}
                >
                    <Center>
                        {/* <Icon mb="1" as={<MaterialCommunityIcons name={selected === 2 ? "cart" : "cart-outline"} />} color="white" size="sm" /> */}
                        <Text color="white" fontSize="12">
                            Cart
                        </Text>
                    </Center>
                </Pressable>
                <Pressable cursor="pointer" opacity={selected === 3 ? 1 : 0.5} py="2" flex={1} 
                // onPress={() => setSelected(3)}
                onPress={() => navigation.navigate("Home")}
                >
                    <Center>
                        {/* <Icon mb="1" as={<MaterialCommunityIcons name={selected === 3 ? "account" : "account-outline"} />} color="white" size="sm" /> */}
                        <Text color="white" fontSize="12">
                            Account
                        </Text>
                    </Center>
                </Pressable>
            </HStack>
        </Box>
    )
}