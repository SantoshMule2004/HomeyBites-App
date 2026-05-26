import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { useUserPrefStore } from '../stores/useUserPrefStore';
import { useAppTheme } from '../stores/useAppTheme';
import { Colors } from '../constants/Colors';
import IonIcons from './IonIcons';

const themeOptions = [
    // { label: 'System Default', value: 'system', icon: 'phone-portrait' },
    { label: 'Light Mode', value: 'light', icon: 'sunny' },
    { label: 'Dark Mode', value: 'dark', icon: 'moon' },
];

const AppThemeDropdown = () => {
    const colorScheme = useAppTheme()
    const theme = Colors[colorScheme] ?? Colors.light

    const userPref = useUserPrefStore((state) => state.userPref)
    const setUserPref = useUserPrefStore((state) => state.setUserPref)
    const activeTheme = useAppTheme()

    const [appTheme, setAppTheme] = useState(userPref || 'light')
    // const [themeIcon, setThemeIcon] = useState(userPref === 'system' ? 'phone-portrait' : userPref === 'light' ? 'sunny' : 'moon')
    const [themeIcon, setThemeIcon] = useState(userPref === 'light' ? 'sunny' : 'moon')

    const handleThemeToggle = (theme) => {
        console.log("activeTheme: ", activeTheme)
        console.log("Clicked")

        switch (theme) {
            case 'light':
                setUserPref('light')
                break
            case 'dark':
                setUserPref('dark')
                break
            // case 'system':
            //     setUserPref('system')
        }
    }

    return (
        <Dropdown
            data={themeOptions}
            style={[styles.dropdown, { backgroundColor: theme.uiBackground }]}
            containerStyle={[styles.dropdownContainer, { backgroundColor: theme.background, borderWidth: 0 }]}
            itemTextStyle={{ color: theme.text, }}
            activeColor={theme.navBackground}
            labelField="label"
            valueField="value"
            value={appTheme}
            onChange={(item) => {
                setAppTheme(item.value)
                setThemeIcon(item.icon)
                handleThemeToggle(item.value)
            }}

            renderRightIcon={() => (
                <View>
                    <IonIcons name={themeIcon} size={24} style={{ backgroundColor: 'transparent' }} />
                </View>
            )}

            placeholderStyle={{ display: 'none' }}
            selectedTextStyle={{ display: 'none' }}
        />
    )
}

export default AppThemeDropdown

const styles = StyleSheet.create({
    dropdown: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },
    iconWrapper: {
        justifyContent: 'flex-end',
        width: 20,
        height: 20
    },
    dropdownContainer: {
        width: 180,
        transform: [{ translateX: -140 }],
        overflow: 'hidden'
    }
})