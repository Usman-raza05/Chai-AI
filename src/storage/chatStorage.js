import AsyncStorage from '@react-native-async-storage/async-storage';

const CHATS_KEY = '@nova_chats';
const ACTIVE_CHAT_KEY = '@nova_active_chat';

/*
|--------------------------------------------------------------------------
| Get all chats
|--------------------------------------------------------------------------
*/

export const getChats = async () => {
    try {
        const data =
            await AsyncStorage.getItem(CHATS_KEY);

        if (!data) {
            return [];
        }

        return JSON.parse(data);

    } catch (error) {

        console.log(
            'Error loading chats:',
            error
        );

        return [];
    }
};


/*
|--------------------------------------------------------------------------
| Save all chats
|--------------------------------------------------------------------------
*/

export const saveChats = async chats => {

    try {

        await AsyncStorage.setItem(
            CHATS_KEY,
            JSON.stringify(chats)
        );

    } catch (error) {

        console.log(
            'Error saving chats:',
            error
        );
    }
};


/*
|--------------------------------------------------------------------------
| Get active chat ID
|--------------------------------------------------------------------------
*/

export const getActiveChatId = async () => {

    try {

        return await AsyncStorage.getItem(
            ACTIVE_CHAT_KEY
        );

    } catch (error) {

        console.log(
            'Error loading active chat:',
            error
        );

        return null;
    }
};


/*
|--------------------------------------------------------------------------
| Set active chat ID
|--------------------------------------------------------------------------
*/

export const setActiveChatId = async chatId => {

    try {

        if (!chatId) {
            await AsyncStorage.removeItem(
                ACTIVE_CHAT_KEY
            );

            return;
        }

        await AsyncStorage.setItem(
            ACTIVE_CHAT_KEY,
            String(chatId)
        );

    } catch (error) {

        console.log(
            'Error saving active chat:',
            error
        );
    }
};


/*
|--------------------------------------------------------------------------
| Create a new chat
|--------------------------------------------------------------------------
*/

export const createChat = async () => {

    const chats =
        await getChats();

    const now =
        Date.now();

    const newChat = {

        id:
            `chat-${now}`,

        title:
            'New conversation',

        messages: [],

        createdAt:
            now,

        updatedAt:
            now,

        /*
         * V6.6
         * New conversations are
         * unpinned by default.
         */

        pinned:
            false,
    };


    const updatedChats = [

        newChat,

        ...chats,
    ];


    await saveChats(
        updatedChats
    );


    await setActiveChatId(
        newChat.id
    );


    return newChat;
};


/*
|--------------------------------------------------------------------------
| Get a single chat
|--------------------------------------------------------------------------
*/

export const getChat = async chatId => {

    const chats =
        await getChats();

    return (

        chats.find(
            chat =>
                chat.id === chatId
        ) || null

    );
};


/*
|--------------------------------------------------------------------------
| Update chat messages
|--------------------------------------------------------------------------
*/

export const updateChatMessages = async (
    chatId,
    messages
) => {

    const chats =
        await getChats();


    const updatedChats =
        chats.map(chat => {

            if (
                chat.id !== chatId
            ) {

                return chat;
            }


            let title =
                chat.title;


            /*
             * Automatically create a title
             * from the first user message.
             */

            if (

                (
                    !title ||
                    title ===
                        'New conversation'
                )

                &&

                messages.length > 0

            ) {

                const firstUserMessage =
                    messages.find(
                        message =>
                            message.role ===
                            'user'
                    );


                if (
                    firstUserMessage
                ) {

                    title =
                        firstUserMessage
                            .content
                            .trim()
                            .slice(
                                0,
                                35
                            );


                    if (

                        firstUserMessage
                            .content
                            .trim()
                            .length > 35

                    ) {

                        title +=
                            '...';
                    }
                }
            }


            return {

                ...chat,

                title,

                messages,

                updatedAt:
                    Date.now(),

                /*
                 * Preserve pin state.
                 *
                 * This is important because
                 * updating messages must NOT
                 * accidentally unpin a chat.
                 */

                pinned:
                    chat.pinned === true,
            };
        });


    await saveChats(
        updatedChats
    );
};


/*
|--------------------------------------------------------------------------
| Rename chat
|--------------------------------------------------------------------------
*/

export const renameChat = async (
    chatId,
    newTitle
) => {

    const chats =
        await getChats();


    const cleanTitle =
        newTitle?.trim();


    if (!cleanTitle) {
        return;
    }


    const updatedChats =
        chats.map(chat => {

            if (
                chat.id === chatId
            ) {

                return {

                    ...chat,

                    title:
                        cleanTitle,

                    updatedAt:
                        Date.now(),

                };
            }


            return chat;
        });


    await saveChats(
        updatedChats
    );
};


/*
|--------------------------------------------------------------------------
| Pin chat
|--------------------------------------------------------------------------
|
| V6.6
|
| pinned = true
|
| The chat list is also sorted so
| pinned conversations appear first.
|
|--------------------------------------------------------------------------
*/

