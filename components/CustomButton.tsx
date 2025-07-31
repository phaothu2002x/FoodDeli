import { CustomButtonProps } from '@/type';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

const CustomButton = ({
    onPress,
    title = 'Click me',
    style,
    textStyle,
    leftIcon,
    isLoading = false,
}: CustomButtonProps) => {
    return (
        <TouchableOpacity className={`custom-btn ${style}`} onPress={onPress}>
            {leftIcon}
            <View className="flex-center flex-row ">
                {isLoading ? (
                    <ActivityIndicator
                        size="small"
                        color="white"
                    ></ActivityIndicator>
                ) : (
                    <Text
                        className={`text-white-100 paragraph-semibold ${textStyle}`}
                    >
                        {title}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default CustomButton;
