import React from 'react';
import {scaleHeight, scaleWidth} from '../../Utils/helpers';
import {TouchableOpacity, View} from 'react-native';
import Text from '../Text';

const MenuList = ({
  title,
  rightContent,
  onPress,
  activeOpacity = 0.8,
  style,
  divider,
  leftContent,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={activeOpacity}
      style={{
        width: '100%',
        backgroundColor: 'white',
        borderBottomWidth: divider ? 0.5 : null,
        borderBottomColor: '#718093',
        height: scaleHeight(8),
        paddingHorizontal: scaleWidth(6),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...style,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {leftContent}
        <Text style={{marginLeft: scaleWidth(3)}} color={'#000'}>
          {title}
        </Text>
      </View>
      {rightContent}
    </TouchableOpacity>
  );
};

export default MenuList;
