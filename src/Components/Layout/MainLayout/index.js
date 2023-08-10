import React from 'react';
import {Platform, StatusBar, View} from 'react-native';
import {scaleHeight, scaleWidth} from '../../../Utils/helpers';

const MainLayout = ({children}) => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: scaleWidth(3),
        backgroundColor: '#f5f6fa',
        paddingTop:
          Platform.OS === 'ios'
            ? scaleHeight(6) + StatusBar.currentHeight
            : scaleHeight(2),
      }}>
      {children}
    </View>
  );
};

export default MainLayout;
