import React, {useEffect, useState} from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Button from '../../../Components/Button';
import InputText from '../../../Components/Form/InputText';
import AuthLayout from '../../../Components/Layout/AuthLayout';
import Text from '../../../Components/Text';
import {useForgotPasswordMutation} from '../../../Config/Redux/Services/authService';
import {forgotPasswordValidationSchema} from '../../../Config/Services/validationSchema';
import {PRIMARY_COLOR} from '../../../Utils/contstans';
import {scaleHeight} from '../../../Utils/helpers';

const ForgotPasswordScreen = ({navigation}) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: null,
  });

  const [forgotPassword, {isLoading}] = useForgotPasswordMutation();

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
      await forgotPasswordValidationSchema.validate(form, {abortEarly: false});
      // Submit the form or perform the desired action here
      forgotPassword(form).then(({data, error}) => {
        if (error) {
          Toast.show({
            type: 'error',
            text1: 'Terjadi Kesalahan',
            text2:
              error?.data?.message || 'Email Lupa Kata Sandi Gagal Dikirim',
          });
          return setLoading(false);
        }
        Toast.show({
          type: 'success',
          text1: 'Informasi',
          text2:
            'Email Lupa Kata Sandi berhasil Dikirim, Silahkan cek email anda',
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
              Forgot Password
            </Text>
            <View style={{marginTop: scaleHeight(2)}}>
              <InputText
                placeholder={'Email'}
                Icon={EvilIcons}
                icon={'envelope'}
                onChangeText={email => handleInputChange('email', email)}
                error={validationErrors?.email}
                outline
              />

              <View style={{marginTop: scaleHeight(1)}}>
                <Button
                  title="Send Link Verification"
                  loading={isLoading}
                  onPress={() => handleSubmit()}
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      {!isKeyboardOpen && (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>
            Already have an account ?
            <Text
              color={PRIMARY_COLOR}
              type="Medium"
              onPress={() => navigation.navigate('LoginScreen')}>
              SignIn
            </Text>
          </Text>
        </View>
      )}
    </AuthLayout>
  );
};

export default ForgotPasswordScreen;
