import 'react-native-get-random-values';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

const USER_ID_KEY = '@chai_ai_user_id';

const getUserId = async () => {
    try {
        let userId = await AsyncStorage.getItem(USER_ID_KEY);

        if (!userId) {
            userId = uuidv4();

            await AsyncStorage.setItem(
                USER_ID_KEY,
                userId
            );

            console.log('🆔 New Chai AI User ID:', userId);
        } else {
            console.log('🆔 Existing Chai AI User ID:', userId);
        }

        return userId;
    } catch (error) {
        console.error(
            'User ID Error:',
            error
        );

        throw error;
    }
};

export default getUserId;