import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from './src/page/Index';
import Login from './src/page/Login';
import Register from './src/page/Register';
export const ImagePathContext = React.createContext()


const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <ImagePathContext.Provider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ title: 'Index' }} name="Index" component={Index} />
          {/* <Stack.Screen options={{ title: 'Register' }} name="Register" component={Register} />
          <Stack.Screen options={{ title: 'Login' }} name="Login" component={Login} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </ImagePathContext.Provider>
  );
};


export default App;
