import { Dimensions, FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native'
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
      <View style={[styles.card]}>
        <ImageBackground
          source={item.url}
          style={{ width: '100%', height: '100%' }}
          imageStyle={styles.imageLayer}
          resizeMode="cover"
        >
          <View style={styles.textWrapper}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.subtitleText}>{item.subTitle}</Text>
          </View>
        </ImageBackground>
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
    height: 225,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemContainer: {
    width: width, // Must equal screen width for pagingEnabled to work perfectly
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '95%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20
  },

  imageLayer: {
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
  },
  activeDot: {
    backgroundColor: '#333',
    width: 24,
  },
  inactiveDot: {
    backgroundColor: '#D3D3D3',
    width: 10,
  },

  textWrapper: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 12,
    borderTopLeftRadius : 20,
    borderTopRightRadius: 20
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitleText: {
    color: '#F3F4F6',
    fontSize: 16,
    textAlign: 'center',
  }
});