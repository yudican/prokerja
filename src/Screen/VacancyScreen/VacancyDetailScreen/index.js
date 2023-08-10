import React, {useState} from 'react';
import {Image, View} from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import OnPress from '../../../Components/OnPress';
import Text from '../../../Components/Text';
import {PRIMARY_COLOR} from '../../../Utils/contstans';
import {scaleHeight, scaleWidth} from '../../../Utils/helpers';

const VacancyDetailScreen = ({navigation, route}) => {
  const item = route.params;
  const [canApply, setCanApply] = useState(false);
  const [showModalTest, setShowModaltest] = useState(false);
  const [showModalApply, setShowModalApply] = useState(false);
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
                Medan
              </Text>
            </View>
            <Text fontSize={10}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil
              voluptas quisquam, dignissimos ab vel omnis pariatur doloremque
              deleniti delectus culpa, facere numquam sequi cumque nemo
              molestiae? Non, sed asperiores. Recusandae.
            </Text>
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
            <Octicons name={'file'} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text type="Medium">CV</Text>
            <Octicons name={'file'} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text type="Medium">Surat Lamaran Kerja</Text>
            <Octicons name={'file'} />
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
        <OnPress
          onPress={() => {
            setCanApply(true);
            navigation.navigate('VacancyTestScreen');
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
        <OnPress
          onPress={() => {
            if (canApply) {
              return setShowModalApply(true);
            }
            setShowModaltest(true);
          }}
          style={{
            width: scaleWidth(47),
            backgroundColor: PRIMARY_COLOR,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: scaleHeight(1),
            paddingBottom: scaleHeight(0.5),
            borderRadius: scaleHeight(0.5),
          }}>
          <Text color="#fff">Apply</Text>
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
                onPress={() => setShowModalApply(false)}>
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
