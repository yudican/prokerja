import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';

// auth
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import UpdatePassword from '../../Screen/AccountScreen/UpdatePassword';
import UpdateProfileScreen from '../../Screen/AccountScreen/UpdateProfileScreen';
import ForgotPasswordScreen from '../../Screen/Auth/ForgotPasswordScreen';
import LoginScreen from '../../Screen/Auth/LoginScreen';
import RegisterScreen from '../../Screen/Auth/RegisterScreen';
import ResetPasswordScreen from '../../Screen/Auth/ResetPasswordScreen';
import {PRIMARY_COLOR} from '../../Utils/contstans';
import {scaleFont} from '../../Utils/helpers';
import {setToken, setUserData} from '../Redux/Reducers/userReducer';
import BottomTab from './BottomTab';
import CourseScreen from '../../Screen/CourseScreen';
import CourseDetailScreen from '../../Screen/CourseScreen/CourseDetailScreen';
import VacancyScreen from '../../Screen/VacancyScreen';
import VacancyDetailScreen from '../../Screen/VacancyScreen/VacancyDetailScreen';
import VacancyTestScreen from '../../Screen/VacancyScreen/VacancyTestScreen';
import NotificationScreen from '../../Screen/NotificationScreen';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {token} = useSelector(state => state.user);

  useEffect(() => {
    try {
      AsyncStorage.getItem('token')
        .then(data => {
          if (data) {
            dispatch(setToken(data));
            return setIsAuthenticated(true);
          }

          setIsAuthenticated(false);
        })
        .catch(error => {
          console.log('Error fetching token:', error);
        });

      AsyncStorage.getItem('userData')
        .then(data => {
          if (data) {
            dispatch(setUserData(JSON.parse(data)));
          }
        })
        .catch(error => {
          console.log('Error fetching token:', error);
        });
    } catch (error) {}
  }, [token]);

  if (isAuthenticated) {
    return (
      <NavigationContainer>
        <Stack.Navigator nitialRouteName={'HomeScreen'}>
          {/* private */}
          <Stack.Screen
            name="HomeScreen"
            component={BottomTab}
            options={{
              headerShown: false,
              statusBarColor: '#fff',
              statusBarStyle: 'dark',
            }}
          />

          <Stack.Screen
            name="CourseScreen"
            component={CourseScreen}
            options={({navigation, route}) => ({
              // headerShown: false,
              headerTitle: 'Course',
              headerTitleAlign: 'center',
              headerLeft: props => (
                <Entypo
                  name={'chevron-left'}
                  color={'#fff'}
                  size={scaleFont(22)}
                  onPress={() => navigation.goBack()}
                />
              ),
              headerBackTitleStyle: {
                color: '#fff',
              },
              headerTitleStyle: {
                color: '#fff',
              },
              headerStyle: {
                backgroundColor: PRIMARY_COLOR,
              },
              statusBarColor: PRIMARY_COLOR,
              statusBarStyle: 'light',
              presentation: 'modal',
            })}
          />
          <Stack.Screen
            name="VacancyScreen"
            component={VacancyScreen}
            options={({navigation, route}) => ({
              // headerShown: false,
              headerTitle: 'Job Vacancy',
              headerTitleAlign: 'center',
              headerLeft: props => (
                <Entypo
                  name={'chevron-left'}
                  color={'#fff'}
                  size={scaleFont(22)}
                  onPress={() => navigation.goBack()}
                />
              ),
              headerBackTitleStyle: {
                color: '#fff',
              },
              headerTitleStyle: {
                color: '#fff',
              },
              headerStyle: {
                backgroundColor: PRIMARY_COLOR,
              },
              statusBarColor: PRIMARY_COLOR,
              statusBarStyle: 'light',
              presentation: 'modal',
            })}
          />
          <Stack.Screen
            name="VacancyTestScreen"
            component={VacancyTestScreen}
            options={({navigation, route}) => ({
              // headerShown: false,
              headerTitle: 'Test',
              headerTitleAlign: 'center',
              headerLeft: props => (
                <Entypo
                  name={'chevron-left'}
                  color={'#fff'}
                  size={scaleFont(22)}
                  onPress={() => navigation.goBack()}
                />
              ),
              headerBackTitleStyle: {
                color: '#fff',
              },
              headerTitleStyle: {
                color: '#fff',
              },
              headerStyle: {
                backgroundColor: PRIMARY_COLOR,
              },
              statusBarColor: PRIMARY_COLOR,
              statusBarStyle: 'light',
              presentation: 'modal',
            })}
          />

          <Stack.Screen
            name="CourseDetailScreen"
            component={CourseDetailScreen}
            options={{
              headerShown: false,
              statusBarColor: '#fff',
              statusBarStyle: 'dark',
            }}
          />
          <Stack.Screen
            name="VacancyDetailScreen"
            component={VacancyDetailScreen}
            options={{
              headerShown: false,
              statusBarColor: '#fff',
              statusBarStyle: 'dark',
            }}
          />

          <Stack.Screen
            name="NotificationScreen"
            component={NotificationScreen}
            options={({navigation, route}) => ({
              // headerShown: false,
              headerTitle: 'Notifikasi',
              headerTitleAlign: 'center',
              headerLeft: props => (
                <Entypo
                  name={'chevron-left'}
                  color={'#fff'}
                  size={scaleFont(22)}
                  onPress={() => navigation.goBack()}
                />
              ),
              headerBackTitleStyle: {
                color: '#fff',
              },
              headerTitleStyle: {
                color: '#fff',
              },
              headerStyle: {
                backgroundColor: PRIMARY_COLOR,
              },
              statusBarColor: PRIMARY_COLOR,
              statusBarStyle: 'light',
              presentation: 'modal',
            })}
          />

          {/* profile */}
          <Stack.Screen
            name="UpdateProfileScreen"
            component={UpdateProfileScreen}
            options={({navigation, route}) => ({
              // headerShown: false,
              headerTitle: 'Ubah Profil',
              headerTitleAlign: 'center',
              headerLeft: props => (
                <Entypo
                  name={'chevron-left'}
                  color={'#fff'}
                  size={scaleFont(22)}
                  onPress={() => navigation.goBack()}
                />
              ),
              headerBackTitleStyle: {
                color: '#fff',
              },
              headerTitleStyle: {
                color: '#fff',
              },
              headerStyle: {
                backgroundColor: PRIMARY_COLOR,
              },
              statusBarColor: PRIMARY_COLOR,
              statusBarStyle: 'light',
              presentation: 'modal',
            })}
          />
          <Stack.Screen
            name="UpdatePassword"
            component={UpdatePassword}
            options={({navigation, route}) => ({
              // headerShown: false,
              headerTitle: 'Ubah Kata Sandi',
              headerTitleAlign: 'center',
              headerLeft: props => (
                <Entypo
                  name={'chevron-left'}
                  color={'#fff'}
                  size={scaleFont(22)}
                  onPress={() => navigation.goBack()}
                />
              ),
              headerBackTitleStyle: {
                color: '#fff',
              },
              headerTitleStyle: {
                color: '#fff',
              },
              headerStyle: {
                backgroundColor: PRIMARY_COLOR,
              },
              statusBarColor: PRIMARY_COLOR,
              statusBarStyle: 'light',
              presentation: 'modal',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator nitialRouteName={'LoginScreen'}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
            statusBarColor: '#fff',
            statusBarStyle: 'dark',
          }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            headerShown: false,
            statusBarColor: '#fff',
            statusBarStyle: 'dark',
          }}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{
            headerShown: false,
            statusBarColor: '#fff',
            statusBarStyle: 'dark',
          }}
        />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
          options={{
            headerShown: false,
            statusBarColor: '#fff',
            statusBarStyle: 'dark',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
