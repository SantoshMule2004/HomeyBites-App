import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import React from 'react'
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import BottomNavigator from './BottomNavigator';
import SearchScreen from '../screens/SearchScreen';

const appStack = createNativeStackNavigator()

export type RootStackParamList = {
    BottomTabs: undefined;
    Login: undefined;
    Register: undefined;
    Search: undefined;
};

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <appStack.Navigator>
                <appStack.Screen name='BottomTabs' component={BottomNavigator} options={{ headerShown: false }} />
                <appStack.Screen name='Login' component={Login} options={{ headerShown: false, presentation: 'modal' }} />
                <appStack.Screen name='Register' component={Register} options={{ headerShown: false, presentation: 'modal' }} />
                <appStack.Screen name='Search' component={SearchScreen} options={{ headerShown: false, presentation: 'modal' }} />
            </appStack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator