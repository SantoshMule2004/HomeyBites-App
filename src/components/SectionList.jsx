import { SectionList, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useAppTheme } from '../stores/useAppTheme'
import { Colors } from '../constants/Colors'
import AppThemeDropdown from '../components/AppThemeDropdown'

const SectionItemList = ({ onClicked }) => {
    const colorScheme = useAppTheme()
    const theme = Colors[colorScheme] ?? Colors.light

    const [toggles, setToggles] = useState({
        bluetoothEnabled: false,
        darkModeEnabled: false,
    });

    const handleToggle = (key) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };
    const SETTINGS_DATA = [
        {
            title: 'Account settings',
            data: [
                { id: 'AppTheme', title: 'App Theme', type: 'dropdown', stateKey: 'darkModeEnabled' },
                { id: 'EditProfile', title: 'Edit Profile', type: 'link', subtitle: '' },
                { id: 'SavedAddresses', title: 'Saved Addresses', type: 'link', subtitle: '' },
                { id: 'ForgetPassword', title: 'Forget Password?', type: 'link', subtitle: '' },
            ],
        },
    ];

    const Divider = () => {
        return <View style={[styles.separator, { backgroundColor: theme.borderBottom }]} />
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={[styles.row, { backgroundColor: theme.navBackground }]}
                disabled={item.type === 'toggle' || item.type === 'dropdown'}
                onPress={() => onClicked(item.id)}
            >
                <View style={styles.rowLeft}>
                    <Text style={[styles.rowTitle, { color: theme.title }]}>{item.title}</Text>
                </View>

                <View style={styles.rowRight}>
                    {item.subtitle && <Text style={[styles.subtitle, { color: theme.text }]}>{item.subtitle}</Text>}

                    {item.type === 'toggle' ? (
                        <Switch
                            value={toggles[item.stateKey]}
                            onValueChange={() => handleToggle(item.stateKey)}
                        />
                    ) : item.type === 'dropdown' ? <AppThemeDropdown /> : (
                        <Text style={[styles.chevron]}>›</Text>
                    )}
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <SectionList
                sections={SETTINGS_DATA}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={[styles.sectionHeader, { color: theme.text }]}>{title}</Text>
                )}
                stickySectionHeadersEnabled={false}
                ItemSeparatorComponent={Divider}
            />
        </View>
    )
}

export default SectionItemList

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sectionHeader: {
        fontSize: 13,
        fontWeight: '600',
        textTransform: 'uppercase',
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        fontSize: 20,
        marginRight: 12,
    },
    rowTitle: {
        fontSize: 17,
        color: '#000000',
    },
    rowRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 17,
        color: '#8A8A8E',
        marginRight: 8,
    },
    chevron: {
        fontSize: 24,
        color: '#C6C6C8',
        lineHeight: 24,
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#E5E7EB',
    },
});