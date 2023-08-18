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
import {scaleHeight, setItem} from '../../../Utils/helpers';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useLoginMutation} from '../../../Config/Redux/Services/authService';
import {loginValidationSchema} from '../../../Config/Services/validationSchema';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {
  setToken,
  setUserData,
} from '../../../Config/Redux/Reducers/userReducer';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: null,
    password: null,
  });

  const [login, {isLoading}] = useLoginMutation();

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
      await loginValidationSchema.validate(form, {abortEarly: false});

      // Submit the form or perform the desired action here
      login(form).then(({data, error}) => {
        if (error) {
          console.log(error, 'error');
          Toast.show({
            type: 'error',
            text1: 'Login Gagal',
            text2: error?.data?.message || 'Login Gagal',
          });
          return setLoading(false);
        }
        Toast.show({
          type: 'success',
          text1: 'Informasi',
          text2: 'Login berhasil, selamat datang kembali',
        });

        const token = data.data.access_token;
        dispatch(setUserData(data.data.user));
        dispatch(setToken(token));
        setItem('token', token);
        setItem('userData', JSON.stringify(data.data.user));

        // return navigation.replace('HomeScreen');
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
            source={require('../../../assets/Ilustrations/logo.png')}
            style={{
              width: scaleHeight(isKeyboardOpen ? 30 : 40),
              height: scaleHeight(isKeyboardOpen ? 20 : 30),
            }}
            resizeMode={'contain'}
          />
          <View style={{width: '100%', marginTop: scaleHeight(2)}}>
            <Text type="Bold" fontSize={16}>
              Login to your Account
            </Text>
            <View style={{marginTop: scaleHeight(2)}}>
              <InputText
                placeholder={' Email'}
                Icon={EvilIcons}
                icon={'envelope'}
                outline
                onChangeText={email => handleInputChange('email', email)}
                error={validationErrors?.email}
              />
              <InputText
                placeholder={'Password'}
                type={'password'}
                icon={'lock'}
                outline
                onChangeText={password =>
                  handleInputChange('password', password)
                }
                error={validationErrors?.password}
              />

              <View style={{marginTop: scaleHeight(1)}}>
                <Text
                  color={PRIMARY_COLOR}
                  type="Medium"
                  style={{textAlign: 'right', marginBottom: scaleHeight(1)}}
                  onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                  Forgot Password?
                </Text>
                <Button
                  title="Sign In"
                  onPress={() => handleSubmit()}
                  loading={loading || isLoading}
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      {!isKeyboardOpen && (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>
            Don’t have an account ?
            <Text
              color={PRIMARY_COLOR}
              type="Medium"
              onPress={() => navigation.navigate('RegisterScreen')}>
              SignUp
            </Text>
          </Text>
        </View>
      )}
    </AuthLayout>
  );
};

export default LoginScreen;
