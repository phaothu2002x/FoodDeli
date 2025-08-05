import seed from '@/lib/seed';
import React from 'react';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {
    return (
        <SafeAreaView>
            <Text>Search</Text>
            <Button
                title="Seed Data"
                onPress={() =>
                    seed().catch((err) =>
                        console.log('failed to seed database', err)
                    )
                }
            />
        </SafeAreaView>
    );
};

export default Search;
