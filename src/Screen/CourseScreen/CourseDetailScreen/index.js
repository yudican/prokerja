import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import YoutubePlayer from 'react-native-youtube-iframe';
import OnPress from '../../../Components/OnPress';
import Text from '../../../Components/Text';
import {
  useGetCourseDetailQuery,
  useGetCourseQuery,
} from '../../../Config/Redux/Services/courseService';
import {PRIMARY_COLOR} from '../../../Utils/contstans';
import {
  getVideoIdFromUrl,
  scaleHeight,
  scaleWidth,
} from '../../../Utils/helpers';

const CourseDetailScreen = ({navigation, route}) => {
  const item = route.params;
  const [playing, setPlaying] = useState(false);

  const {data: courseData, isLoading: courseLoading} = useGetCourseQuery();
  const {data: courseDetailData, isLoading: courseDetailLoading} =
    useGetCourseDetailQuery(item.id);
  const courseItems = courseLoading ? [] : courseData?.data || [];
  const course = courseDetailLoading ? null : courseDetailData?.data || null;

  if (courseLoading) {
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
        <YoutubePlayer
          height={scaleHeight(30)}
          play={playing}
          videoId={getVideoIdFromUrl(course?.course_url || '') || 'YRn25jiJ1_c'}
        />
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
          <Text fontSize={10}>{course?.course_description}</Text>
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
        <FlatList
          scrollEnabled={false}
          data={courseItems
            .filter(row => row.id !== item.id)
            .map(item => {
              return {
                id: item.id,
                title: item.course_name,
                owner: item?.course_owner,
                image:
                  item.course_image ||
                  'https://i.ibb.co/C1pVmtG/marketing-strategy-planning-strategy-concept-1.png',
              };
            })}
          renderItem={({item, index}) => (
            <View
              style={{flexDirection: 'row', marginTop: scaleHeight(2)}}
              key={item.id}>
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
                <Text type="SemiBold">{item.title}</Text>
                <Text fontSize={10}>{item.owner}</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View
              style={{
                height: scaleHeight(10),
                width: scaleWidth(94),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderRadius: scaleHeight(1),
                marginTop: scaleHeight(1),
              }}>
              {courseLoading ? (
                <ActivityIndicator color={PRIMARY_COLOR} />
              ) : (
                <Text fontSize={10}>Belum Ada Course</Text>
              )}
            </View>
          }
        />
      </ScrollView>
    </View>
  );
};

export default CourseDetailScreen;
