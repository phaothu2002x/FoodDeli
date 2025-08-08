import CartButton from '@/components/CartButton';
import MenuCard from '@/components/MenuCard';
import { getCategories, getMenu } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';
import { MenuItem } from '@/type';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {
    const { category, query } = useLocalSearchParams<{
        query: string;
        category: string;
    }>();

    const { data, refetch, loading } = useAppwrite({
        fn: getMenu,
        params: { category, query, limit: 6 },
    });

    const { data: categories } = useAppwrite({ fn: getCategories, params: {} });

    useEffect(() => {
        refetch({ category, query, limit: 6 });
    }, [query, category]);

    const menuFakeData = [
        {
            id: '1',
            name: 'Spicy Ramen',
            description: 'Hot and savory noodle soup with pork and egg',
            price: 120000,
            image: 'https://example.com/images/spicy-ramen.jpg',
        },
        {
            id: '2',
            name: 'Grilled Chicken Salad',
            description:
                'Fresh greens topped with grilled chicken and vinaigrette',
            price: 95000,
            image: 'https://example.com/images/chicken-salad.jpg',
        },
        {
            id: '3',
            name: 'Beef Bánh Mì',
            description:
                'Vietnamese baguette with marinated beef and pickled veggies',
            price: 75000,
            image: 'https://example.com/images/beef-banh-mi.jpg',
        },
        {
            id: '4',
            name: 'Mango Smoothie',
            description: 'Refreshing mango blend with yogurt and honey',
            price: 55000,
            image: 'https://example.com/images/mango-smoothie.jpg',
        },
        {
            id: '5',
            name: 'Matcha Cheesecake',
            description: 'Creamy cheesecake infused with premium matcha',
            price: 65000,
            image: 'https://example.com/images/matcha-cheesecake.jpg',
        },
        {
            id: '6',
            name: 'Matcha Machiato',
            description: 'Creamy Matcha infused with premium Cookies',
            price: 25000,
            image: 'https://example.com/images/matcha-cheesecake.jpg',
        },
    ];

    return (
        <SafeAreaView className="bg-white h-full">
            <FlatList
                data={menuFakeData}
                renderItem={({ item, index }) => {
                    const isFirstRightColItem = index % 2 === 0;
                    return (
                        <View
                            className={`flex-1 max-w-[48%] ${!isFirstRightColItem ? 'mt-10' : 'mt-0'}`}
                        >
                            <MenuCard item={item as MenuItem} />
                        </View>
                    );
                }}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperClassName="gap-7"
                contentContainerClassName="gap-7 px-5 pb-32 "
                ListHeaderComponent={() => (
                    <View className="my-5 gap-5">
                        <View className="flex-between flex-row w-full">
                            <View className="flex-start">
                                <Text className="sm-bold uppercase text-primary">
                                    Search
                                </Text>
                                <View className="flex-start flex-row gap-x-1 mt-0.5 ">
                                    <Text className="paragraph-semibold text-dark-100">
                                        Find your favorite food
                                    </Text>
                                </View>
                            </View>
                            <CartButton />
                        </View>
                        <Text>Search Input</Text>
                        <Text>Filter</Text>
                    </View>
                )}
                ListEmptyComponent={() => !loading && <Text>NO Result</Text>}
            />
        </SafeAreaView>
    );
};

export default Search;
{
    /* <Button
                title="Seed Data"
                onPress={() =>
                    seed().catch((err) =>
                        console.log('failed to seed database', err)
                    )
                }
            /> */
}
