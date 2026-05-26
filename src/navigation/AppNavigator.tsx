import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DefaultTheme, NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';

import React from 'react'
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import BottomNavigator, { BottomParamList } from './BottomNavigator';
import SearchScreen from '../screens/SearchScreen';
import SinlgeItemScreen from '../screens/SinlgeItemScreen';


export type RootStackParamList = {
    BottomTabs: NavigatorScreenParams<BottomParamList>;
    Login: undefined;
    Register: undefined;
    Search: undefined;
    SingleItem: { itemId: string };
};

const appStack = createNativeStackNavigator<RootStackParamList>()
export type navigationProp = NativeStackNavigationProp<RootStackParamList>;

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <appStack.Navigator>
                <appStack.Screen name='BottomTabs' component={BottomNavigator} options={{ headerShown: false }} />
                <appStack.Screen name='Login' component={Login} options={{ headerShown: false }} />
                <appStack.Screen name='Register' component={Register} options={{ headerShown: false }} />
                <appStack.Screen name='Search' component={SearchScreen} options={{ headerShown: false }} />
                <appStack.Screen name='SingleItem' component={SinlgeItemScreen} options={{ headerShown: false }} />
            </appStack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator