import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import AccountScreen from '../../Screen/AccountScreen';
import HomeScreen from '../../Screen/HomeScreen';
import {PRIMARY_COLOR} from '../../Utils/contstans';
import {scaleHeight, scaleWidth} from '../../Utils/helpers';
import HistoryScreen from '../../Screen/HistoryScreen';

const Tab = createBottomTabNavigator();
const BottomTab = () => {
  const [isDark] = useState(false);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({navigation, route}) => {
        return {
          tabBarHideOnKeyboard: true,
          headerShown: true,
          tabBarStyle: {
            // position: 'absolute',
            bottom: 10,
            // left: scaleWidth(3),
            // right: scaleWidth(3),
            backgroundColor: '#fff',
            borderRadius: scaleHeight(1),
            height: 60,
            borderTopWidth: isDark ? 0.5 : null,
            borderTopColor: isDark ? 'grey' : null,
            borderWidth: isDark ? 0.5 : null,
            borderColor: isDark ? 'grey' : null,
            marginHorizontal: scaleWidth(3),
            // tabBarVisible on V6 'none' for set visible to hidde
          },
          tabBarShowLabel: false,
          tabBarItemStyle: {
            padding: 0,
            margin: 0,
            height: 64,
            width: 64,
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarActiveTintColor: PRIMARY_COLOR,
        };
      }}>
      {/* Home  */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <Octicons size={size} color={color} name="home" />
            ) : (
              <Octicons size={size} color={color} name="home" />
            ),
          headerShown: false,
        }}
      />

      {/* Transactions */}
      <Tab.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <Octicons size={size} color={color} name="history" />
            ) : (
              <Octicons color={'grey'} size={size} name="history" />
            ),
          headerShown: false,
        }}
      />

      {/* Settings  */}
      <Tab.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <Feather size={size} color={color} name="user" />
            ) : (
              <Feather size={size} color={color} name="user" />
            ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
