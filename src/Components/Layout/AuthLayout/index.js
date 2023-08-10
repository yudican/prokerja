import React from 'react';
import {Text, View} from 'react-native';
import {scaleHeight, scaleWidth} from '../../../Utils/helpers';

const AuthLayout = ({children}) => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: scaleWidth(3),
        paddingVertical: scaleHeight(3),
        backgroundColor: '#fff',
      }}>
      {children}
    </View>
  );
};

export default AuthLayout;
