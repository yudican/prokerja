import React from 'react';
import {FlatList, Image, ScrollView, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import MainLayout from '../../Components/Layout/MainLayout';
import Text from '../../Components/Text';
import {PRIMARY_COLOR} from '../../Utils/contstans';
import {scaleFont, scaleHeight, scaleWidth} from '../../Utils/helpers';
import CourseCard from '../../Components/Card/CourseCard';

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
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.user);
  return (
    <MainLayout>
      {/* profile item */}
      <ScrollView>
        {/* Course Item */}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={courses}
          renderItem={({item, index}) => (
            <CourseCard
              key={item.id}
              item={item}
              width={94}
              onPress={() => navigation.navigate('CourseDetailScreen', item)}
            />
          )}
        />
      </ScrollView>
    </MainLayout>
  );
};

export default CourseScreen;
