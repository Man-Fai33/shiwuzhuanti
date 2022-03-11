/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Index from './src/Screens/Index';
import SignInForm from './src/Screens/SignIn';
import SignUpForm from './src/Screens/SignUp';
import Footer from './src/compnonets/Footer';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();





const App = () => {
  const routes = [
    { name: 'Home', component: Index },
    { name: 'SignIn', component: SignInForm },
    { name: 'SignUp', component: SignUpForm },
    // { name: 'SettingsPage', component: SettingsPage },
    // { name: 'HistoryPage', component: History },
    // { name: 'PractiseHome', component: PractiseIndex },
    // { name: 'SubmitEval', component: SubmitIndex },
    // { name: 'EvalResult', component: EvalResult },
    // { name: 'EvalDetails', component: EvalDiff },
  ];


  return (

    <NativeBaseProvider
      config={{ suppressColorAccessibilityWarning: true }}
    // theme={Theme}
    >
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, }}>
          {/* // screenOptions={{headerShown: false,}}>
          // {routes.map(({ name, component }) => (
          //   <Stack.Screen name={name} component={component} />
          // ))} */}
          <Stack.Screen name='Home' component={Index} />
          <Stack.Screen name='SignIn' component={SignInForm} />
          <Stack.Screen name='SignUp' component={SignUpForm} />
        </Stack.Navigator>
        <Footer />
      </NavigationContainer>

    </NativeBaseProvider>



  );
};

export default App;
