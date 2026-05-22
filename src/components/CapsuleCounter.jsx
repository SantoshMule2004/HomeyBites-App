import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useAppTheme } from '../stores/useAppTheme';
import { Colors } from '../constants/Colors';

const CapsuleCounter = ({
  initialValue = 0,
  minValue = 0,
  maxValue = 10,
  onValueChange
}) => {
  const colorScheme = useAppTheme()
  const theme = Colors[colorScheme] ?? Colors.light

  const [count, setCount] = useState(initialValue);

  const handleIncrement = () => {
    if (count < maxValue) {
      const newCount = count + 1;
      setCount(newCount);
      if (onValueChange) onValueChange(newCount);
    }
  };

  const handleDecrement = () => {
    if (count > minValue) {
      const newCount = count - 1;
      setCount(newCount);
      if (onValueChange) onValueChange(newCount);
    }
  };

  const isMin = count <= minValue;
  const isMax = count >= maxValue;

  return (
    <View style={[styles.capsuleContainer, { backgroundColor: theme.uiBackground }]}>

      {/* Decrement Button (-) */}
      <Pressable
        onPress={handleDecrement}
        disabled={isMin}
        style={({ pressed }) => [
          styles.actionButton, { backgroundColor: theme.background },
          isMin && [styles.disabledButton, { backgroundColor: theme.iconColor }], // Apply greyed-out style if at minimum
          pressed && [styles.buttonPressed, { backgroundColor: theme.uiBackground }] // Subtle shrink effect on press
        ]}
      >
        <Text style={[styles.buttonText, { color: theme.text }, isMin && styles.disabledText]}>−</Text>
      </Pressable>

      {/* The Count Display */}
      <View style={styles.countContainer}>
        <Text style={[styles.countText, {color: theme.text}]}>{count}</Text>
      </View>

      {/* Increment Button (+) */}
      <Pressable
        onPress={handleIncrement}
        disabled={isMax}
        style={({ pressed }) => [
          styles.actionButton, { backgroundColor: theme.background },
          isMax && [styles.disabledButton, { backgroundColor: theme.iconColor }],
          pressed && [styles.buttonPressed, { backgroundColor: theme.uiBackground }]
        ]}
      >
        <Text style={[styles.buttonText, { color: theme.text }, isMax && styles.disabledText]}>+</Text>
      </Pressable>

    </View>
  );
};

const styles = StyleSheet.create({
  capsuleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,           // This creates the "Capsule/Pill" shape
    padding: 4,                 // Inner padding so buttons don't touch the edge
    alignSelf: 'flex-start',    // Prevents the capsule from stretching to full screen width
  },
  actionButton: {
    width: 25,
    height: 25,
    borderRadius: 18,           // Perfectly circular buttons inside the capsule
    justifyContent: 'center',
    alignItems: 'center',
    // Subtle drop shadow to make the buttons pop out of the capsule
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3, // For Android shadow
  },
  buttonPressed: {
    transform: [{ scale: 0.9 }], // Gives a nice "squish" feel when tapped
  },
  disabledButton: {
    elevation: 0, // Remove shadow when disabled
    shadowOpacity: 0,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 22,
  },
  disabledText: {
    color: '#C7C7CC',
  },
  countContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default CapsuleCounter;