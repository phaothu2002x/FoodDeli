import { Redirect, Slot } from 'expo-router';
import React from 'react';

export default function _layout() {
    const isAuth = false;

    if (!isAuth) {
        return <Redirect href="/(auth)/sign-in" />;
    }
    return <Slot />;
}
