import React from 'react';
import {Animated,Text,StyleSheet} from 'react-native';

const ITEM_HEIGHT = 40;
const ITEM_WIDTH = 40;
const Item=({item,scaleInterpolator,opacityInterpolator})=>{
    return (
            <Animated.View
                style={[
                styles.listTextView,{
                    transform: [{scale: scaleInterpolator}],
                    opacity: opacityInterpolator,
                },
                ]}>
                <Text style={[styles.listText]}>{item}</Text>
            </Animated.View>
    )
}
const styles=StyleSheet.create({
    listTextView: {
        height: ITEM_HEIGHT,
        width: ITEM_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
      },
      listText: {
        fontSize: 22,
        fontWeight: '400',
      },
})

export default ListItem=React.memo(Item)
