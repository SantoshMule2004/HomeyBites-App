import { FlatList, Pressable, StyleSheet, View } from 'react-native'
import { useAppTheme } from '../stores/useAppTheme';
import { Colors } from '../constants/Colors';

import React from 'react'
import ThemedText from './ThemedText';
import ThemedCard from './ThemedCard';
import Spacer from './Spacer';

const CustomAddress = ({ data, onEditPressed, onRemovedPressed, refreshControl = {} }) => {
  const colorScheme = useAppTheme()
  const theme = Colors[colorScheme] ?? Colors.light

  const renderItem = ({ item }) => {
    return (
      <ThemedCard style={styles.addressContainer}>
        <ThemedText style={{ fontWeight: 'bold' }}>{item.addressName || item.addressType}</ThemedText>
        <ThemedText style={{ fontWeight: 'bold' }}>{item.receiverName}</ThemedText>
        <ThemedText>{item.addressLine}, {item.area}</ThemedText>
        <ThemedText>Phone Number: {item.receiverContactNo}</ThemedText>

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
          <Pressable style={({ pressed }) => [
            styles.btn, { borderColor: theme.navBackground },
            pressed && [styles.buttonPressed, { backgroundColor: theme.navBackground }]
          ]} onPress={() => onEditPressed(item.addId)}>
            <ThemedText style={{ paddingHorizontal: 5 }}>edit</ThemedText>
          </Pressable>
          <Pressable style={({ pressed }) => [
            styles.btn, { borderColor: theme.navBackground },
            pressed && [styles.buttonPressed, { backgroundColor: theme.navBackground }]
          ]} onPress={() => onRemovedPressed(item.addId)}>
            <ThemedText style={{ paddingHorizontal: 5 }}>remove</ThemedText>
          </Pressable>
        </View>
      </ThemedCard>
    );
  }

  const EmptyMenu = () => {
    return <View style={[{ alignItems: 'center', justifyContent: 'center', padding: 20 }]}>
      <ThemedText style={{ fontWeight: '300', fontSize: 15 }}>No address found</ThemedText>
    </View>
  }


  return (
    <FlatList data={data}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={EmptyMenu}
      ItemSeparatorComponent={<Spacer height={5} />}
      refreshControl={refreshControl} />
  )
}

export default CustomAddress

const styles = StyleSheet.create({
  addressContainer: {
    marginTop: 5, marginHorizontal: 10, borderRadius: 10, elevation: 5,
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