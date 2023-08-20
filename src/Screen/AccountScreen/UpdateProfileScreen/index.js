import React, {useEffect, useState} from 'react';
import {Keyboard, ScrollView, View} from 'react-native';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Button from '../../../Components/Button';
import InputText from '../../../Components/Form/InputText';
import MainLayout from '../../../Components/Layout/MainLayout';
import Photo from '../../../Components/ProfilePhoto';
import {scaleHeight, scaleWidth, setItem} from '../../../Utils/helpers';
import {useDispatch, useSelector} from 'react-redux';
import {useUpdateProfileMutation} from '../../../Config/Redux/Services/profileService';
import Toast from 'react-native-toast-message';
import {updateProfileValidationSchema} from '../../../Config/Services/validationSchema';
import {setUserData} from '../../../Config/Redux/Reducers/userReducer';
import {launchImageLibrary} from 'react-native-image-picker';

const UpdateProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  //hooks
  // const dispatch = useDispatch();
  const {userData} = useSelector(state => state.user);

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: userData?.name,
    email: userData?.email,
    telepon: userData?.telepon,
    photo: null,
  });

  const [updateProfile, {isLoading}] = useUpdateProfileMutation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false);
      },
    );

    // Clean up the listeners when the component is unmounted
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const selectImageFromLibrary = () => {
    const options = {
      title: 'Pilih Foto Profile',
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

  const handleInputChange = (field, value) => {
    setForm(formData => ({...formData, [field]: value}));
    setValidationErrors(prevErrors => ({...prevErrors, [field]: undefined}));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Validate form data using Yup
      await updateProfileValidationSchema.validate(form, {abortEarly: false});
      // Submit the form or perform the desired action here
      const formData = new FormData();

      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('telepon', form.telepon);
      if (form.photo) {
        formData.append('photo', form.photo);
      }

      updateProfile(formData).then(({data, error}) => {
        if (error) {
          console.log(error, 'error');
          Toast.show({
            type: 'error',
            text1: 'Ubah Profil Gagal',
            text2: error?.data?.message || 'Ubah Profil Gagal',
          });
          return setLoading(false);
        }

        console.log(data.data, 'data');
        Toast.show({
          type: 'success',
          text1: 'Informasi',
          text2: 'Ubah Profil berhasil',
        });

        dispatch(setUserData(data.data));
        setItem('userData', JSON.stringify(data.data));

        setLoading(false);
        return navigation.goBack();
      });
    } catch (error) {
      // Handle validation errors and set validationErrors state
      const errors = {};
      error.inner.forEach(err => {
        errors[err.path] = err.message;
      });
      setValidationErrors(errors);
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      {/* scroll container */}
      <ScrollView
        contentContainerStyle={{flex: 1, paddingBottom: scaleHeight(8)}}>
        {/* edit profile container */}
        <View
          style={{
            marginTop: scaleHeight(4),
            borderRadius: 10,
            backgroundColor: '#fff',
            paddingBottom: scaleHeight(2),
            marginBottom: scaleHeight(2),
          }}>
          {/* profile photo container */}
          <View
            style={{
              position: 'absolute',
              alignSelf: 'center',
              top: scaleHeight(-4),
            }}>
            <Photo
              defaultAvatarOutline
              url={form.photo?.uri || userData?.photo}
              changeable
              size={78}
              onPress={() => selectImageFromLibrary()}
            />
          </View>

          {/* form container */}
          <View
            style={{
              marginTop: scaleHeight(10),
              paddingHorizontal: scaleWidth(3),
            }}>
            <InputText
              placeholder={'Masukkan Nama Lengkap'}
              icon={'user'}
              onChangeText={name => handleInputChange('name', name)}
              error={validationErrors?.name}
              outline
              value={form.name}
            />
            <InputText
              placeholder={'Masukkan Email'}
              Icon={EvilIcons}
              icon={'envelope'}
              onChangeText={email => handleInputChange('email', email)}
              error={validationErrors?.email}
              outline
              value={form.email}
            />
            {/* <InputText
              placeholder={'Masukkan No. Telepon'}
              Icon={Feather}
              icon={'smartphone'}
              onChangeText={telepon => handleInputChange('telepon', telepon)}
              error={validationErrors?.telepon}
              outline
              value={form.telepon}
            /> */}
          </View>
          {/* button save container */}
          {!isKeyboardOpen && (
            <View
              style={{
                marginHorizontal: scaleWidth(3),
                marginTop: scaleHeight(2),
              }}>
              <Button
                loading={isLoading}
                // disabled={watch('email').length < 1 || watch('password').length < 1}
                // style={{marginBottom: scaleHeight(5)}}
                title="Simpan"
                onPress={handleSubmit}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default UpdateProfileScreen;
