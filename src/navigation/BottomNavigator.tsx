import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAppTheme } from '../stores/useAppTheme';
import { Colors } from '../constants/Colors';
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import IonIcons from '../components/IonIcons'
import AccountStackNavigator from './AccountStackNavigator';
import { TouchableWithoutFeedback, View } from 'react-native';

const bottomBar = createBottomTabNavigator()

export type BottomParamList = {
    Home: undefined;
    Account: undefined;
    Cart: undefined;
};

const BottomNavigator = () => {
    const colorScheme: string = useAppTheme()
    const theme = colorScheme == "light" ? Colors.light : Colors.dark

    return (
        <bottomBar.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: {
                backgroundColor: theme.navBackground,
                paddingTop: 10,
                height: 90,
                borderTopWidth: 0
            },
            tabBarActiveTintColor: theme.iconColorFocused,
            tabBarInactiveTintColor: theme.iconColor,
            tabBarButton: (props) => (
                <TouchableWithoutFeedback onPress={props.onPress}>
                    <View style={props.style}>
                        {props.children}
                    </View>
                </TouchableWithoutFeedback>
            ),
        }}>
            <bottomBar.Screen name='Home' component={Home} options={{
                tabBarIcon: ({ focused }) => (
                    <IonIcons size={24} name={focused ? "home" : "home-outline"}
                        style={{ color: focused ? theme.iconColorFocused : theme.iconColor, borderRadius: 0, backgroundColor: 'transparent' }} />
                )
            }} />

            <bottomBar.Screen name='Account' component={AccountStackNavigator} options={{
                tabBarIcon: ({ focused }) => (
                    <IonIcons size={24} name={focused ? "person-circle" : "person-circle-outline"}
                        style={{ color: focused ? theme.iconColorFocused : theme.iconColor, borderRadius: 0, backgroundColor: 'transparent' }} />
                )
            }} />


            <bottomBar.Screen name='Cart' component={Cart} options={{
                tabBarIcon: ({ focused }) => (
                    <IonIcons size={24} name={focused ? "cart" : "cart-outline"}
                        style={{ color: focused ? theme.iconColorFocused : theme.iconColor, borderRadius: 0, backgroundColor: 'transparent' }} />
                ),
                tabBarBadge: '2'
            }} />
        </bottomBar.Navigator>
    )
}

export default BottomNavigator