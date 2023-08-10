import React from 'react';
import Text from '../Text';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import {scaleHeight} from '../../Utils/helpers';
import {PRIMARY_COLOR} from '../../Utils/contstans';

const Button = ({
  title = 'Button',
  backgroundColor = PRIMARY_COLOR,
  loading,
  disabled,
  onPress,
}) => {
  if (loading) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: scaleHeight(1.5),
          backgroundColor,
          borderRadius: scaleHeight(1),
          opacity: 0.5,
        }}>
        <ActivityIndicator color={'#fff'} />
      </View>
    );
  }

  if (disabled) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: scaleHeight(1.5),
          backgroundColor: '#a5b1c2',
          borderRadius: scaleHeight(1),
        }}>
        <Text fontSize={13} type="SemiBold" color="#576574">
          {title}
        </Text>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: scaleHeight(1.5),
          backgroundColor,
          borderRadius: scaleHeight(1),
        }}>
        <Text fontSize={13} type="SemiBold" color="#fff">
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
