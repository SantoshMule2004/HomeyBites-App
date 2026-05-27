import React from 'react'
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import SavedAddresses from '../screens/account/SavedAddresses';
import Account from '../screens/account/Account';
import { Colors } from '../constants/Colors';
import { useAppTheme } from '../stores/useAppTheme';
import EditProfile from '../screens/account/EditProfile';

const AccountStack = createNativeStackNavigator();

export type StackParamList = {
    AccountInfo: undefined;
    SavedAddresses: undefined;
    EditProfile: undefined;
}

export type accountNavigationProp = NativeStackNavigationProp<StackParamList>

const AccountStackNavigator = () => {
     const colorScheme: string = useAppTheme()
        const theme = colorScheme == "light" ? Colors.light : Colors.dark

  return (
    <AccountStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: theme.navBackground
        },
        headerTintColor: theme.text
    }}>
      <AccountStack.Screen 
        name="AccountInfo" 
        component={Account} 
        options={{ headerShown: false }}
      />
      <AccountStack.Screen 
        name="SavedAddresses" 
        component={SavedAddresses} 
        options={{ title: 'Saved Addresses' }}
      />
      <AccountStack.Screen 
        name="EditProfile" 
        component={EditProfile} 
        options={{ title: 'Edit Profile' }}
      />
    </AccountStack.Navigator>
  )
}

export default AccountStackNavigator