import React from 'react';
import {Text as TextOri} from 'react-native';
import {scaleFont} from '../../Utils/helpers';

const Text = ({
  children,
  type = 'Regular',
  fontSize = 12,
  color = '#000',
  style,
  onPress,
}) => {
  return (
    <TextOri
      onPress={onPress}
      style={[
        {
          fontSize: scaleFont(fontSize),
          fontFamily: `Poppins-${type}`,
          color,
        },
        style,
      ]}>
      {children}
    </TextOri>
  );
};

export default Text;
