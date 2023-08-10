import React, {useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
import Button from '../../Button';
import Text from '../../Text';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  getDate,
  getDateTime,
  scaleHeight,
  scaleWidth,
} from '../../../Utils/helpers';
import InputText from '../InputText';
import {Calendar} from 'react-native-calendars';
import {PRIMARY_COLOR} from '../../../Utils/contstans';
import OnPress from '../../OnPress';
import Ionicons from 'react-native-vector-icons/Ionicons';

const InputSelect = props => {
  const {height = 70, onChange, options, value, showSearch} = props;
  const refRBSheet = useRef();
  const [query, setQuery] = useState('');
  const newPaginateData = options.filter(item =>
    item.label?.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <View
      style={{
        flex: 1,
      }}>
      <InputText
        {...props}
        label={props.label}
        placeholder={props.placeholder}
        outline
        editable={false}
        onPress={() => {
          refRBSheet.current?.open();
        }}
        value={props.value}
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
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: scaleHeight(1),
          }}>
          <Text fontSize={14} type="Medium">
            Pilih {props?.label}
          </Text>
        </View>
        {showSearch && (
          <View style={{marginHorizontal: scaleWidth(3)}}>
            <InputText
              placeholder={'Cari Disini'}
              onChangeText={e => setQuery(e)}
              value={query}
            />
          </View>
        )}
        <View style={{flex: 1, marginHorizontal: scaleWidth(3)}}>
          <FlatList
            data={newPaginateData}
            scrollEnabled
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              const isSelected = item.value == value;
              return (
                <OnPress
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: isSelected ? PRIMARY_COLOR : 'gray',
                    borderRadius: scaleHeight(1),
                    paddingHorizontal: scaleWidth(3),
                    paddingVertical: scaleHeight(1),
                    marginTop: scaleHeight(1),
                  }}
                  onPress={() => {
                    onChange(item);
                    refRBSheet.current?.close();
                  }}>
                  <Ionicons
                    name={isSelected ? 'radio-button-on' : 'radio-button-off'}
                  />
                  <Text style={{paddingLeft: scaleWidth(3)}}>{item.label}</Text>
                </OnPress>
              );
            }}
          />
        </View>
      </RBSheet>
    </View>
  );
};

export default InputSelect;
