###### A time picker customizable library written in react-native with some good looking animation 😉.Easy to use and customize.Frame per second is almost 60 on ios and 48 on android. 
# React native time picker
> # Installation
> npm i rnative-picker
##
##

![Alt Text](https://media.giphy.com/media/CIrMUH4pMwNOTcvH3C/giphy.gif)



#Small Example 

```sh

import React, {useState} from 'react';
import {SafeAreaView,Button} from 'react-native';
import Picker from 'rnative-picker';


export default App = () => {

  const [showPicker, setShowPicker] = useState(false);

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button
          title="Show the Picker"
          color="#841584"
          onPress={()=>setShowPicker(true)}
        />
        
      <Picker 
         show={showPicker}                 
         onClose={(res)=>{                     // called on close the picker
             setShowPicker(false);             // Set showPicker to false (mandatory)
             console.log(res)}
             }  

         animationType="fade"                    
        #  cancelButtonStyle={{borderRadius : 2}}   // optional props
        #  cancelButtonTextStyle={{color : 'red'}}  
        #  pickerStyle={{height : '70%'}}      
        #  submitButtonStyle={{backgroundColor : 'red'}}
        # submitButtonTextStyle={{fontSize : 20}}      
       />

    </SafeAreaView>
  );
};


```

Props | Types
------------ | -------------
show | state (if true show the picker otherwise not) 
onClose | when picker closed, receives a callback with one parameter containing result. (mandatory  : change state value to false here to close the picker)
animationType  | value may be "fade" , "slide" ,"none"
cancelButtonStyle (optional)  | any valid style apply for view
cancelButtonTextStyle (optional)  | any valid style apply for view
pickerStyle (optional)  | any valid style apply on view
submitButtonStyle (optional)  | any valid style apply on view
submitButtonTextStyle (optional)  | any valid style apply on view







