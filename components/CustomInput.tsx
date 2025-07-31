import { CustomInputProps } from '@/type';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

const CustomInput = ({
    placeholder = 'Enter some text',
    value,
    onChangeText,
    label,
    secureTextEntry = false,
    keyboardType = 'default',
}: CustomInputProps) => {
    const [isFocus, setIsFocus] = useState(false);

    return (
        <View className="w-full">
            <Text className="label">{label}</Text>
            <TextInput
                placeholder={placeholder}
                autoCapitalize="none"
                autoCorrect={false}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                placeholderTextColor="#888"
                className={`input ${isFocus ? 'border-primary' : 'border-gray-300'}`}
            />
        </View>
    );
};

export default CustomInput;
