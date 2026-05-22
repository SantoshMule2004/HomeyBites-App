import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useAppTheme } from '../stores/useAppTheme';
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get('window');

const CustomCarousel = ({ data }) => {
  const colorScheme = useAppTheme()
  const theme = Colors[colorScheme] ?? Colors.light

  const [activeIndex, setActiveIndex] = useState(0);

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={[styles.card, { backgroundColor: item.color }]}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
        />
      </View>

      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : styles.inactiveDot,
              activeIndex === index ? { backgroundColor: theme.iconColor } : { backgroundColor: theme.uiBackground }]}
          />
        ))}
      </View>
    </View>
  )
}

export default CustomCarousel

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#F7F9FC',
    // justifyContent: 'center',
  },
  carouselContainer: {
    height: 200, // Fixed height for the carousel area
  },
  itemContainer: {
    width: width, // Must equal screen width for pagingEnabled to work perfectly
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '90%', // Creates a nice margin on the sides of the card
    height: 175,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    // Elevation for Android
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 10,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
    // transition: 'all 0.3s ease-in-out',
  },
  activeDot: {
    backgroundColor: '#333',
    width: 24, // Wider dot for the active state (modern look)
  },
  inactiveDot: {
    backgroundColor: '#D3D3D3',
    width: 10,
  },
});