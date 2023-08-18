import React from 'react';
import {ActivityIndicator, FlatList, ScrollView, View} from 'react-native';
import CourseCard from '../../Components/Card/CourseCard';
import MainLayout from '../../Components/Layout/MainLayout';
import Text from '../../Components/Text';
import {useGetJobQuery} from '../../Config/Redux/Services/jobService';
import {PRIMARY_COLOR} from '../../Utils/contstans';
import {scaleHeight, scaleWidth} from '../../Utils/helpers';

const VacancyScreen = ({navigation}) => {
  const {data: jobData, isLoading: jobLoading} = useGetJobQuery();
  const jobItems = jobLoading ? [] : jobData?.data || [];
  return (
    <MainLayout>
      {/* profile item */}
      <ScrollView>
        {/* Course Item */}

        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
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
              width={94}
              onPress={() => navigation.navigate('VacancyDetailScreen', item)}
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
      </ScrollView>
    </MainLayout>
  );
};

export default VacancyScreen;
