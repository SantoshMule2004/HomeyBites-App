import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import BottomNavigator, { BottomParamList } from './BottomNavigator';
import { Add } from '../types/LocationType';

import React from 'react'
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import SearchScreen from '../screens/SearchScreen';
import SinlgeItemScreen from '../screens/SinlgeItemScreen';
import AddNewAddress from '../screens/account/AddNewAddress';
import ConfirmAddress from '../screens/account/ConfirmAddress';
import PlaceOrder from '../screens/PlaceOrder';
import { useAppTheme } from '../stores/useAppTheme';
import { Colors } from '../constants/Colors';
import Payment from '../screens/Payment';


export type RootStackParamList = {
    BottomTabs: NavigatorScreenParams<BottomParamList>;
    Login: undefined;
    Register: undefined;
    Search: undefined;
    SingleItem: { itemId: string, userLat: number, userLng: number };
    AddAddress: undefined;
    ConfirmAddress: { address: Add };
    PlaceOrder: undefined;
    Payment: { addressId: number, grandTotal?: number };
};

const appStack = createNativeStackNavigator<RootStackParamList>()
export type navigationProp = NativeStackNavigationProp<RootStackParamList>;



const AppNavigator = () => {
    const colorScheme: string = useAppTheme()
    const theme = colorScheme == "light" ? Colors.light : Colors.dark

    return (
        <NavigationContainer>
            <appStack.Navigator>
                <appStack.Screen name='BottomTabs' component={BottomNavigator} options={{ headerShown: false, animation: 'fade_from_bottom' }} />
                <appStack.Screen name='Login' component={Login} options={{ headerShown: false, presentation: 'modal', animation: 'none' }} />
                <appStack.Screen name='Register' component={Register} options={{ headerShown: false, presentation: 'modal', animation: 'none' }} />
                <appStack.Screen name='Search' component={SearchScreen} options={{ headerShown: false, animation: 'fade_from_bottom' }} />
                <appStack.Screen name='SingleItem' component={SinlgeItemScreen} options={{ headerShown: false, animation: 'fade_from_bottom' }} />
                <appStack.Screen name='AddAddress' component={AddNewAddress} options={{ headerShown: false, animation: 'fade_from_bottom' }} />
                <appStack.Screen name='ConfirmAddress' component={ConfirmAddress} options={{ headerShown: false, animation: 'fade_from_bottom' }} />
                <appStack.Screen name='PlaceOrder' component={PlaceOrder} options={{ title:'Order Summary', headerShown: true, animation: 'fade_from_bottom', headerStyle: { backgroundColor: theme.navBackground }, headerTintColor: theme.title }} />
                <appStack.Screen name='Payment' component={Payment} options={{ title:'Payment', headerShown: true, animation: 'fade_from_bottom', headerStyle: { backgroundColor: theme.navBackground }, headerTintColor: theme.title }} />
            </appStack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator