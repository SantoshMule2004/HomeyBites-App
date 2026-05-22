import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ThemedText from './ThemedText';
import ThemedCard from './ThemedCard';
import { useAppTheme } from '../stores/useAppTheme';
import { Colors } from '../constants/Colors';

const CustomAddress = ({ data, onEditPressed, onRemovedPressed }) => {
  const colorScheme = useAppTheme()
  const theme = Colors[colorScheme] ?? Colors.light

  const renderItem = ({ item }) => {
    return (
      <ThemedCard style={styles.addressContainer}>
        <ThemedText style={{ fontWeight: 'bold' }}>{item.name}</ThemedText>
        <ThemedText>{item.apartment}, {item.street}</ThemedText>
        <ThemedText>{item.city}, {item.state}</ThemedText>
        <ThemedText>India</ThemedText>
        <ThemedText>Phone Number: {item.phoneNo}</ThemedText>

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
          <Pressable style={({ pressed }) => [
            styles.btn, { borderColor: theme.navBackground },
            pressed && [styles.buttonPressed, { backgroundColor: theme.navBackground }]
          ]} onPress={() => onEditPressed(item.name)}>
            <ThemedText style={{ paddingHorizontal: 5 }}>edit</ThemedText>
          </Pressable>
          <Pressable style={({ pressed }) => [
            styles.btn, { borderColor: theme.navBackground },
            pressed && [styles.buttonPressed, { backgroundColor: theme.navBackground }]
          ]} onPress={() => onRemovedPressed(item.name)}>
            <ThemedText style={{ paddingHorizontal: 5 }}>remove</ThemedText>
          </Pressable>
        </View>
      </ThemedCard>
    );
  };
  return (
    <FlatList data={data}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false} />
  )
}

export default CustomAddress

const styles = StyleSheet.create({
  addressContainer: {
    marginTop: 5, marginHorizontal: 10, borderRadius: 10, elevation: 5
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    padding: 4,
    alignSelf: 'flex-start',
    borderWidth: 0.5
  },
  buttonPressed: {
    transform: [{ scale: 0.9 }]
  },
})