import React ,{useCallback}from 'react';
import {StyleSheet, Animated} from 'react-native';
import ListItem from './ListItem';

const ITEM_HEIGHT = 40;
const ITEM_WIDTH = 40;
const SPACING = 15;

const PickerList = ({data, scrollY, type, pickerTextStyle}) => {
    
    const renderItem=useCallback(
        ({item,index})=>{
            const inputRange = [
                (index - 2) * ITEM_HEIGHT,
                (index - 1) * ITEM_HEIGHT,
                index * ITEM_HEIGHT,
                (index + 1) * ITEM_HEIGHT,
                (index + 2) * ITEM_HEIGHT,
              ];
              const scaleInterpolator = scrollY.interpolate({
                inputRange,
                outputRange:
                  type === 'clock'
                    ? [0.8, 0.9, 1.4, 0.9, 0.8]
                    : [0.8, 1.1, 1.7, 1.1, 0.8],
              });
      
              const opacityInterpolator = scrollY.interpolate({
                inputRange,
                outputRange: [0.3, 0.6, 1, 0.6, 0.3],
              });
              return (
                <ListItem
                  item={item}
                  scaleInterpolator={scaleInterpolator}
                  opacityInterpolator={opacityInterpolator}
                  pickerTextStyle={pickerTextStyle}
                />
              );
        }
        ,[]);

    const keyExtractor=(item)=>{
        return String(item);
    }
  return (
    <Animated.FlatList
      initialNumToRender={5}
      maxToRenderPerBatch={6}
      windowSize={6}
      getItemLayout={(_, index) => {
        return {
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        };
      }}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                y: scrollY,
              },
            },
          },
        ],
        {useNativeDriver: true},
      )}
      scrollEventThrottle={16}
      data={data}
      keyExtractor={keyExtractor}
      style={{
        height: 5 * ITEM_HEIGHT,
        flexGrow: 0,
        width: ITEM_WIDTH + 2 * SPACING,
        
      }}
      contentContainerStyle={{
        paddingTop: 2 * ITEM_HEIGHT,
        paddingBottom: 2 * ITEM_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      showsVerticalScrollIndicator={false}
      snapToInterval={ITEM_HEIGHT}
      decelerationRate={0}
      snapToAlignment="center"
      renderItem={renderItem}
    />
  );
};

export default List=React.memo(PickerList);
