import React, {useState} from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import OnPress from '../../../Components/OnPress';
import Text from '../../../Components/Text';
import {
  useApplyMutation,
  useGetJobDetailQuery,
} from '../../../Config/Redux/Services/jobService';
import {PRIMARY_COLOR} from '../../../Utils/contstans';
import {scaleHeight, scaleWidth, truncateString} from '../../../Utils/helpers';

const VacancyDetailScreen = ({navigation, route}) => {
  const item = route.params;
  const [form, setForm] = useState({biodata: null, cv: null, lamaran: null});
  const [showModalTest, setShowModaltest] = useState(false);
  const [showModalApply, setShowModalApply] = useState(false);

  const {data: jobDetailData, isLoading: jobDetailLoading} =
    useGetJobDetailQuery(item.id);
  const [apply, {isLoading}] = useApplyMutation();

  const job = jobDetailLoading ? null : jobDetailData?.data || null;

  if (jobDetailLoading) {
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

  const selectImageFromLibrary = (field, title) => {
    const options = {
      title,
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
          [field]: {
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

    formData.append('job_vacancy_id', item.id);
    formData.append('biodata_file', form.biodata);
    formData.append('cv_file', form.cv);
    formData.append('surat_lamaran_file', form.lamaran);
    apply(formData).then(({error, data}) => {
      if (error) {
        return Toast.show({
          type: 'error',
          text1: 'Terjadi Kesalahan',
          text2: 'File Gagal Disimpan, silahkan ulangi beberapa saat lagi',
        });
      }

      Toast.show({
        type: 'success',
        text1: 'Berhasil',
        text2: 'File Berhasil dikirim, silahkan lanjutkan untuk apply lowongan',
      });
      return navigation.navigate('HomeScreen', {screen: 'HistoryScreen'});
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
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
            }}>
            <Text color="#000" fontSize={12} type="SemiBold">
              {item.title}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: scaleHeight(1),
              }}>
              <Text color="#000" fontSize={10} type="Medium">
                {item.owner}
              </Text>
              <Text color="#000" fontSize={10} type="Medium">
                {job?.job_location}
              </Text>
            </View>
            <Text fontSize={10}>{job?.job_description}</Text>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: scaleWidth(2),
            borderWidth: 0.5,
            borderColor: '#eaeaea',
            paddingHorizontal: scaleWidth(3),
            paddingVertical: scaleHeight(2),
            backgroundColor: '#fff',
            borderRadius: scaleHeight(2),
          }}>
          <Text
            type="SemiBold"
            style={{textAlign: 'center', marginBottom: scaleHeight(2)}}>
            Masukkan Dokumen Disini
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text type="Medium">Biodata</Text>

            <OnPress
              onPress={() =>
                selectImageFromLibrary('biodata', 'Pilih Biodata File')
              }>
              {form?.biodata?.uri ? (
                <Text>{truncateString(form?.biodata?.uri, 20)}</Text>
              ) : (
                <Octicons name={'file'} />
              )}
            </OnPress>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text type="Medium">CV</Text>

            <OnPress
              onPress={() => selectImageFromLibrary('cv', 'Pilih CV File')}>
              {form?.cv?.uri ? (
                <Text>{truncateString(form?.cv?.uri, 20)}</Text>
              ) : (
                <Octicons name={'file'} />
              )}
            </OnPress>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text type="Medium">Surat Lamaran Kerja</Text>
            <OnPress
              onPress={() =>
                selectImageFromLibrary('lamaran', 'Pilih Surat Lamaran File')
              }>
              {form?.lamaran?.uri ? (
                <Text>{truncateString(form?.lamaran?.uri, 20)}</Text>
              ) : (
                <Octicons name={'file'} />
              )}
            </OnPress>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          paddingHorizontal: scaleWidth(2),
          paddingVertical: scaleHeight(1),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopColor: '#f5f6fa',
          borderTopWidth: 1,
        }}>
        {!job?.has_test && (
          <OnPress
            onPress={() => {
              navigation.navigate('VacancyTestScreen', {
                ...job?.job_test,
                job_vacancy_id: job?.id,
              });
            }}
            style={{
              width: scaleWidth(47),
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: scaleHeight(1),
              paddingBottom: scaleHeight(0.5),
              borderRadius: scaleHeight(0.5),
            }}>
            <Text color="#fff">Test</Text>
          </OnPress>
        )}

        <OnPress
          onPress={() => {
            if (job?.has_test) {
              return setShowModalApply(true);
            }
            setShowModaltest(true);
          }}
          style={{
            width: scaleWidth(job?.has_test ? 96 : 47),
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

      {/* modal test */}
      <Modal isVisible={showModalTest}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: scaleHeight(2),
              paddingHorizontal: scaleWidth(10),
              paddingVertical: scaleHeight(1),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{textAlign: 'center', paddingTop: scaleHeight(3)}}
              type="Medium">
              Silahkan untuk mengerjakan test Terlebih dahulu
            </Text>
            <OnPress
              style={{marginTop: scaleHeight(5)}}
              onPress={() => setShowModaltest(false)}>
              <Text color="#353b48">Tutup</Text>
            </OnPress>
          </View>
        </View>
      </Modal>

      {/* Modal Submit Apply */}
      <Modal isVisible={showModalApply}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: scaleHeight(2),
              paddingHorizontal: scaleWidth(10),
              paddingVertical: scaleHeight(1),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{textAlign: 'center', paddingTop: scaleHeight(3)}}
              type="Medium">
              Pastikan sudah diisi dengan benar!
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: scaleWidth(60),
              }}>
              <OnPress
                style={{marginTop: scaleHeight(5)}}
                onPress={() => setShowModalApply(false)}>
                <Text color="#353b48">Tutup</Text>
              </OnPress>
              <OnPress
                style={{marginTop: scaleHeight(5)}}
                onPress={() => {
                  setShowModalApply(false);
                  handleApplyTest();
                }}>
                <Text color="#353b48" type="SemiBold">
                  Kirim
                </Text>
              </OnPress>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default VacancyDetailScreen;
