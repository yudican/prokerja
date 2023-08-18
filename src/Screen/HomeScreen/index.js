import React from 'react';
import {ActivityIndicator, FlatList, ScrollView, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import CourseCard from '../../Components/Card/CourseCard';
import MainLayout from '../../Components/Layout/MainLayout';
import OnPress from '../../Components/OnPress';
import Text from '../../Components/Text';
import {useGetCourseQuery} from '../../Config/Redux/Services/courseService';
import {useGetJobQuery} from '../../Config/Redux/Services/jobService';
import {PRIMARY_COLOR} from '../../Utils/contstans';
import {scaleFont, scaleHeight, scaleWidth} from '../../Utils/helpers';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {data: courseData, isLoading: courseLoading} = useGetCourseQuery();
  const {data: jobData, isLoading: jobLoading} = useGetJobQuery();

  const courseItems = courseLoading ? [] : courseData?.data || [];
  const jobItems = jobLoading ? [] : jobData?.data || [];
  return (
    <MainLayout>
      {/* profile item */}
      <ScrollView>
        <View
          style={{
            backgroundColor: '#fff',
            paddingVertical: scaleHeight(1),
            paddingHorizontal: scaleWidth(3),
            borderRadius: scaleHeight(1),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text color={PRIMARY_COLOR} fontSize={10}>
              Welcome to Prokerja
            </Text>
            <Text type="Bold" fontSize={14} color="#2f3640">
              have a nice day today!
            </Text>
          </View>
          <OnPress
            onPress={() => navigation.navigate('NotificationScreen')}
            style={{
              backgroundColor: '#dcdde1',
              padding: 4,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Ionicons
              name="notifications"
              size={scaleFont(20)}
              color={PRIMARY_COLOR}
            />
          </OnPress>
        </View>

        {/* COURSE */}
        <View style={{marginTop: scaleHeight(3)}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text color="#2f3542" type="Medium">
              Recommended Course
            </Text>
            {courseItems.length > 0 && (
              <OnPress>
                <Text
                  color={PRIMARY_COLOR}
                  fontSize={10}
                  onPress={() => navigation.navigate('CourseScreen')}>
                  See All
                </Text>
              </OnPress>
            )}
          </View>

          {/* Course Item */}
          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
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
                  onPress={() =>
                    navigation.navigate('CourseDetailScreen', item)
                  }
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
          </View>
        </View>

        <View style={{marginTop: scaleHeight(3)}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text color="#2f3542" type="Medium">
              Job Vacancy
            </Text>
            {jobItems.length > 0 && (
              <OnPress>
                <Text
                  color={PRIMARY_COLOR}
                  fontSize={10}
                  onPress={() => navigation.navigate('VacancyScreen')}>
                  See All
                </Text>
              </OnPress>
            )}
          </View>

          {/* Course Item */}
          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={jobItems.map(item => {
                return {
                  id: item.id,
                  title: item.job_name,
                  owner: item?.job_company_name,
                  image:
                    item.job_image ||
                    'https://i.ibb.co/C1pVmtG/marketing-strategy-planning-strategy-concept-1.png',
                };
              })}
              renderItem={({item, index}) => (
                <CourseCard
                  key={item.id}
                  item={item}
                  onPress={() =>
                    navigation.navigate('VacancyDetailScreen', item)
                  }
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
                  {jobLoading ? (
                    <ActivityIndicator color={PRIMARY_COLOR} />
                  ) : (
                    <Text fontSize={10}>Belum Ada Lowongan</Text>
                  )}
                </View>
              }
            />
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default HomeScreen;
