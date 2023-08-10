import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export const handleSaveData = async (inputData, callback) => {
  // if (!inputData.trim()) {
  //   Alert.alert('Error', 'Please enter some data');
  //   return;
  // }

  try {
    // Save data to the local database (AsyncStorage)
    await saveDataLocally(inputData);

    // Clear the input field
    callback();

    // Fetch and update unsynchronized data from the local database
    // const unsyncedData = await getUnsyncedDataFromLocalDB();
    // setOfflineData(unsyncedData);

    // Check network connectivity and sync data to the server if online
    // if (online) {
    //   checkInternetConnectivity(inputData);
    // }
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export const saveDataLocally = async data => {
  try {
    // Save data to the local database (AsyncStorage)
    const existingData = await AsyncStorage.getItem('offlineData');
    const parsedData = existingData ? JSON.parse(existingData) : [];
    parsedData.push({
      id: data.id,
      nik: data.nik,
      nama_lengkap: data.nama_lengkap,
      nomor_telepon: data.nomor_telepon,
      jenis_kelamin: data.jenis_kelamin,
      alamat: data.alamat,
      rt: data.rt,
      rw: data.rw,
      tps: data.tps,
      provinsi: data.provinsi,
      kotakab: data.kotakab,
      kecamatan: data.kecamatan,
      kelurahan: data.kelurahan,
      preference_1: data.preference_1,
      preference_2: data.preference_2,
      preference_3: data.preference_3,
      preference_4: data.preference_4,
      preference_5: data.preference_5,
      coordinates: data.coordinates,
      image: data.image,
      user: data.user,
      date: data.date,
    });
    await AsyncStorage.setItem('offlineData', JSON.stringify(parsedData));
  } catch (error) {
    throw new Error('Error saving data to local storage');
  }
};

export const getUnsyncedDataFromLocalDB = async () => {
  try {
    // Retrieve unsynchronized data from the local database (AsyncStorage)
    const existingData = await AsyncStorage.getItem('offlineData');
    const parsedData = existingData ? JSON.parse(existingData) : [];
    return parsedData.filter(item => !item.isSynced);
  } catch (error) {
    console.error('Error fetching data from local storage:', error);
    return [];
  }
};

export const sendDataToServer = async data => {
  try {
    // Create form-data to send to the server
    const formData = new FormData();
    data.forEach(item => {
      formData.append('nik', item.nik);
      formData.append('nama_lengkap', item.nama_lengkap);
      formData.append('nomor_telepon', item.nomor_telepon);
      formData.append('jenis_kelamin', item.jenis_kelamin);
      formData.append('alamat', item.alamat);
      formData.append('rt', item.rt);
      formData.append('rw', item.rw);
      formData.append('tps', item.tps);
      formData.append('provinsi', item.provinsi);
      formData.append('kotakab', item.kotakab);
      formData.append('kecamatan', item.kecamatan);
      formData.append('kelurahan', item.kelurahan);
      formData.append('preference_1', item.preference_1);
      formData.append('preference_2', item.preference_2);
      formData.append('preference_3', item.preference_3);
      formData.append('preference_4', item.preference_4);
      formData.append('preference_5', item.preference_5);
      formData.append(
        'geolocation[coordinates][0]',
        item.geolocation.coordinates[0],
      );
      formData.append(
        'geolocation[coordinates][1]',
        item.geolocation.coordinates[1],
      );
      formData.append('image', item.image);
      formData.append('date', item.date);
      formData.append('user', item.user);
    });

    // Simulate sending data to the server with a mock API call
    console.log('Sending data to the server:', formData);

    // Mock API call delay to simulate server response time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mark data as synchronized in the local database after successful API call
    markDataAsSyncedInLocalDB(data);
  } catch (error) {
    console.error('Error sending data to the server:', error);
  }
};

export const markDataAsSyncedInLocalDB = async data => {
  try {
    // Mark data as synchronized in the local database (AsyncStorage)
    const existingData = await AsyncStorage.getItem('offlineData');
    const parsedData = existingData ? JSON.parse(existingData) : [];
    parsedData.forEach(item => {
      if (data.some(d => d.id === item.id)) {
        item.isSynced = true;
      }
    });
    await AsyncStorage.setItem('offlineData', JSON.stringify(parsedData));
  } catch (error) {
    console.error('Error marking data as synced in local storage:', error);
  }
};

export const checkInternetConnectivity = offlineData => {
  // Mock network connectivity check (assume online)
  const isOnline = true;

  if (isOnline) {
    // Sync data to the server if online
    sendDataToServer(offlineData);
  }
};
