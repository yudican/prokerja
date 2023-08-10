import React, {useState} from 'react';
import {Image, View} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import OnPress from '../../../Components/OnPress';
import Text from '../../../Components/Text';
import {PRIMARY_COLOR} from '../../../Utils/contstans';
import {scaleHeight, scaleWidth} from '../../../Utils/helpers';

const VacancyTestScreen = ({navigation, route}) => {
  const item = route.params;
  const [canApply, setCanApply] = useState(false);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1}}>
        <View style={{paddingTop: scaleHeight(2)}}>
          <Image
            source={{
              uri: 'https://i.ibb.co/BgnCf2h/13769ad329419e1f713af8aa9038489f-1.png',
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
              Buatkan Sebuah desain brosur tentang makanan dan minuman untuk
              kebutuhan postingan sosial media.
            </Text>
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
            alignItems: 'center',
          }}>
          <Text
            type="SemiBold"
            style={{textAlign: 'center', marginBottom: scaleHeight(2)}}>
            Kirim Menggunakan Format Jpg. Maksimal 2MB
          </Text>
          <Octicons name={'file'} />
        </View>
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
            if (canApply) {
              return setShowModalApply(true);
            }
            setShowModaltest(true);
          }}
          style={{
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
    </View>
  );
};

export default VacancyTestScreen;
