import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchBaseQuery} from '@reduxjs/toolkit/dist/query';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const scaleFont = (size = 12, use_percentage = false) => {
  if (use_percentage) {
    return RFPercentage(size);
  }
  return RFValue(size);
};

export const scaleHeight = (size = 12) => {
  return hp(size);
};

export const scaleWidth = (size = 12) => {
  return wp(size);
};

export const RenderIf = ({isTrue = false, children}) =>
  isTrue ? children : null;

export const getDateTime = timestamp => {
  if (timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const YMDHISFormat = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return YMDHISFormat;
  }

  return null;
};

export const getDate = timestamp => {
  if (timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const YMDHISFormat = `${year}-${month}-${day}`;
    return YMDHISFormat;
  }

  return null;
};

export const formatDate = dateString => {
  const options = {
    weekday: 'long', // Format the day of the week (e.g., "Minggu")
    day: 'numeric', // Format the day of the month (e.g., "23")
    month: 'long', // Format the month (e.g., "Juli")
    year: 'numeric', // Format the year (e.g., "2023")
    // hour: '2-digit', // Format the hour in 2 digits (e.g., "21")
    // minute: '2-digit', // Format the minute in 2 digits (e.g., "14")
    // timeZoneName: 'short', // Display the time zone abbreviation (e.g., "WIB")
  };

  const formattedDate = new Date(dateString).toLocaleString('id-ID', options);
  return formattedDate;
};

export const getItem = async key => {
  try {
    const data = await AsyncStorage.getItem(key);
    return JSON.parse(data);
  } catch (error) {
    const data = await AsyncStorage.getItem(key);
    return data;
  }
};

export const setItem = async (key, value) => {
  await AsyncStorage.setItem(key, value);
};

export const truncateString = (str, maxLength) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength - 3) + '...';
  }
  return str;
};

export const customFetchBaseQuery = baseUrl => {
  const baseQuery = fetchBaseQuery({...baseUrl});
  return async (args, api, extraOptions) => {
    const {error, data} = await baseQuery(args, api, extraOptions);
    if (error) {
      console.log(error, 'helper error');
      if (error.status == 401) {
        // showAlert("Sesi Telah Berakhir Silahkan Masuk Kembali", "error")
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('userData');
        // dispatch(setToggleModalLogoutVisible(false))
        // dispatch(setUser(null))
        // dispatch(setToken(null))
        // dispatch(setSysconf(null))

        // return (window.location = "/login")
      }
      return {error: {status: error.status, data: error.data}};
    }
    if (data?.message) {
      delete data.message;
    }
    return {data};
  };
};

export const removeDuplicates = arr => {
  const uniqueMap = new Map();
  arr.forEach(item => {
    uniqueMap.set(item.id, item);
  });
  return Array.from(uniqueMap.values());
};
