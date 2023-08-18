import React from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import Text from '../../Components/Text';
import {useApplyHistoryQuery} from '../../Config/Redux/Services/jobService';
import {PRIMARY_COLOR} from '../../Utils/contstans';
import {getDateTime, scaleHeight, scaleWidth} from '../../Utils/helpers';

const HistoryScreen = () => {
  const {data, isLoading} = useApplyHistoryQuery();

  const historiItems = data?.data || [];

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator color={PRIMARY_COLOR} />
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#f5f6fa',
        paddingHorizontal: scaleWidth(3),
      }}>
      <View style={{marginTop: scaleHeight(2)}}>
        <Text style={{textAlign: 'center'}} type="Bold">
          History Lamaran
        </Text>
        {historiItems.map(item => (
          <View
            key={item.id}
            style={{
              marginTop: scaleHeight(2),
              backgroundColor: '#fff',
              paddingHorizontal: scaleWidth(3),
              paddingVertical: scaleHeight(1),
              borderRadius: scaleHeight(1),
            }}>
            <Text type={'SemiBold'}>Berhasil Mengirim Lamaran Kerja</Text>
            <Text fontSize={10}>{getDateTime(item.created_at)}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default HistoryScreen;
