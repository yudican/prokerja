import React from 'react';
import {ActivityIndicator, FlatList, ScrollView, View} from 'react-native';
import CourseCard from '../../Components/Card/CourseCard';
import MainLayout from '../../Components/Layout/MainLayout';
import {useGetCourseQuery} from '../../Config/Redux/Services/courseService';
import Text from '../../Components/Text';
import {scaleHeight, scaleWidth} from '../../Utils/helpers';

const courses = [
  {
    id: 1,
    title: 'Adobe Photoshop CC: A Beginner to Advanced Photoshop Course',
    owner: 'Putri Aulia',
    image:
      'https://i.ibb.co/C1pVmtG/marketing-strategy-planning-strategy-concept-1.png',
  },
  {
    id: 2,
    title: 'Adobe Photoshop CC: A Beginner to Advanced Photoshop Course',
    owner: 'Handoko',
    image:
      'https://i.ibb.co/C1pVmtG/marketing-strategy-planning-strategy-concept-1.png',
  },
];

const CourseScreen = ({navigation}) => {
  const {data: courseData, isLoading: courseLoading} = useGetCourseQuery();
  const courseItems = courseLoading ? [] : courseData?.data || [];
  return (
    <MainLayout>
      {/* profile item */}
      <ScrollView>
        {/* Course Item */}

        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={courseItems.map(item => {
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
            <CourseCard
              key={item.id}
              item={item}
              width={94}
              onPress={() => navigation.navigate('CourseDetailScreen', item)}
            />
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
    </MainLayout>
  );
};

export default CourseScreen;
