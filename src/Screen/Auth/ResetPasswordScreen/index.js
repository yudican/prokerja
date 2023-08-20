import React, {useEffect, useState} from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import Button from '../../../Components/Button';
import InputText from '../../../Components/Form/InputText';
import AuthLayout from '../../../Components/Layout/AuthLayout';
import Text from '../../../Components/Text';
import {PRIMARY_COLOR} from '../../../Utils/contstans';
import {scaleHeight} from '../../../Utils/helpers';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useResetPasswordMutation} from '../../../Config/Redux/Services/authService';
import {resetPasswordValidationSchema} from '../../../Config/Services/validationSchema';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';

const ResetPasswordScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    password: null,
    password_confirmation: null,
  });

  const {token} = route.params;

  const [resetPassword, {isLoading}] = useResetPasswordMutation();

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
      await resetPasswordValidationSchema.validate(form, {abortEarly: false});
      delete form.password_confirmation;
      // Submit the form or perform the desired action here
      resetPassword({...form, token}).then(({data, error}) => {
        if (error) {
          Toast.show({
            type: 'error',
            text1: 'Reset Kata Sandi Gagal',
            text2: error?.data?.message || 'Reset Kata Sandi Gagal',
          });
          return setLoading(false);
        }
        Toast.show({
          type: 'success',
          text1: 'Informasi',
          text2: 'Reset Kata Sandi berhasil, Silahkan Masuk',
        });

        return navigation.replace('LoginScreen');
      });

      setLoading(false);
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
    <AuthLayout>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust as needed
      >
        <View
          style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
          <Image
            source={require('../../../assets/Ilustrations/forgot.png')}
            style={{
              width: scaleHeight(50),
              height: scaleHeight(30),
            }}
          />
          <View style={{width: '100%'}}>
            <Text type="Bold" fontSize={16}>
              Buat Kata Sandi Baru
            </Text>
            <View style={{marginTop: scaleHeight(2)}}>
              <InputText
                placeholder={'Masukkan Kata Sandi'}
                type={'password'}
                icon={'lock'}
                onChangeText={password =>
                  handleInputChange('password', password)
                }
                error={validationErrors?.password}
                outline
              />
              <InputText
                placeholder={'Masukkan Konfirmasi Kata Sandi'}
                type={'password'}
                icon={'lock'}
                onChangeText={password_confirmation =>
                  handleInputChange(
                    'password_confirmation',
                    password_confirmation,
                  )
                }
                error={validationErrors?.password_confirmation}
                outline
              />

              <View style={{marginTop: scaleHeight(1)}}>
                <Button
                  title="Ubah Kata Sandi"
                  loading={isLoading}
                  onPress={() => handleSubmit()}
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </AuthLayout>
  );
};

export default ResetPasswordScreen;
