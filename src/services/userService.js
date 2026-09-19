import getUserId from './userStorage';

// const API_URL = 'https://chai-ai-backend.onrender.com';
const API_URL = 'https://chai-ai-backend-zm0l.onrender.com';

const registerUser = async () => {
    try {
        const userId = await getUserId();

        const response = await fetch(
            `${API_URL}/api/users`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: userId,
                    name: 'Chai User',
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data?.error ||
                `User registration failed: ${response.status}`
            );
        }

        console.log(
            '✅ Chai AI User:',
            data.user
        );

        return data.user;
    } catch (error) {
        console.error(
            '❌ User Registration Error:',
            error
        );

        throw error;
    }
};

export default registerUser;