export const pinChat = async chatId => {

    const chats =
        await getChats();


    const updatedChats =
        chats.map(chat => {

            if (
                chat.id === chatId
            ) {

                return {

                    ...chat,

                    pinned:
                        true,

                    updatedAt:
                        Date.now(),

                };
            }


            return {

                ...chat,

                pinned:
                    chat.pinned === true,

            };
        });


    /*
     * Pinned chats first.
     *
     * Within the same group,
     * keep the newest updated chat first.
     */

    updatedChats.sort(
        (a, b) => {

            if (
                a.pinned &&
                !b.pinned
            ) {

                return -1;
            }


            if (
                !a.pinned &&
                b.pinned
            ) {

                return 1;
            }


            return (
                (b.updatedAt || 0) -
                (a.updatedAt || 0)
            );
        }
    );


    await saveChats(
        updatedChats
    );
};


/*
|--------------------------------------------------------------------------
| Unpin chat
|--------------------------------------------------------------------------
*/

export const unpinChat = async chatId => {

    const chats =
        await getChats();


    const updatedChats =
        chats.map(chat => {

            if (
                chat.id === chatId
            ) {

                return {

                    ...chat,

                    pinned:
                        false,

                    updatedAt:
                        Date.now(),

                };
            }


            return {

                ...chat,

                pinned:
                    chat.pinned === true,

            };
        });


    /*
     * Re-sort after unpinning.
     */

    updatedChats.sort(
        (a, b) => {

            if (
                a.pinned &&
                !b.pinned
            ) {

                return -1;
            }


            if (
                !a.pinned &&
                b.pinned
            ) {

                return 1;
            }


            return (
                (b.updatedAt || 0) -
                (a.updatedAt || 0)
            );
        }
    );


    await saveChats(
        updatedChats
    );
};


/*
|--------------------------------------------------------------------------
| Toggle pin
|--------------------------------------------------------------------------
*/

export const togglePinChat = async chatId => {

    const chat =
        await getChat(
            chatId
        );


    if (!chat) {
        return;
    }


    if (
        chat.pinned === true
    ) {

        await unpinChat(
            chatId
        );

    } else {

        await pinChat(
            chatId
        );
    }
};


/*
|--------------------------------------------------------------------------
| Delete chat
|--------------------------------------------------------------------------
*/

export const deleteChat = async chatId => {

    const chats =
        await getChats();


    const updatedChats =
        chats.filter(
            chat =>
                chat.id !== chatId
        );


    await saveChats(
        updatedChats
    );


    const activeChatId =
        await getActiveChatId();


    if (
        activeChatId ===
        chatId
    ) {

        if (
            updatedChats.length > 0
        ) {

            await setActiveChatId(
                updatedChats[0].id
            );

        } else {

            await AsyncStorage.removeItem(
                ACTIVE_CHAT_KEY
            );
        }
    }
};


/*
|--------------------------------------------------------------------------
| Clear everything
|--------------------------------------------------------------------------
*/

export const clearAllChats = async () => {

    try {

        await AsyncStorage.multiRemove([

            CHATS_KEY,

            ACTIVE_CHAT_KEY,

        ]);

    } catch (error) {

        console.log(
            'Error clearing chats:',
            error
        );
    }
};


/*
|--------------------------------------------------------------------------
| OLD COMPATIBILITY FUNCTIONS
|--------------------------------------------------------------------------
|
| These keep ChatScreen compatible.
|
|--------------------------------------------------------------------------
*/

export const saveMessages = async messages => {

    try {

        const activeChatId =
            await getActiveChatId();


        if (!activeChatId) {

            const newChat =
                await createChat();


            await updateChatMessages(

                newChat.id,

                messages

            );


            return;
        }


        await updateChatMessages(

            activeChatId,

            messages

        );

    } catch (error) {

        console.log(
            'Error saving messages:',
            error
        );
    }
};


/*
|--------------------------------------------------------------------------
| Load messages
|--------------------------------------------------------------------------
*/

export const loadMessages = async () => {

    try {

        const activeChatId =
            await getActiveChatId();


        if (!activeChatId) {

            const newChat =
                await createChat();


            return newChat.messages;
        }


        const chat =
            await getChat(
                activeChatId
            );


        return (

            chat?.messages || []

        );

    } catch (error) {

        console.log(
            'Error loading messages:',
            error
        );

        return [];
    }
};


/*
|--------------------------------------------------------------------------
| Clear messages
|--------------------------------------------------------------------------
*/

export const clearMessages = async () => {

    try {

        const activeChatId =
            await getActiveChatId();


        if (!activeChatId) {
            return;
        }


        await updateChatMessages(

            activeChatId,

            []

        );

    } catch (error) {

        console.log(
            'Error clearing messages:',
            error
        );
    }
};