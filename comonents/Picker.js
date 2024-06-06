import React, {useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Text,
  Animated,
} from 'react-native';
import List from './List';


const ITEM_HEIGHT = 40;
const ITEM_WIDTH = 40;

const TimePicker = ({show, pickerTextStyle, onClose,animationType,...props}) => {


  let hourScrollY = useRef(new Animated.Value(0)).current;
  let minuteScrollY = useRef(new Animated.Value(0)).current;
  let clockScrollY = useRef(new Animated.Value(0)).current;
  if(!show)hourScrollY.setValue(0);

  const hour = [...new Array(13).keys()].slice(1).map(item => {
    return item <= 9 ? String(`0${item}`) : String(item);
  });
  const minute = [...new Array(60).keys()].map(item => {
    return item <= 9 ? String(`0${item}`) : String(item);
  });
  const clock = ['AM', 'PM'];

  let hourValue = hour[0];
  let minuteValue = minute[0];
  let clockValue = clock[0];

 

  useEffect(() => {

    if(!show){
      hourScrollY.setValue(0);
      minuteScrollY.setValue(0);
      clockScrollY.setValue(0);
      hourScrollY.removeAllListeners();
      minuteScrollY.removeAllListeners();
      clockScrollY.removeAllListeners();
    }

    hourScrollY.addListener(animation => {
      const hourIndex = Math.floor(animation.value / ITEM_HEIGHT);
      hourValue = hour[hourIndex >= 0 && hourIndex <= 12 ? hourIndex : 0];
    });

    minuteScrollY.addListener(animation => {
      const minuteIndex = Math.floor(animation.value / ITEM_HEIGHT);
      minuteValue =
        minute[minuteIndex >= 0 && minuteIndex <= 59 ? minuteIndex : 0];
    });

    clockScrollY.addListener(animation => {
      const clockIndex = Math.floor(animation.value / ITEM_HEIGHT);
      clockValue = clock[clockIndex >= 0 && clockIndex <= 1 ? clockIndex : 0];
    });
  }, [show]);


  const closePicker = () => {
    onClose([hourValue, minuteValue, clockValue]);
  };

  if(!show)return null;

  return (
    <View style={[styles.root,{position:'relative', width:'100%'}]}>
      <View animationType={animationType} transparent={true} visible={show} >
        <View style={[styles.root, {padding:0,}]}>
          <View style={[styles.timePicker,props.pickerStyle]}>
            <View style={styles.indicator} pointerEvents="none" />
            <List pickerTextStyle={pickerTextStyle}  data={hour} scrollY={hourScrollY} type="hour"/>
            <List pickerTextStyle={pickerTextStyle} data={minute} scrollY={minuteScrollY} type="minute"/>
            <List pickerTextStyle={pickerTextStyle} data={clock} scrollY={clockScrollY} type="clock"/>
            
          </View>
          <TouchableOpacity onPress={closePicker} style={[styles.cancelButton,props?.cancelButtonStyle]}>
            <Text style={[styles.cancelButtonText,props?.cancelButtonTextStyle]}>Set</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    
  },
  timePicker: {
    height: '35%',
    
    width: '80%',
    backgroundColor: 'rgba(245, 247, 250,1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cancelButton: {
    width: '80%',
    height: 50,
    bottom:265,
    backgroundColor: 'rgba(0, 86, 247,0.1)',
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  cancelButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'rgba(13, 110, 255,0.9)',
  },
  listTextView: {
    height: ITEM_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listText: {
    fontSize: 22,
    fontWeight: '400',
  },
  indicator: {
    height: 40,
    width: '100%',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    backgroundColor:  "#E68234",
   
    position: 'absolute',
    zIndex: 5,
    elevation: 5,
    opacity: 0.5,
  },
});

export default Picker = React.memo(TimePicker);
