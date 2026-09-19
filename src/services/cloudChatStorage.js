import AsyncStorage from '@react-native-async-storage/async-storage';

import getUserId from './userStorage';

import {
    createChat,
    getChats,
    saveMessage,
    getMessages,
} from './chatService';

const CLOUD_CHAT_MAP_KEY = '@chai_cloud_chat_map';

const getCloudChatMap = async () => {
    try {
        const data = await AsyncStorage.getItem(
            CLOUD_CHAT_MAP_KEY
        );

        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.log(
            'Error loading cloud chat map:',
            error
        );

        return {};
    }
};

const saveCloudChatMap = async map => {
    await AsyncStorage.setItem(
        CLOUD_CHAT_MAP_KEY,
        JSON.stringify(map)
    );
};


// Get cloud chat ID for local chat ID
export const getCloudChatId = async localChatId => {
    const map = await getCloudChatMap();

    return map[localChatId] || null;
};


// Link local chat with cloud chat
export const linkCloudChat = async (
    localChatId,
    cloudChatId
) => {
    const map = await getCloudChatMap();

    map[localChatId] = cloudChatId;

    await saveCloudChatMap(map);

    return cloudChatId;
};


// Create cloud chat for a local chat
export const createCloudChat = async (
    localChatId,
    title = 'New Conversation'
) => {
    try {
        const existingCloudChatId =
            await getCloudChatId(localChatId);

        if (existingCloudChatId) {
            return existingCloudChatId;
        }

        const userId = await getUserId();

        const cloudChat = await createChat(
            userId,
            title
        );

        await linkCloudChat(
            localChatId,
            cloudChat.id
        );

        console.log(
            '☁️ Cloud chat created:',
            cloudChat.id
        );

        return cloudChat.id;
    } catch (error) {
        console.log(
            'Cloud chat creation failed:',
            error
        );

        return null;
    }
};


// Save a message to cloud
export const saveCloudMessage = async (
    localChatId,
    role,
    content
) => {
    try {
        let cloudChatId =
            await getCloudChatId(localChatId);

        if (!cloudChatId) {
            cloudChatId =
                await createCloudChat(
                    localChatId
                );
        }

        if (!cloudChatId) {
            return null;
        }

        const message = await saveMessage(
            cloudChatId,
            role,
            content
        );

        console.log(
            '☁️ Message saved:',
            message.id
        );

        return message;
    } catch (error) {
        console.log(
            'Cloud message save failed:',
            error
        );

        return null;
    }
};


// Load messages from cloud
export const loadCloudMessages = async localChatId => {
    try {
        const cloudChatId =
            await getCloudChatId(localChatId);

        if (!cloudChatId) {
            return [];
        }

        return await getMessages(
            cloudChatId
        );
    } catch (error) {
        console.log(
            'Cloud message loading failed:',
            error
        );

        return [];
    }
};


// Load all cloud chats
export const loadCloudChats = async () => {
    try {
        const userId = await getUserId();

        return await getChats(userId);
    } catch (error) {
        console.log(
            'Cloud chats loading failed:',
            error
        );

        return [];
    }
};