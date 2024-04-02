import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Animated, {
  Extrapolate,
  Extrapolation,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated';
import data from './src/data/data';
import Pagination from './src/components/Pagination';
import CustomeButton from './src/components/CustomeButton';

const App = () => {

  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const flatListRef = useAnimatedRef(null);
  const x = useSharedValue(0);
  const FlatListIndex = useSharedValue(0);

  const onViewableItemsChanged = ({viewableItems}) => {
    FlatListIndex.value = viewableItems[0].index;
    console.log(viewableItems[0].index);
  }

  const onScroll = useAnimatedScrollHandler({
    onScroll : event => {
      x.value = event.contentOffset.x;
      
    }
  })

  const RenderItem = ({ item, index }) => {
    const imageAnimationStyle = useAnimatedStyle( () => {
      const opacityAnimation = interpolate (
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH
        ],
        [0,1,0],
        Extrapolate.CLAMP
        );
        const translateYAnimation = interpolate (
          x.value,
          [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          [100,0,10],
          Extrapolate.CLAMP
        )
        return {
          opacity : opacityAnimation,
          width : SCREEN_WIDTH * 0.8, 
          height : SCREEN_WIDTH * 0.8,
          transform: [{translateY : translateYAnimation}]
        }
    });

    const textAnimationStyle = useAnimatedStyle( () => {
      const opacityAnimation = interpolate (
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH
        ],
        [0,1,0],
        Extrapolate.CLAMP
        );
        const translateYAnimation = interpolate (
          x.value,
          [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          [100,0,10],
          Extrapolate.CLAMP
        )
        return {
          opacity : opacityAnimation,
        
          transform: [{translateY : translateYAnimation}]
        }
    });

    return (
      <View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
        <Animated.Image source={item.image} 
        style={imageAnimationStyle} />
        <Animated.View style={textAnimationStyle}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemText}>{item.text}</Text>
        </Animated.View>
      </View>
    )
  }

  return (
    <SafeAreaView 
    style={styles.container}>

      <Animated.FlatList 
       onScroll={onScroll}
      data={data}
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index} />
        }}
        keyExtractor={item => item.id}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
    
      />
      
      <View style={styles.bottomContainer}>
        <Pagination
          data={data}
          x={x}
          screenWidth={SCREEN_WIDTH}
        />
        <CustomeButton 
        flatListRef={flatListRef}
        FlatListIndex = {FlatListIndex}
        dataLength={data.length}
        />
      </View>

    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8E9B0',
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F8E9B0'
  },
  itemTitle: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,

  },
  itemText: {
    color: 'black',
    textAlign: 'center',
    lineHeight: 20,
    marginHorizontal: 35,
  }, 
  bottomContainer : {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginHorizontal:20,
    marginVertical:20,
  }
})