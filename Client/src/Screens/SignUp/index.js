import React from 'react'
import { Box, Center, Heading, VStack, FormControl, Input, Button } from 'native-base'
export default function SignUpForm({ navigation }) {
    return (
        <Box>
            <Center w="100%">
                <Box safeArea p="2" w="90%" maxW="290" py="8">
                    <Heading size="lg" color="coolGray.800" _dark={{
                        color: "warmGray.50"
                    }} fontWeight="semibold">
                        Welcome
                    </Heading>
                    <Heading mt="1" color="coolGray.600" _dark={{
                        color: "warmGray.200"
                    }} fontWeight="medium" size="xs">
                        Sign up to continue!
                    </Heading>
                    <VStack space={3} mt="5">
                        <FormControl>
                            <FormControl.Label>Email</FormControl.Label>
                            <Input variant="underlined"  />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Password</FormControl.Label>
                            <Input variant="underlined"  type="password" />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Confirm Password</FormControl.Label>
                            <Input variant="underlined"  type="password" />
                        </FormControl>
                        <Button mt="2" colorScheme="indigo" onPress={() => navigation.navigate("SignIn")}>
                            Sign up
                        </Button>
                    </VStack>
                </Box>
            </Center>
        </Box>
    );
}