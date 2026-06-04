import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../constants/Colors';
import { useAppTheme } from '../stores/useAppTheme';

import React from 'react'
import ThemedText from './ThemedText';

const CustomRadioButton = ({ options, selectedValue, onSelect }) => {
  if (!options || options.length === 0) return null;

  const colorScheme = useAppTheme()
  const theme = Colors[colorScheme] ?? Colors.light

  return (
    <>
      <ThemedText style={{ fontSize: 12, fontWeight: '500' }}>Address Type</ThemedText>
      <View style={styles.container}>

        {options.map((option) => {
          const isSelected = selectedValue === option.value;

          return (
            <TouchableOpacity
              key={option.value}
              style={styles.radioContainer}
              onPress={() => onSelect(option.value)}
              activeOpacity={0.8}
            >
              <View style={[styles.outerCircle, isSelected && { borderColor: Colors.primary }]}>
                {isSelected && <View style={[styles.innerCircle, { backgroundColor: Colors.primary }]} />}
              </View>
              <Text style={theme.text}>{option.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
}

export default CustomRadioButton

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 5,
    gap: 15
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#777',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  innerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },
});