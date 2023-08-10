import React from 'react';
import {ScrollView, View} from 'react-native';
import Text from '../../Components/Text';
import {scaleHeight, scaleWidth} from '../../Utils/helpers';

const HistoryScreen = () => {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#f5f6fa',
        paddingHorizontal: scaleWidth(3),
      }}>
      <View style={{marginTop: scaleHeight(3)}}>
        <Text style={{textAlign: 'center'}} type="Bold">
          History Lamaran
        </Text>
        <View
          style={{
            marginTop: scaleHeight(2),
            backgroundColor: '#fff',
            paddingHorizontal: scaleWidth(3),
            paddingVertical: scaleHeight(1),
            borderRadius: scaleHeight(1),
          }}>
          <Text type={'SemiBold'}>Berhasil Mengirim Lamaran Kerja</Text>
          <Text fontSize={10}>03 Juni 2023 - 05:20</Text>
        </View>
        <View
          style={{
            marginTop: scaleHeight(2),
            backgroundColor: '#fff',
            paddingHorizontal: scaleWidth(3),
            paddingVertical: scaleHeight(1),
            borderRadius: scaleHeight(1),
          }}>
          <Text type={'SemiBold'}>Berhasil Mengirim Lamaran Kerja</Text>
          <Text fontSize={10}>03 Juni 2023 - 05:20</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default HistoryScreen;
