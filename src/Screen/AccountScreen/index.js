import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import MainLayout from '../../Components/Layout/MainLayout';
import MenuList from '../../Components/MenuList';
import Photo from '../../Components/ProfilePhoto';
import Text from '../../Components/Text';
import {setToken, setUserData} from '../../Config/Redux/Reducers/userReducer';
import {useGetVisitQuery} from '../../Config/Redux/Services/visitService';
import {PRIMARY_COLOR} from '../../Utils/contstans';
import {scaleFont, scaleHeight, scaleWidth} from '../../Utils/helpers';
import Modal from 'react-native-modal';
import OnPress from '../../Components/OnPress';

const AccountScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [showModalLogout, setShowModalLogout] = useState(false);
  const {userData} = useSelector(state => state.user);
  const {online, offlineData} = useSelector(state => state.general);

  const isAdmin = userData?.role === 'admin';
  const {data, isLoading} = useGetVisitQuery(
    isAdmin ? `` : `?user=${userData?.id}`,
  );

  const visitTotal = data?.total || 0;
  return (
    <MainLayout>
      {/* user info */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Profile')}
        style={{
          marginTop: scaleHeight(2),
          paddingHorizontal: scaleWidth(6),
          height: 80,
          borderRadius: 10,
          backgroundColor: '#fff',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: scaleHeight(3),
        }}>
        <Photo style={{marginRight: scaleWidth(3)}} url={userData?.photo} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: scaleWidth(70),
          }}>
          <View>
            <Text type="SemiBold" color={'#000'}>
              {userData?.name || 'Yudi Candra'}
            </Text>
            <Text color={'#000'} fontSize={10}>
              {userData?.email || 'yudi@gmail.com'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* user profile */}
      <View style={{marginTop: scaleHeight(0)}}>
        <View>
          <Text
            type="SemiBold"
            color={'#000'}
            style={{marginBottom: scaleHeight(1)}}>
            Pengaturan Akun
          </Text>
          <MenuList
            divider
            title={'Ubah Profil'}
            leftContent={<Feather size={16} name={'user'} color={'#000'} />}
            onPress={() => navigation.navigate('UpdateProfileScreen')}
            rightContent={<Feather name="chevron-right" color={'#000'} />}
            style={{borderTopLeftRadius: 10, borderTopRightRadius: 10}}
          />
          <MenuList
            divider
            title={'Ubah Kata sandi'}
            onPress={() => navigation.navigate('UpdatePassword')}
            rightContent={<Feather name="chevron-right" color={'#000'} />}
            leftContent={
              <MaterialCommunityIcons
                size={16}
                name={'shield-key'}
                color={'#000'}
              />
            }
            style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}
          />
          <MenuList
            title={'Keluar'}
            onPress={async () => {
              setShowModalLogout(true);
            }}
            rightContent={<Feather name="chevron-right" color={'#000'} />}
            leftContent={
              <FontAwesome size={16} name={'sign-out'} color={'#000'} />
            }
            style={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}
          />
        </View>
      </View>

      {/* logout */}
      {/* <View style={{flex: 1}}>
        <UpdateProfile />
      </View> */}
      <Modal isVisible={showModalLogout}>
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
              Apakah anda ingin keluar?
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
                onPress={() => setShowModalLogout(false)}>
                <Text color="#353b48">Tutup</Text>
              </OnPress>
              <OnPress
                style={{marginTop: scaleHeight(5)}}
                onPress={async () => {
                  dispatch(setUserData(null));
                  dispatch(setToken(null));

                  await AsyncStorage.removeItem('token');
                  await AsyncStorage.removeItem('userData');
                  setShowModalLogout(false);
                }}>
                <Text color="#353b48" type="SemiBold">
                  Kirim
                </Text>
              </OnPress>
            </View>
          </View>
        </View>
      </Modal>
    </MainLayout>
  );
};

export default AccountScreen;
