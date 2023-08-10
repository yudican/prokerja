import React from 'react';
import {FlatList, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CourseCard from '../../Components/Card/CourseCard';
import MainLayout from '../../Components/Layout/MainLayout';

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

const VacancyScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.user);
  return (
    <MainLayout>
      {/* profile item */}
      <ScrollView>
        {/* Course Item */}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={jobs}
          renderItem={({item, index}) => (
            <CourseCard
              key={item.id}
              item={item}
              width={94}
              onPress={() => navigation.navigate('VacancyDetailScreen', item)}
            />
          )}
        />
      </ScrollView>
    </MainLayout>
  );
};

export default VacancyScreen;
