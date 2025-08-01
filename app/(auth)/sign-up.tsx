import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import { createUser } from '@/lib/appwrite';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';

const SignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', password: '' });

    const submit = async () => {
        const { name, email, password } = form;

        if (!email || !password || !name) {
            return Alert.alert('Error', 'PLease check missing Field!');
        }

        setIsSubmitting(true);
        try {
            // appwrite sign up function
            await createUser({ email, password, name });

            // Alert.alert('Success', 'Sign Up Successfully');
            router.replace('/');
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View className="gap-10 rounded-lg bg-white p-5 mt-5">
            <CustomInput
                placeholder="Enter Your Name"
                value={form.name}
                onChangeText={(text) =>
                    setForm((prev) => ({ ...prev, name: text }))
                }
                label="User Name"
            />
            <CustomInput
                placeholder="Enter Your Email"
                value={form.email}
                onChangeText={(text) =>
                    setForm((prev) => ({ ...prev, email: text }))
                }
                label="Email"
                keyboardType="email-address"
            />
            <CustomInput
                placeholder="Enter Your Password"
                value={form.password}
                onChangeText={(text) =>
                    setForm((prev) => ({ ...prev, password: text }))
                }
                label="Password"
                secureTextEntry={true}
                keyboardType="default"
            />
            <CustomButton
                title="Sign Up"
                isLoading={isSubmitting}
                onPress={submit}
            />
            <View className="flex justify-center mt-5 flex-row gap-2">
                <Text className="base-regular text-gray-100">
                    Already have account?
                </Text>
                <Link href="/(tabs)/profile" className="base-bold text-primary">
                    Sign In
                </Link>
            </View>
        </View>
    );
};

export default SignUp;
