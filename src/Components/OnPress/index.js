import React from 'react';
import {TouchableOpacity} from 'react-native';

const OnPress = ({children, onPress, style}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress} activeOpacity={0.5}>
      {children}
    </TouchableOpacity>
  );
};

export default OnPress;
