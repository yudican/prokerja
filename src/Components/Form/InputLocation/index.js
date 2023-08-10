import React, {useRef, useState} from 'react';
import {Image, PermissionsAndroid, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {scaleHeight, scaleWidth} from '../../../Utils/helpers';
import Button from '../../Button';
import InputText from '../InputText';
import {MAPBOX_SECRET_KEY} from '../../../Utils/contstans';
import Geolocation from '@react-native-community/geolocation';
import Mapbox from '@rnmapbox/maps';
import LocationIlustration from '../../../assets/Ilustrations/location.png';
import Text from '../../Text';
import NoInternetConnection from '../../AlertInformation/NoInternetConnection';
import NoLocationActive from '../../AlertInformation/NoLocationActive';
import {useSelector} from 'react-redux';

const InputLocation = props => {
  const {height = 70, onChangeText, value, Icon, icon} = props;
  const {online} = useSelector(state => state.general);
  const refRBSheet = useRef();
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [address, setAddress] = useState(null);
  const [locationActive, setLocationActive] = useState(false);
  const [networkActive, setNetworkActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchAddressFromCoordinates = async (long = null, lat = null) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${
          long || coordinates[0]
        },${lat || coordinates[1]}.json?access_token=${MAPBOX_SECRET_KEY}`,
      );

      const data = await response.json();
      const features = data.features;
      const addressName =
        (features && features.length > 0 && features[0].place_name) || '';
      setAddress(addressName);
    } catch (error) {
      console.log(error);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);

      if (
        granted['android.permission.ACCESS_FINE_LOCATION'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.ACCESS_COARSE_LOCATION'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            setCoordinates([longitude, latitude]);
            setLocationActive(true);
            // if (!address) {
            //   fetchAddressFromCoordinates(
            //     position.coords.longitude,
            //     position.coords.latitude,
            //   );
            // }
          },
          error => {
            setLocationActive(false);
          },
          {enableHighAccuracy: true, timeout: 200000, maximumAge: 10000},
        );
      } else {
        setLocationActive(false);
        console.log('Location permission denied');
      }
    } catch (error) {
      setLocationActive(false);
      console.log(error);
    }
  };

  Mapbox.setWellKnownTileServer('Mapbox');
  Mapbox.setAccessToken(MAPBOX_SECRET_KEY);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <InputText
        label={'Lokasi'}
        placeholder={'Input Lokasi'}
        outline
        editable={false}
        onPress={() => {
          requestLocationPermission();

          setCoordinates(value || [0, 0]);
          refRBSheet.current?.open();
        }}
        value={value?.join(',')}
        Icon={Icon}
        icon={icon}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={scaleHeight(height)}
        closeOnPressBack={true}
        customStyles={{
          container: {
            borderTopStartRadius: scaleHeight(2),
            borderTopEndRadius: scaleHeight(2),
          },
          wrapper: {
            backgroundColor: 'rgba(15, 15, 15, 0.73)',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        {online ? (
          <View style={{flex: 1}}>
            {locationActive ? (
              <View style={{flex: 1}}>
                <Mapbox.MapView style={{flex: 1}}>
                  <Mapbox.Camera
                    zoomLevel={14}
                    centerCoordinate={coordinates}
                  />
                  <Mapbox.PointAnnotation
                    id="marker"
                    coordinate={coordinates}
                    draggable
                    onDragEnd={({geometry}) => {
                      const {coordinates: coordinateMap} = geometry;
                      setCoordinates(coordinateMap);
                      // fetchAddressFromCoordinates(coordinateMap[0], coordinateMap[1]);
                    }}
                  />
                </Mapbox.MapView>
                <View
                  style={{
                    paddingHorizontal: scaleWidth(3),
                    paddingBottom: scaleHeight(2),
                    position: 'absolute',
                    bottom: scaleHeight(1),
                    width: scaleWidth(95),
                    alignSelf: 'center',
                  }}>
                  <Button
                    title="Gunakan Lokasi"
                    onPress={() => {
                      refRBSheet.current?.close();
                      onChangeText(coordinates);
                    }}
                  />
                </View>
              </View>
            ) : (
              <NoLocationActive />
            )}
          </View>
        ) : (
          <View style={{flex: 1}}>
            <NoInternetConnection
              onPress={() => {
                refRBSheet.current?.close();
                onChangeText(coordinates);
              }}
            />
          </View>
        )}
      </RBSheet>
    </View>
  );
};

export default InputLocation;
