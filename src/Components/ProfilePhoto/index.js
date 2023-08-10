import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RenderIf} from '../../Utils/helpers';
import {PRIMARY_COLOR} from '../../Utils/contstans';

const Photo = ({
  url = null,
  size = 48,
  style,
  resizeMode = FastImage.resizeMode.cover,
  backgroundColor,
  rounded = true,
  width,
  height,
  borderWidth = 0.15,
  changeable = false,
  onPress,
}) => {
  // const dispatch = useDispatch();
  // const [updateProfilePhoto] = useUpdateProfilePhotoMutation();
  // default profile image
  let profile = require('../../assets/Image/AvatarOutline.png');

  // url check
  if (url) {
    profile = {
      uri: url,
      // headers: {Authorization: 'someAuthToken'},
      priority: FastImage.priority.high,
    };
  }

  // size check or using a default width height property
  const ImgSize = () => {
    if (size) {
      return {
        borderWidth: 1,
        borderColor: '#f5f6fa',
        width: size,
        height: size,
        borderRadius: size / 2,
        ...style,
      };
    } else {
      return {
        borderWidth: 1,
        borderColor: '#f5f6fa',
        width: width,
        height: height,
        ...style,
      };
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        onPress();
      }}>
      <FastImage style={ImgSize()} source={profile} resizeMode={resizeMode} />
      <RenderIf isTrue={changeable}>
        <View
          style={{
            position: 'absolute',
            width: 20,
            height: 20,
            borderRadius: 10,
            bottom: 0,
            right: 5,
            backgroundColor: '#f5f6fa',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AntDesign name="camera" color={'#000'} />
        </View>
      </RenderIf>
    </TouchableOpacity>
  );
};

export default Photo;
