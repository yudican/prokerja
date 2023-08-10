import React from 'react';
import MainLayout from '../../../Components/Layout/MainLayout';
import {Image, ScrollView, View} from 'react-native';
import {scaleHeight, scaleWidth} from '../../../Utils/helpers';
import Text from '../../../Components/Text';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OnPress from '../../../Components/OnPress';

const CourseDetailScreen = ({navigation, route}) => {
  const item = route.params;
  return (
    <View style={{flex: 1}}>
      <View>
        <OnPress
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            top: scaleHeight(2),
            left: scaleWidth(2),
            zIndex: 99,
            backgroundColor: '#fff',
            paddingHorizontal: scaleWidth(1.2),
            borderRadius: scaleWidth(1),
            paddingVertical: 2,
          }}>
          <Ionicons name="chevron-back-sharp" color={'#000'} />
        </OnPress>
        <Image source={{uri: item.image}} style={{height: scaleHeight(30)}} />
        <View
          style={{
            marginHorizontal: scaleWidth(2),
            marginVertical: scaleHeight(1),
            borderBottomColor: '#aeaeaa',
            borderBottomWidth: 0.5,
            paddingBottom: scaleHeight(1),
          }}>
          <Text color="#000" fontSize={12} type="SemiBold">
            {item.title}
          </Text>
          <Text fontSize={10}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
            soluta rerum exercitationem eius aut atque repellat tenetur ipsum
            illum rem temporibus, voluptatem explicabo voluptas architecto
            veniam doloremque cupiditate quis blanditiis.
          </Text>
          <Text color="#000" fontSize={10} type="Medium">
            Created By {item.owner}
          </Text>
        </View>
        <Text
          color="#000"
          fontSize={12}
          style={{marginHorizontal: scaleWidth(2)}}
          type="Bold">
          Other Course
        </Text>
      </View>
      <ScrollView
        style={{
          flex: 1,
          marginHorizontal: scaleWidth(2),
          marginTop: scaleHeight(1),
        }}>
        <View style={{flexDirection: 'row', marginTop: scaleHeight(2)}}>
          <Image
            source={{uri: item.image}}
            style={{
              height: scaleHeight(7),
              width: scaleWidth(20),
              borderRadius: scaleHeight(1),
            }}
            resizeMode={'cover'}
          />
          <View style={{marginLeft: scaleWidth(2)}}>
            <Text type="SemiBold">Welcome to the Photoshop Course </Text>
            <Text fontSize={10}>{item.owner}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CourseDetailScreen;
