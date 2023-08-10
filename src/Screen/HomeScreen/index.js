import React from 'react';
import {FlatList, Image, ScrollView, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import MainLayout from '../../Components/Layout/MainLayout';
import Text from '../../Components/Text';
import {PRIMARY_COLOR} from '../../Utils/contstans';
import {scaleFont, scaleHeight, scaleWidth} from '../../Utils/helpers';
import CourseCard from '../../Components/Card/CourseCard';
import OnPress from '../../Components/OnPress';

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

const jobs = [
  {
    id: 1,
    title: 'Staff Admintrasi',
    owner: 'PT Mayapada Indonesia',
    image:
      'https://i.ibb.co/C1pVmtG/marketing-strategy-planning-strategy-concept-1.png',
  },
  {
    id: 2,
    title: 'Driver Mobile',
    owner: 'PT JTT Indonesia',
    image:
      'https://i.ibb.co/C1pVmtG/marketing-strategy-planning-strategy-concept-1.png',
  },
];

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.user);
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
            <OnPress>
              <Text
                color={PRIMARY_COLOR}
                fontSize={10}
                onPress={() => navigation.navigate('CourseScreen')}>
                See All
              </Text>
            </OnPress>
          </View>

          {/* Course Item */}
          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={courses}
              renderItem={({item, index}) => (
                <CourseCard
                  key={item.id}
                  item={item}
                  onPress={() =>
                    navigation.navigate('CourseDetailScreen', item)
                  }
                />
              )}
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
            <OnPress>
              <Text
                color={PRIMARY_COLOR}
                fontSize={10}
                onPress={() => navigation.navigate('VacancyScreen')}>
                See All
              </Text>
            </OnPress>
          </View>

          {/* Course Item */}
          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={jobs}
              renderItem={({item, index}) => (
                <CourseCard
                  key={item.id}
                  item={item}
                  onPress={() =>
                    navigation.navigate('VacancyDetailScreen', item)
                  }
                />
              )}
            />
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default HomeScreen;
