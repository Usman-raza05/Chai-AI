// const API_URL = 'https://chai-ai-backend.onrender.com';
const API_URL = 'https://chai-ai-backend-zm0l.onrender.com';

const createChat = async (userId, title = 'New Conversation') => {
    const response = await fetch(`${API_URL}/api/chats`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId,
            title,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data?.error || 'Failed to create chat'
        );
    }

    return data.chat;
};

const getChats = async (userId) => {
    const response = await fetch(
        `${API_URL}/api/chats/${userId}`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data?.error || 'Failed to fetch chats'
        );
    }

    return data.chats || [];
};

const saveMessage = async (
    chatId,
    role,
    content
) => {
    const response = await fetch(
        `${API_URL}/api/messages`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chatId,
                role,
                content,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data?.error || 'Failed to save message'
        );
    }

    return data.message;
};

const getMessages = async (chatId) => {
    const response = await fetch(
        `${API_URL}/api/chats/${chatId}/messages`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data?.error || 'Failed to fetch messages'
        );
    }

    return data.messages || [];
};

export {
    createChat,
    getChats,
    saveMessage,
    getMessages,
};