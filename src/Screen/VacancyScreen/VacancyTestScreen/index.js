import React, {useState} from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import OnPress from '../../../Components/OnPress';
import Text from '../../../Components/Text';
import {PRIMARY_COLOR} from '../../../Utils/contstans';
import {scaleHeight, scaleWidth} from '../../../Utils/helpers';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import {useApplyTestMutation} from '../../../Config/Redux/Services/jobService';

const VacancyTestScreen = ({navigation, route}) => {
  const item = route.params;
  const [form, setForm] = useState({photo: null});

  const [applyTest, {isLoading}] = useApplyTestMutation();

  const selectImageFromLibrary = () => {
    const options = {
      title: 'Pilih Hasil Test',
      mediaType: 'photo', // Change to 'video' if you want to pick videos
      quality: 1,
      maxWidth: 500,
      maxHeight: 500,
    };

    launchImageLibrary(options, response => {
      if (!response.didCancel && !response.error) {
        const file = response.assets[0];
        setForm(formData => ({
          ...formData,
          photo: {
            uri: file.uri,
            name: file.fileName,
            type: file.type,
          },
        }));
      }
    });
  };

  const handleApplyTest = () => {
    const formData = new FormData();

    formData.append('job_vacancy_id', item.job_vacancy_id);
    formData.append('job_vacancy_test_id', item.id);
    formData.append('test_file', form.photo);
    applyTest(formData).then(({error, data}) => {
      if (error) {
        return Toast.show({
          type: 'error',
          text1: 'Terjadi Kesalahan',
          text2:
            'Hasil Test Gagal Disimpan, silahkan ulangi beberapa saat lagi',
        });
      }

      Toast.show({
        type: 'success',
        text1: 'Berhasil',
        text2: 'Test Berhasil dikirim, silahkan lanjutkan untuk apply lowongan',
      });
      return navigation.goBack();
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1}}>
        <View style={{paddingTop: scaleHeight(2)}}>
          <Image
            source={{
              uri: item?.test_image,
            }}
            style={{
              height: scaleHeight(30),
              width: scaleWidth(50),
              alignSelf: 'center',
            }}
          />
          <View
            style={{
              marginHorizontal: scaleWidth(2),
              marginVertical: scaleHeight(1),
            }}>
            <Text color="#000" fontSize={12} type="SemiBold">
              {item?.test_name}
            </Text>
            <Text fontSize={10}>{item?.test_description}</Text>
          </View>
        </View>
        <OnPress
          onPress={() => selectImageFromLibrary()}
          style={{
            marginHorizontal: scaleWidth(2),
            borderWidth: 0.5,
            borderColor: '#eaeaea',
            paddingHorizontal: scaleWidth(3),
            paddingVertical: scaleHeight(2),
            backgroundColor: '#fff',
            borderRadius: scaleHeight(2),
            alignItems: 'center',
          }}>
          <Text
            type="SemiBold"
            style={{textAlign: 'center', marginBottom: scaleHeight(2)}}>
            Kirim Menggunakan Format Jpg. Maksimal 2MB
          </Text>
          {form.photo?.uri ? (
            <Image
              source={{
                uri: form.photo?.uri,
              }}
              style={{
                height: scaleHeight(30),
                width: scaleWidth(50),
                alignSelf: 'center',
              }}
            />
          ) : (
            <Octicons name={'file'} />
          )}
        </OnPress>
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          paddingHorizontal: scaleWidth(2),
          paddingVertical: scaleHeight(1),
          borderTopColor: '#f5f6fa',
          borderTopWidth: 1,
        }}>
        <OnPress
          onPress={() => {
            if (isLoading) {
              return null;
            }
            if (form.photo) {
              return handleApplyTest();
            }
            Toast.show({
              type: 'error',
              text1: 'Terjadi Kesalahan',
              text2: 'Silahkan Pilih Hasil Test Kamu.',
            });
          }}
          style={{
            backgroundColor: PRIMARY_COLOR,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: scaleHeight(1),
            paddingBottom: scaleHeight(0.5),
            borderRadius: scaleHeight(0.5),
          }}>
          {isLoading ? (
            <ActivityIndicator color={'#fff'} />
          ) : (
            <Text color="#fff">Apply</Text>
          )}
        </OnPress>
      </View>
    </View>
  );
};

export default VacancyTestScreen;
