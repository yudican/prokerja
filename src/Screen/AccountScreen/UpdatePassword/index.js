import React, {useEffect, useState} from 'react';
import {Keyboard, ScrollView, View} from 'react-native';

import Button from '../../../Components/Button';
import InputText from '../../../Components/Form/InputText';
import MainLayout from '../../../Components/Layout/MainLayout';
import Text from '../../../Components/Text';
import {scaleHeight, scaleWidth} from '../../../Utils/helpers';
import {useUpdatePasswordMutation} from '../../../Config/Redux/Services/profileService';
import Toast from 'react-native-toast-message';
import {updatePasswordValidationSchema} from '../../../Config/Services/validationSchema';

const UpdatePassword = ({navigation}) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    old_password: null,
    password: null,
    confirm_password: null,
  });

  const [updatePassword, {isLoading}] = useUpdatePasswordMutation();

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

  const handleInputChange = (field, value) => {
    setForm(formData => ({...formData, [field]: value}));
    setValidationErrors(prevErrors => ({...prevErrors, [field]: undefined}));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Validate form data using Yup
      await updatePasswordValidationSchema.validate(form, {abortEarly: false});
      delete form.confirm_password;
      // Submit the form or perform the desired action here
      updatePassword(form).then(({data, error}) => {
        if (error) {
          console.log(error, 'error');
          Toast.show({
            type: 'error',
            text1: 'Terjadi Kesalahan',
            text2: error?.data?.message || 'Kata Sanda Gagal Berhasil Diubah',
          });
          return setLoading(false);
        }

        console.log(data, 'data');
        Toast.show({
          type: 'success',
          text1: 'Informasi',
          text2: 'Kata Sanda berhasil Berhasil Diubah, selamat datang',
        });

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
            borderRadius: 10,
            backgroundColor: '#fff',
            paddingBottom: scaleHeight(2),
            marginBottom: scaleHeight(2),
          }}>
          {/* form container */}
          <View
            style={{
              marginTop: scaleHeight(2),
              paddingHorizontal: scaleWidth(3),
            }}>
            <View style={{marginBottom: scaleHeight(2)}}>
              <Text type="SemiBold">Ubah Kata Sandi</Text>
            </View>
            <InputText
              placeholder={'Masukkan Kata Sandi Lama'}
              type={'password'}
              icon={'lock'}
              onChangeText={old_password =>
                handleInputChange('old_password', old_password)
              }
              error={validationErrors?.old_password}
              outline
            />
            <InputText
              placeholder={'Masukkan Kata Sandi'}
              type={'password'}
              icon={'lock'}
              onChangeText={password => handleInputChange('password', password)}
              error={validationErrors?.password}
              outline
            />
            <InputText
              placeholder={' Konfirmasi Kata Sandi'}
              type={'password'}
              icon={'lock'}
              onChangeText={confirm_password =>
                handleInputChange('confirm_password', confirm_password)
              }
              error={validationErrors?.confirm_password}
              outline
            />
          </View>

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
                title="Ubah  Kata Sandi"
                onPress={handleSubmit}
              />
            </View>
          )}
        </View>
      </ScrollView>
      {/* button save container */}
    </MainLayout>
  );
};

export default UpdatePassword;
