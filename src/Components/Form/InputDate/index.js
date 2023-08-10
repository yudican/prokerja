import React, {useRef, useState} from 'react';
import {View} from 'react-native';
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

const InputDate = props => {
  const {height = 70, onChangeText} = props;
  const refRBSheet = useRef();
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <View
      style={{
        flex: 1,
      }}>
      <InputText
        label={[props?.label]}
        placeholder={props.placeholder}
        outline
        editable={false}
        onPress={() => {
          setSelectedDate(props.value || new Date().getTime());
          refRBSheet.current?.open();
        }}
        value={props.value}
        {...props}
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
        <View style={{flex: 1}}>
          <Calendar
            initialDate={'2023-07-28'}
            dayComponent={({date, state}) => {
              const isToday = state === 'today';
              const isDisabled = state === 'disabled';
              const isSelected = date.dateString == getDate(selectedDate);
              const todayColor = isToday ? '#4b4b4b' : 'white';
              const colorToday = isToday || isSelected ? '#fff' : '#000';
              const selectedColor = isSelected ? PRIMARY_COLOR : todayColor;
              return (
                <OnPress
                  style={{
                    width: scaleHeight(5),
                    height: scaleHeight(5),
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: selectedColor,
                    borderRadius: scaleHeight(1),
                  }}
                  onPress={() => setSelectedDate(date.timestamp)}>
                  <Text
                    style={{
                      // textAlign: 'center',
                      color: isDisabled ? 'gray' : colorToday,
                    }}>
                    {date.day}
                  </Text>
                </OnPress>
              );
            }}
          />
        </View>
        <View
          style={{
            paddingHorizontal: scaleWidth(3),
            paddingBottom: scaleHeight(2),
          }}>
          <Button
            title="Pilih Tanggal"
            onPress={() => {
              refRBSheet.current?.close();
              onChangeText(selectedDate);
            }}
          />
        </View>
      </RBSheet>
    </View>
  );
};

export default InputDate;
