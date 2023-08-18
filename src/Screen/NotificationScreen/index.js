import React from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import Text from '../../Components/Text';
import {useNotificationsQuery} from '../../Config/Redux/Services/profileService';
import {getDateTime, scaleHeight, scaleWidth} from '../../Utils/helpers';
import {PRIMARY_COLOR} from '../../Utils/contstans';

const NotificationScreen = () => {
  const {data, isLoading} = useNotificationsQuery();

  const notificationItems = data?.data || [];

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
      <View>
        {notificationItems.map(item => (
          <View
            key={item.id}
            style={{
              marginTop: scaleHeight(2),
              backgroundColor: '#fff',
              paddingHorizontal: scaleWidth(3),
              paddingVertical: scaleHeight(1),
              borderRadius: scaleHeight(1),
            }}>
            <Text type={'SemiBold'}>{item.name}</Text>
            <Text fontSize={10}>{item.description}</Text>
            <Text fontSize={10}>{getDateTime(item?.created_at)}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default NotificationScreen;
