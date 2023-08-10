import React from 'react';
import {Image, View} from 'react-native';
import {scaleHeight, scaleWidth, truncateString} from '../../../Utils/helpers';
import Text from '../../Text';
import {PRIMARY_COLOR} from '../../../Utils/contstans';
import OnPress from '../../OnPress';

const CourseCard = ({item, width = 60, onPress, horizontal = false}) => {
  if (horizontal) {
    return (
      <OnPress
        style={{flexDirection: 'row', marginTop: scaleHeight(1)}}
        onPress={onPress}>
        <Image
          source={{uri: item.image}}
          style={{height: scaleHeight(7), width: scaleWidth(20)}}
          resizeMode={'cover'}
        />
        <View style={{marginLeft: scaleWidth(2)}}>
          <Text type="SemiBold">Welcome to the Photoshop Course </Text>
          <Text fontSize={10}>{item.owner}</Text>
        </View>
      </OnPress>
    );
  }
  return (
    <OnPress
      onPress={onPress}
      style={{
        width: scaleWidth(width),
        backgroundColor: PRIMARY_COLOR,
        borderRadius: scaleHeight(2),
        marginRight: scaleWidth(1),
        marginTop: scaleHeight(2),
      }}>
      <Image
        source={{
          uri: item.image,
        }}
        style={{height: scaleHeight(20), borderRadius: scaleHeight(2)}}
      />
      <View
        style={{
          marginHorizontal: scaleWidth(2),
          marginVertical: scaleHeight(1),
        }}>
        <Text color="#fff" fontSize={10} type="SemiBold">
          {truncateString(item.title, 70)}
        </Text>
        <Text color="#fff" fontSize={10}>
          {item.owner}
        </Text>
      </View>
    </OnPress>
  );
};

export default CourseCard;
