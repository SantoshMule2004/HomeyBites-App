import React from 'react'
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import SavedAddresses from '../screens/account/SavedAddresses';
import Account from '../screens/account/Account';
import { Colors } from '../constants/Colors';
import { useAppTheme } from '../stores/useAppTheme';
import EditProfile from '../screens/account/EditProfile';
import ForgetPassword from '../screens/account/ForgetPassword';
import AddAddress from '../screens/account/AddAddress';
import AddNewAddress from '../screens/account/AddNewAddress';
import ResetPassword from '../screens/account/ResetPassword';

const AccountStack = createNativeStackNavigator();

export type StackParamList = {
  AccountInfo: undefined;
  SavedAddresses: undefined;
  EditProfile: undefined;
  ForgetPassword: undefined;
  ResetPassword: undefined;
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
        options={{ title: 'Saved Addresses', animation: 'fade_from_bottom' }}
      />
      <AccountStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ title: 'Edit Profile', animation: 'fade_from_bottom' }}
      />
      <AccountStack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{ title: 'Forget Password', animation: 'fade_from_bottom' }}
      />
      <AccountStack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ title: 'Reset Password', animation: 'fade_from_bottom' }}
      />
      {/* <AccountStack.Screen
        name="AddAddress"
        component={AddNewAddress}
        options={{ title: 'Add New Address', headerShown: false, animation: 'fade_from_bottom' }}
      /> */}
    </AccountStack.Navigator>
  )
}

export default AccountStackNavigator