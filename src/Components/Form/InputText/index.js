import React, {useState} from 'react';
import {Platform, TextInput, View} from 'react-native';
import {scaleFont, scaleHeight, scaleWidth} from '../../../Utils/helpers';
import Feather from 'react-native-vector-icons/Feather';
import {PRIMARY_COLOR} from '../../../Utils/contstans';
import Text from '../../Text';
import OnPress from '../../OnPress';

const InputText = props => {
  const {
    Icon = Feather,
    icon,
    outline = false,
    placeholder,
    onChangeText,
    type,
    error,
    label,
    editable = true,
    onPress,
    value,
    numberOfLines,
    textAlignVertical = 'center',
  } = props;
  const [showPassword, setShowPassword] = useState(true);

  const isPassword = type === 'password' ? true : false;
  if (outline) {
    return (
      <OnPress onPress={onPress}>
        {label && <Text type="Medium">{label}</Text>}
        <View style={{marginBottom: scaleHeight(1)}}>
          {icon && (
            <Icon
              name={icon}
              style={{position: 'absolute', zIndex: 99, top: 15, left: 10}}
              size={scaleFont(14)}
              color={PRIMARY_COLOR}
            />
          )}
          <TextInput
            style={{
              borderBottomWidth: 0.5,
              paddingHorizontal: scaleWidth(2),
              backgroundColor: '#fff',
              borderBottomColor: error ? PRIMARY_COLOR : '#ddd',
              fontFamily: 'Poppins-Regular',
              paddingLeft: icon ? scaleWidth(10) : scaleWidth(2),
              fontSize: scaleFont(12),
              width: '100%',
              height: Platform.OS === 'ios' ? scaleHeight(5.8) : scaleHeight(7),
              marginBottom: 1,
              color: '#000',
            }}
            placeholderTextColor="#535c68"
            placeholder={placeholder}
            onChangeText={onChangeText}
            secureTextEntry={isPassword ? showPassword : false}
            editable={editable}
            onPressIn={onPress}
            value={value}
            numberOfLines={numberOfLines}
            textAlignVertical={textAlignVertical}
            {...props}
          />
          {isPassword && (
            <Feather
              name={showPassword ? 'eye' : 'eye-off'}
              style={{
                position: 'absolute',
                zIndex: 99,
                top: 16.5,
                right: 10,
                color: showPassword ? '#a5b1c2' : '#0097e6',
              }}
              size={scaleFont(14)}
              onPress={() => setShowPassword(!showPassword)}
            />
          )}
          {error && (
            <Text color={PRIMARY_COLOR} fontSize={8} type="Medium">
              {error}
            </Text>
          )}
        </View>
      </OnPress>
    );
  }
  return (
    <OnPress onPress={onPress}>
      {label && <Text type="Medium">{label}</Text>}
      <View style={{marginBottom: scaleHeight(1)}}>
        {icon && (
          <Icon
            name={icon}
            style={{position: 'absolute', zIndex: 99, top: 15, left: 10}}
            size={scaleFont(14)}
            color={PRIMARY_COLOR}
          />
        )}
        <TextInput
          style={{
            borderWidth: 0.5,
            borderRadius: scaleHeight(1),
            paddingHorizontal: scaleWidth(2),
            backgroundColor: '#f5f6fa',
            borderColor: error ? PRIMARY_COLOR : '#f5f6fa',
            fontFamily: 'Poppins-Regular',
            paddingLeft: icon ? scaleWidth(10) : scaleWidth(2),
            fontSize: scaleFont(12),
            width: '100%',
            height: Platform.OS === 'ios' ? scaleHeight(5.8) : scaleHeight(7),
            marginBottom: 1,
            color: '#000',
          }}
          placeholderTextColor="#535c68"
          placeholder={placeholder}
          onChangeText={onChangeText}
          secureTextEntry={isPassword ? showPassword : false}
          editable={editable}
          onPressIn={onPress}
          value={value}
          numberOfLines={numberOfLines}
          textAlignVertical={textAlignVertical}
          {...props}
        />
        {isPassword && (
          <Feather
            name={showPassword ? 'eye-off' : 'eye'}
            style={{
              position: 'absolute',
              zIndex: 99,
              top: 16.5,
              right: 10,
              color: showPassword ? '#a5b1c2' : '#0097e6',
            }}
            size={scaleFont(14)}
            onPress={() => setShowPassword(!showPassword)}
          />
        )}
        {error && (
          <Text color={PRIMARY_COLOR} fontSize={8} type="Medium">
            Wajib Disi
          </Text>
        )}
      </View>
    </OnPress>
  );
};

export default InputText;
