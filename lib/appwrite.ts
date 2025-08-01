import { CreateUserParams, SignInParams } from '@/type';
import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
} from 'react-native-appwrite';

export const appwriteConfig = {
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    platform: 'com.Ryan.FoodDeli',
    databaseId: '688b23e7000130eb9bed',
    userCollectionId: '688b24d40037681973f5',
};

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint!)
    .setProject(appwriteConfig.projectId!)
    .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const database = new Databases(client);
const avatars = new Avatars(client);

export const signIn = async ({ email, password }: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(
            email,
            password
        );
    } catch (e) {
        throw new Error(e as string);
    }
};

export const createUser = async ({
    email,
    password,
    name,
}: CreateUserParams) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            name
        );
        if (!newAccount) throw Error;

        await signIn({ email, password });

        const avatarUrl = avatars.getInitialsURL(name);

        const newUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            { email, name, accountId: newAccount.$id, avatar: avatarUrl }
        );

        return newUser;
    } catch (e) {
        throw new Error(e as string);
    }
};

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;
        const currentUser = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );
        if (!currentUser) throw Error;
        return currentUser.documents[0];
    } catch (e) {
        console.log(e);
        throw new Error(e as string);
    }
};
