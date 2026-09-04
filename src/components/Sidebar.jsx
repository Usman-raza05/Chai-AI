import React, { useEffect, useRef, useState } from 'react';

import {
    Animated,
    Dimensions,
    Pressable,
    StyleSheet,
    Text,
    View,
    FlatList,
    Alert,
    TextInput,
    Image,
} from 'react-native';

import COLORS from '../theme/colors';
import chaiLogo from '../assets/chai-ai-logo.png';

const { width } = Dimensions.get('window');

const SIDEBAR_WIDTH =
    Math.min(width * 0.82, 340);


const Sidebar = ({
    visible = false,
    chats = [],
    activeChatId,
    onClose,
    onNewChat,
    onSelectChat,
    onDeleteChat,
    onRenameChat,
    onPinChat,
  onSettings,
    onHelp,
}) => {

    // ==================================================
    // ANIMATION
    // ==================================================

    const slideAnim = useRef(
        new Animated.Value(-SIDEBAR_WIDTH)
    ).current;

    const overlayAnim = useRef(
        new Animated.Value(0)
    ).current;


    // ==================================================
    // MENU STATE
    // ==================================================

    const [menuChatId, setMenuChatId] =
        useState(null);


    // ==================================================
    // SEARCH STATE - V6.7
    // ==================================================

    const [searchVisible, setSearchVisible] =
        useState(false);

    const [searchText, setSearchText] =
        useState('');


    // ==================================================
    // SIDEBAR ANIMATION
    // ==================================================

    useEffect(() => {

        if (visible) {

            Animated.parallel([

                Animated.spring(
                    slideAnim,
                    {
                        toValue: 0,

                        useNativeDriver: true,

                        damping: 22,

                        stiffness: 180,

                        mass: 0.8,
                    }
                ),

                Animated.timing(
                    overlayAnim,
                    {
                        toValue: 1,

                        duration: 220,

                        useNativeDriver: true,
                    }
                ),

            ]).start();

        } else {

            Animated.parallel([

                Animated.timing(
                    slideAnim,
                    {
                        toValue:
                            -SIDEBAR_WIDTH,

                        duration: 200,

                        useNativeDriver: true,
                    }
                ),

                Animated.timing(
                    overlayAnim,
                    {
                        toValue: 0,

                        duration: 180,

                        useNativeDriver: true,
                    }
                ),

            ]).start();

            setMenuChatId(null);

        }

    }, [
        visible,
        slideAnim,
        overlayAnim,
    ]);


    // ==================================================
    // SEARCH FILTER - V6.7
    // ==================================================

    const normalizedSearch =
        searchText
            .trim()
            .toLowerCase();


    const filteredChats =
        normalizedSearch
            ? chats.filter(chat => {

                const title =
                    String(
                        chat.title || ''
                    ).toLowerCase();


                const messageText =
                    Array.isArray(
                        chat.messages
                    )
                        ? chat.messages
                            .map(message =>
                                String(
                                    message?.content ||
                                    ''
                                )
                            )
                            .join(' ')
                            .toLowerCase()
                        : '';


                return (
                    title.includes(
                        normalizedSearch
                    ) ||
                    messageText.includes(
                        normalizedSearch
                    )
                );

            })
            : chats;


    // ==================================================
    // CLOSE MENU
    // ==================================================

    const closeMenu = () => {

        setMenuChatId(null);
    };


    // ==================================================
    // CLOSE SEARCH
    // ==================================================

    const closeSearch = () => {

        setSearchText('');

        setSearchVisible(false);

        setMenuChatId(null);
    };


    // ==================================================
    // DELETE CHAT
    // ==================================================

    const confirmDeleteChat = chat => {

        setMenuChatId(null);


        Alert.alert(
            'Delete conversation?',

            `Are you sure you want to delete "${chat.title ||
            'New conversation'
            }"?`,

            [
                {
                    text: 'Cancel',

                    style: 'cancel',
                },

                {
                    text: 'Delete',

                    style: 'destructive',

                    onPress: async () => {

                        try {

                            if (onDeleteChat) {

                                await onDeleteChat(
                                    chat.id
                                );
                            }

                        } catch (error) {

                            console.log(
                                'Delete chat error:',
                                error
                            );

                        }

                    },
                },

            ]
        );
    };


    // ==================================================
    // RENAME CHAT
    // ==================================================

    const confirmRenameChat = chat => {

        setMenuChatId(null);


        if (!onRenameChat) {
            return;
        }


        Alert.prompt(
            'Rename conversation',

            'Enter a new name for this conversation.',

            [
                {
                    text: 'Cancel',

                    style: 'cancel',
                },

                {
                    text: 'Save',

                    onPress: async newTitle => {

                        try {

                            if (
                                !newTitle ||
                                !newTitle.trim()
                            ) {
                                return;
                            }


                            await onRenameChat(
                                chat.id,
                                newTitle.trim()
                            );

                        } catch (error) {

                            console.log(
                                'Rename chat error:',
                                error
                            );

                        }

                    },
                },

            ],

            'plain-text',

            chat.title ||
            'New conversation'
        );
    };


    // ==================================================
    // PIN CHAT
    // ==================================================

    const handlePinChat = async chat => {

        setMenuChatId(null);


        try {

            if (onPinChat) {

                await onPinChat(
                    chat.id
                );
            }

        } catch (error) {

            console.log(
                'Pin chat error:',
                error
            );
        }
    };


    // ==================================================
    // SELECT CHAT
    // ==================================================

    const handleSelectChat = async chatId => {

        try {

            setMenuChatId(null);


            if (onSelectChat) {

                await onSelectChat(
                    chatId
                );
            }


            if (onClose) {

                onClose();
            }

        } catch (error) {

            console.log(
                'Select chat error:',
                error
            );
        }
    };


    // ==================================================
    // NEW CHAT
    // ==================================================

    const handleNewChat = async () => {

        try {

            setMenuChatId(null);


            if (onNewChat) {

                await onNewChat();
            }

        } catch (error) {

            console.log(
                'New chat error:',
                error
            );
        }
    };


    // ==================================================
    // CHAT ITEM
    // ==================================================

    const renderChat = ({
        item,
    }) => {

        const isActive =
            item.id === activeChatId;


        const isMenuOpen =
            item.id === menuChatId;


        const isPinned =
            item.pinned === true;


        return (

            <View
                style={styles.chatWrapper}
            >

                {/* ======================================
                    CHAT BUTTON
                ====================================== */}

                <Pressable

                    onPress={() => {

                        if (isMenuOpen) {

                            closeMenu();

                            return;
                        }

                        handleSelectChat(
                            item.id
                        );

                    }}

                    android_ripple={{
                        color: '#A87D38',
                    }}

                    style={({ pressed }) => [

                        styles.chatItem,

                        isActive &&
                        styles.activeChatItem,

                        pressed &&
                        styles.chatItemPressed,

                    ]}
                >

                    {/* CHAT ICON */}

                    <View
                        style={[
                            styles.chatIcon,

                            isActive &&
                            styles.activeChatIcon,
                        ]}
                    >

                        <Text
                            style={
                                styles.chatIconText
                            }
                        >
                            {isPinned ? '📌' : '✦'}
                        </Text>

                    </View>


                    {/* CHAT TEXT */}

                    <View
                        style={
                            styles.chatTextContainer
                        }
                    >

                        <View
                            style={
                                styles.titleRow
                            }
                        >

                            <Text

                                numberOfLines={1}

                                style={[
                                    styles.chatTitle,

                                    isActive &&
                                    styles.activeChatTitle,

                                    styles.chatTitleFlex,
                                ]}
                            >
                                {item.title ||
                                    'New conversation'}
                            </Text>


                            {isPinned && (

                                <Text
                                    style={
                                        styles.pinText
                                    }
                                >
                                    📌
                                </Text>

                            )}

                        </View>


                        <Text
                            numberOfLines={1}

                            style={
                                styles.chatPreview
                            }
                        >

                            {item.messages?.length

                                ? `${item.messages.length} ${item.messages.length === 1
                                    ? 'message'
                                    : 'messages'
                                }`

                                : 'New conversation'}

                        </Text>

                    </View>


                    {/* THREE DOT BUTTON */}

                    <Pressable

                        onPress={() => {

                            setMenuChatId(
                                isMenuOpen
                                    ? null
                                    : item.id
                            );

                        }}

                        hitSlop={8}

                        style={({ pressed }) => [

                            styles.moreButton,

                            pressed &&
                            styles.moreButtonPressed,

                        ]}
                    >

                        <Text
                            style={
                                styles.moreText
                            }
                        >
                            •••
                        </Text>

                    </Pressable>

                </Pressable>


                {/* ======================================
                    CHAT MENU
                ====================================== */}

                {isMenuOpen && (

                    <View
                        style={
                            styles.chatMenu
                        }
                    >

                        {/* PIN */}

                        <Pressable

                            onPress={() =>
                                handlePinChat(
                                    item
                                )
                            }

                            style={({ pressed }) => [

                                styles.menuItem,

                                pressed &&
                                styles.menuItemPressed,

                            ]}
                        >

                            <View
                                style={
                                    styles.menuIconBox
                                }
                            >

                                <Text
                                    style={
                                        styles.pinMenuIcon
                                    }
                                >
                                    {isPinned
                                        ? '📌'
                                        : '📍'}
                                </Text>

                            </View>


                            <Text
                                style={
                                    styles.menuText
                                }
                            >
                                {isPinned
                                    ? 'Unpin'
                                    : 'Pin'}
                            </Text>

                        </Pressable>


                        {/* RENAME */}

                        <Pressable

                            onPress={() =>
                                confirmRenameChat(
                                    item
                                )
                            }

                            style={({ pressed }) => [

                                styles.menuItem,

                                pressed &&
                                styles.menuItemPressed,

                            ]}
                        >

                            <View
                                style={
                                    styles.menuIconBox
                                }
                            >

                                <Text
                                    style={
                                        styles.renameIcon
                                    }
                                >
                                    ✎
                                </Text>

                            </View>


                            <Text
                                style={
                                    styles.menuText
                                }
                            >
                                Rename
                            </Text>

                        </Pressable>


                        {/* DELETE */}

                        <Pressable

                            onPress={() =>
                                confirmDeleteChat(
                                    item
                                )
                            }

                            style={({ pressed }) => [

                                styles.menuItem,

                                pressed &&
                                styles.menuItemPressed,

                            ]}
                        >

                            <View
                                style={
                                    styles.menuIconBox
                                }
                            >

                                <Text
                                    style={
                                        styles.deleteIcon
                                    }
                                >
                                    ×
                                </Text>

                            </View>


                            <Text
                                style={
                                    styles.deleteText
                                }
                            >
                                Delete
                            </Text>

                        </Pressable>

                    </View>

                )}

            </View>
        );
    };


    // ==================================================
    // HIDDEN
    // ==================================================

    if (!visible) {

        return null;
    }


    // ==================================================
    // RENDER
    // ==================================================

    return (

        <View
            style={
                styles.container
            }

            pointerEvents="box-none"
        >

            {/* ==========================================
                BACKDROP
            ========================================== */}

            <Animated.View

                style={[
                    styles.backdrop,

                    {
                        opacity:
                            overlayAnim.interpolate({

                                inputRange: [
                                    0,
                                    1,
                                ],

                                outputRange: [
                                    0,
                                    0.55,
                                ],

                            }),
                    },

                ]}
            >

                <Pressable

                    style={
                        StyleSheet.absoluteFill
                    }

                    onPress={() => {

                        closeMenu();

                        if (onClose) {
                            onClose();
                        }

                    }}
                />

            </Animated.View>


            {/* ==========================================
                SIDEBAR
            ========================================== */}

            <Animated.View

                style={[
                    styles.sidebar,

                    {
                        transform: [

                            {
                                translateX:
                                    slideAnim,
                            },

                        ],
                    },

                ]}
            >

                {/* ======================================
                    HEADER
                ====================================== */}

                <View
                    style={
                        styles.header
                    }
                >

                    <View
                        style={
                            styles.brandContainer
                        }
                    >

                        {/* LOGO */}

                        <View
                            style={
                                styles.logo
                            }
                        >

                            <Image
                                source={chaiLogo}
                                style={styles.logoImage}
                                resizeMode="contain"
                            />

                        </View>


                        {/* BRAND */}

                        <View>

                            <Text
                                style={
                                    styles.brand
                                }
                            >
                                CHAI AI
                            </Text>


                            <Text
                                style={
                                    styles.brandSubtitle
                                }
                            >
                                YOUR AI ASSISTANT
                            </Text>

                        </View>

                    </View>


                    {/* CLOSE BUTTON */}

                    <Pressable

                        onPress={() => {

                            closeMenu();

                            if (onClose) {
                                onClose();
                            }

                        }}

                        android_ripple={{
                            color: '#1C2A3D',
                        }}

                        style={({ pressed }) => [

                            styles.closeButton,

                            pressed &&
                            styles.closeButtonPressed,

                        ]}
                    >

                        <Text
                            style={
                                styles.closeText
                            }
                        >
                            ×
                        </Text>

                    </Pressable>

                </View>


                {/* ======================================
                    NEW CHAT
                ====================================== */}

                <Pressable

                    onPress={
                        handleNewChat
                    }

                    android_ripple={{
                        color: '#0A55C7',
                    }}

                    style={({ pressed }) => [

                        styles.newChatButton,

                        pressed &&
                        styles.newChatButtonPressed,

                    ]}
                >

                    <View
                        style={
                            styles.newChatIcon
                        }
                    >

                        <Text
                            style={
                                styles.plus
                            }
                        >
                            +
                        </Text>

                    </View>


                    <Text
                        style={
                            styles.newChatText
                        }
                    >
                        New conversation
                    </Text>

                </Pressable>


                {/* ======================================
                    SEARCH
                ====================================== */}

                {searchVisible ? (

                    <View
                        style={
                            styles.searchContainer
                        }
                    >

                        <Text
                            style={
                                styles.searchIcon
                            }
                        >
                            🔎
                        </Text>


                        <TextInput

                            value={
                                searchText
                            }

                            onChangeText={
                                setSearchText
                            }

                            placeholder={
                                'Search conversations...'
                            }

                            placeholderTextColor={
                                COLORS.textMuted
                            }

                            autoFocus={true}

                            returnKeyType="search"

                            style={
                                styles.searchInput
                            }

                        />


                        <Pressable

                            onPress={() => {

                                if (searchText) {

                                    setSearchText('');

                                } else {

                                    closeSearch();

                                }

                            }}

                            hitSlop={8}

                            style={
                                styles.searchCloseButton
                            }
                        >

                            <Text
                                style={
                                    styles.searchCloseText
                                }
                            >
                                ×
                            </Text>

                        </Pressable>

                    </View>

                ) : (

                    <Pressable

                        onPress={() =>
                            setSearchVisible(true)
                        }

                        style={({ pressed }) => [

                            styles.searchButton,

                            pressed &&
                            styles.searchButtonPressed,

                        ]}
                    >

                        <Text
                            style={
                                styles.searchButtonIcon
                            }
                        >
                            🔎
                        </Text>


                        <Text
                            style={
                                styles.searchButtonText
                            }
                        >
                            Search conversations
                        </Text>

                    </Pressable>

                )}


                {/* ======================================
                    RECENT HEADER
                ====================================== */}

                <View
                    style={
                        styles.historyHeader
                    }
                >

                    <Text
                        style={
                            styles.sectionTitle
                        }
                    >
                        {normalizedSearch
                            ? 'SEARCH RESULTS'
                            : 'RECENT'}
                    </Text>


                    {filteredChats.length > 0 && (

                        <View
                            style={
                                styles.countBadge
                            }
                        >

                            <Text
                                style={
                                    styles.count
                                }
                            >
                                {filteredChats.length}
                            </Text>

                        </View>

                    )}

                </View>


                {/* ======================================
                    CHAT HISTORY
                ====================================== */}

                <FlatList

                    data={
                        filteredChats
                    }

                    renderItem={
                        renderChat
                    }

                    keyExtractor={
                        item =>
                            String(item.id)
                    }

                    showsVerticalScrollIndicator={
                        false
                    }

                    contentContainerStyle={
                        styles.chatList
                    }

                    keyboardShouldPersistTaps="handled"

                    ListEmptyComponent={

                        <View
                            style={
                                styles.emptyHistory
                            }
                        >

                            <View
                                style={
                                    styles.emptyIcon
                                }
                            >

                                <Text
                                    style={
                                        styles.emptyIconText
                                    }
                                >
                                    {normalizedSearch
                                        ? '🔎'
                                        : '✦'}
                                </Text>

                            </View>


                            <Text
                                style={
                                    styles.emptyTitle
                                }
                            >
                                {normalizedSearch
                                    ? 'No conversations found'
                                    : 'No conversations yet'}
                            </Text>


                            <Text
                                style={
                                    styles.emptyText
                                }
                            >
                                {normalizedSearch

                                    ? `No conversation matches "${searchText}".`

                                    : 'Start a conversation and it will appear here.'}

                            </Text>

                        </View>
                    }

                />


                {/* ======================================
                    BOTTOM SECTION
                ====================================== */}

                <View
                    style={
                        styles.bottomSection
                    }
                >

                    <View
                        style={
                            styles.divider
                        }
                    />


                    {/* SETTINGS */}

                    <Pressable                            
                            onPress={onSettings}
                        style={({ pressed }) => [

                            styles.bottomItem,

                            pressed &&
                            styles.bottomItemPressed,

                        ]}
                    >

                        <Text
                            style={
                                styles.bottomIcon
                            }
                        >
                            ⚙
                        </Text>


                        <Text
                            style={
                                styles.bottomText
                            }
                        >
                            Settings
                        </Text>

                    </Pressable>


                    {/* HELP */}

                    <Pressable

                        onPress={onHelp}

                        style={({ pressed }) => [

                            styles.bottomItem,

                            pressed &&
                            styles.bottomItemPressed,

                        ]}
                    >

                        <Text
                            style={
                                styles.bottomIcon
                            }
                        >
                            ?
                        </Text>


                        <Text
                            style={
                                styles.bottomText
                            }
                        >
                            Help & feedback
                        </Text>

                    </Pressable>


                    {/* PROFILE */}

                    <View
                        style={
                            styles.profile
                        }
                    >

                        <View
                            style={
                                styles.logo
                            }
                        >

                            <Image
                                source={chaiLogo}
                                style={styles.logoImage}
                                resizeMode="contain"
                            />

                        </View>


                        <View
                            style={
                                styles.profileText
                            }
                        >

                            <Text
                                style={
                                    styles.profileName
                                }
                            >
                                CHAI AI
                            </Text>


                            <Text
                                style={
                                    styles.profileSubtitle
                                }
                            >
                                Personal assistant
                            </Text>

                        </View>


                        <View
                            style={
                                styles.onlineDot
                            }
                        />

                    </View>

                </View>

            </Animated.View>

        </View>
    );
};


// ======================================================
// STYLES
// ======================================================

const styles = StyleSheet.create({

    container: {

        position: 'absolute',

        top: 0,

        left: 0,

        right: 0,

        bottom: 0,

        zIndex: 9999,

        elevation: 9999,
    },


    backdrop: {

        position: 'absolute',

        top: 0,

        left: 0,

        right: 0,

        bottom: 0,

        backgroundColor:
            '#000000',

        zIndex: 1,
    },


    sidebar: {

        position: 'absolute',

        left: 0,

        top: 0,

        bottom: 0,

        width:
            SIDEBAR_WIDTH,

        backgroundColor:
            COLORS.bg,

        borderRightWidth: 1,

        borderRightColor:
            COLORS.border,

        paddingTop: 24,

        paddingHorizontal: 16,

        zIndex: 2,

        elevation: 30,

        shadowColor:
            '#000000',

        shadowOffset: {

            width: 8,

            height: 0,

        },

        shadowOpacity:
            0.4,

        shadowRadius:
            18,

    },

    header: {

        height: 58,

        flexDirection:
            'row',

        alignItems:
            'center',

        justifyContent:
            'space-between',

        marginBottom: 18,
    },


    brandContainer: {

        flexDirection:
            'row',

        alignItems:
            'center',
    },


    logo: {

        width: 38,

        height: 38,

        borderRadius: 12,

        alignItems:
            'center',

        justifyContent:
            'center',

        backgroundColor:
            '#F4E7D0',

        marginRight: 11,

        overflow:
            'hidden',

        borderWidth:
            1,

        borderColor:
            COLORS.primary,

    },

    logoImage: {

        width:
            '115%',

        height:
            '115%',

    },

    brand: {

        color:
            COLORS.white,

        fontSize: 17,

        fontWeight:
            '800',

        letterSpacing: 1.2,

    },

    brandSubtitle: {

        color:
            COLORS.textMuted,

        fontSize: 8,

        fontWeight:
            '700',

        letterSpacing: 1.3,

        marginTop: 2,

    },


    closeButton: {

        width: 38,

        height: 38,

        borderRadius: 12,

        alignItems:
            'center',

        justifyContent:
            'center',

        backgroundColor:
            COLORS.surfaceLight,

        overflow: 'hidden',
        paddingBottom: 5,
    },

    closeButtonPressed: {

        backgroundColor:
            '#38261B',

    },

    closeText: {

        color:
            COLORS.textSecondary,

        fontSize: 28,

        fontWeight:
            '300',

        lineHeight: 30,

    },


    newChatButton: {

        height: 54,

        borderRadius: 16,

        flexDirection:
            'row',

        alignItems:
            'center',

        paddingHorizontal: 10,

        backgroundColor:
            COLORS.primary,

        marginBottom: 12,

        overflow: 'hidden',

    },

    newChatButtonPressed: {

        backgroundColor:
            '#A87D38',

    },

    newChatIcon: {

        width: 34,

        height: 34,

        borderRadius: 11,

        alignItems:
            'center',

        justifyContent:
            'center',

        backgroundColor:
            'rgba(255,255,255,0.18)',

        marginRight: 10,

    },

    plus: {

        color:
            '#FFF8ED',

        fontSize: 23,

        fontWeight:
            '300',

    },

    newChatText: {

        color:
            '#FFF8ED',

        fontSize: 14,

        fontWeight:
            '700',

    },


    // ==================================================
    // SEARCH
    // ==================================================

    searchButton: {

        height: 46,

        borderRadius: 13,

        flexDirection:
            'row',

        alignItems:
            'center',

        paddingHorizontal: 12,

        backgroundColor:
            COLORS.surface,

        borderWidth: 1,

        borderColor:
            COLORS.border,

        marginBottom: 18,

    },


    searchButtonPressed: {

        backgroundColor:
            COLORS.surfaceLight,

        borderColor:
            '#68482B',

    },


    searchButtonIcon: {

        fontSize: 15,

        marginRight: 9,
    },


    searchButtonText: {

        color:
            COLORS.textSecondary,

        fontSize: 12,

        fontWeight:
            '600',

    },


    searchContainer: {

        height: 46,

        borderRadius: 13,

        flexDirection:
            'row',

        alignItems:
            'center',

        paddingHorizontal: 10,

        backgroundColor:
            COLORS.surface,

        borderWidth: 1,

        borderColor:
            COLORS.primary,

        marginBottom: 18,

    },


    searchIcon: {

        fontSize: 15,

        marginRight: 7,
    },


    searchInput: {

        flex: 1,

        color:
            COLORS.text,

        fontSize: 12,

        paddingVertical: 0,

    },

    searchCloseButton: {

        width: 30,

        height: 30,

        borderRadius: 9,

        alignItems:
            'center',

        justifyContent:
            'center',
    },


    searchCloseText: {

        color:
            '#718096',

        fontSize: 22,

        fontWeight:
            '300',

        lineHeight: 24,
    },


    historyHeader: {

        flexDirection:
            'row',

        alignItems:
            'center',

        justifyContent:
            'space-between',

        paddingHorizontal: 5,

        marginBottom: 10,
    },


    sectionTitle: {

        color:
            COLORS.textMuted,

        fontSize: 10,

        fontWeight:
            '800',

        letterSpacing: 1.6,

    },


    countBadge: {

        minWidth: 20,

        height: 20,

        paddingHorizontal: 5,

        borderRadius: 10,

        alignItems:
            'center',

        justifyContent:
            'center',

        backgroundColor:
            COLORS.surfaceLight,

    },


    count: {

        color:
            COLORS.primaryLight,

        fontSize: 9,

        fontWeight:
            '700',
    },


    chatList: {

        paddingBottom: 20,
    },


    chatWrapper: {

        position: 'relative',

        marginBottom: 5,
    },


    chatItem: {

        minHeight: 58,

        borderRadius: 14,

        flexDirection:
            'row',

        alignItems:
            'center',

        paddingHorizontal: 9,

        overflow: 'hidden',
    },


    chatItemPressed: {

        backgroundColor:
            '#2A1D16',
    },


    activeChatItem: {

        backgroundColor:
            '#2A1D16',

        borderWidth: 1,

        borderColor:
            '#68482B',

    },


    chatIcon: {

        width: 34,

        height: 34,

        borderRadius: 10,

        alignItems:
            'center',

        justifyContent:
            'center',

        backgroundColor:
            COLORS.surfaceLight,

        marginRight: 10,

    },

    activeChatIcon: {

        backgroundColor:
            COLORS.primary,

    },

    chatIconText: {

        color:
            COLORS.textMuted,

        fontSize: 14,

    },


    chatTextContainer: {

        flex: 1,

        marginRight: 4,
    },


    titleRow: {

        flexDirection:
            'row',

        alignItems:
            'center',

        width: '100%',
    },


    chatTitleFlex: {

        flex: 1,
    },


    chatTitle: {

        color:
            '#C8B8A5',

        fontSize: 13,

        fontWeight:
            '600',
    },


    activeChatTitle: {

        color:
            COLORS.white,

    },


    pinText: {

        fontSize: 9,

        marginLeft: 5,
    },


    chatPreview: {

    color:
        COLORS.textMuted,

    fontSize: 10,

    marginTop: 4,

},


    moreButton: {

        width: 34,

        height: 40,

        borderRadius: 10,

        alignItems:
            'center',

        justifyContent:
            'center',
    },


   moreButtonPressed: {

    backgroundColor:
        '#38261B',

},

moreText: {

    color:
        '#A89076',

    fontSize: 13,

    fontWeight:
        '800',

    letterSpacing: 1,

},


    // ==================================================
    // MENU
    // ==================================================

    chatMenu: {

    position: 'absolute',

    right: 5,

    top: 54,

    width: 145,

    borderRadius: 12,

    backgroundColor:
        '#241914',

    borderWidth: 1,

    borderColor:
        COLORS.border,

    padding: 5,

    zIndex: 100,

    elevation: 15,

    shadowColor:
        '#000000',

    shadowOffset: {

        width: 0,

        height: 5,

    },

    shadowOpacity:
        0.35,

    shadowRadius:
        10,

},


    menuItem: {

        height: 42,

        borderRadius: 9,

        flexDirection:
            'row',

        alignItems:
            'center',

        paddingHorizontal: 7,
    },


    menuItemPressed: {

    backgroundColor:
        '#342319',

},

menuIconBox: {

    width: 30,

    height: 30,

    borderRadius: 8,

    alignItems:
        'center',

    justifyContent:
        'center',

    backgroundColor:
        COLORS.surfaceLight,

    marginRight: 7,

},

menuText: {

    color:
        '#D8C9B8',

    fontSize: 12,

    fontWeight:
        '700',

},

renameIcon: {

    color:
        COLORS.primaryLight,

    fontSize: 17,

},

deleteIcon: {

    color:
        '#D95C4F',

    fontSize: 20,

    fontWeight:
        '300',

    lineHeight: 20,

},

deleteText: {

    color:
        '#E06A5D',

    fontSize: 12,

    fontWeight:
        '700',

},

    emptyHistory: {

        alignItems:
            'center',

        paddingHorizontal: 20,

        paddingTop: 30,
    },


   emptyIcon: {

    width: 48,

    height: 48,

    borderRadius: 16,

    alignItems:
        'center',

    justifyContent:
        'center',

    backgroundColor:
        COLORS.surfaceLight,

    marginBottom: 12,

    borderWidth:
        1,

    borderColor:
        COLORS.border,

},

emptyIconText: {

    color:
        COLORS.primary,

    fontSize: 18,

},

emptyTitle: {

    color:
        '#C8B8A5',

    fontSize: 12,

    fontWeight:
        '700',

    textAlign:
        'center',

},

emptyText: {

    color:
        COLORS.textMuted,

    fontSize: 10,

    lineHeight: 15,

    textAlign:
        'center',

    marginTop: 6,

},


    bottomSection: {

        paddingBottom: 10,
    },


   divider: {

    height: 1,

    backgroundColor:
        COLORS.border,

    marginBottom: 10,

},


    bottomItem: {

        height: 42,

        borderRadius: 11,

        flexDirection:
            'row',

        alignItems:
            'center',

        paddingHorizontal: 9,
    },


   bottomItemPressed: {

    backgroundColor:
        COLORS.surfaceLight,

},

bottomIcon: {

    width: 30,

    color:
        COLORS.textMuted,

    fontSize: 17,

    textAlign:
        'center',

    marginRight: 5,

},

bottomText: {

    color:
        COLORS.textSecondary,

    fontSize: 12,

    fontWeight:
        '600',

},


   profile: {

    height: 58,

    borderRadius: 15,

    backgroundColor:
        COLORS.surface,

    borderWidth: 1,

    borderColor:
        COLORS.border,

    flexDirection:
        'row',

    alignItems:
        'center',

    paddingHorizontal: 9,

    marginTop: 8,

},


    avatar: {

    width: 34,

    height: 34,

    borderRadius: 11,

    backgroundColor:
        '#F4E7D0',

    alignItems:
        'center',

    justifyContent:
        'center',

    marginRight: 9,

    overflow:
        'hidden',

},

avatarImage: {

    width:
        '100%',

    height:
        '100%',

},


    profileText: {

        flex: 1,
    },


    profileName: {

    color:
        COLORS.text,

    fontSize: 12,

    fontWeight:
        '700',

},

profileSubtitle: {

    color:
        COLORS.textMuted,

    fontSize: 9,

    marginTop: 3,

},


    onlineDot: {

        width: 7,

        height: 7,

        borderRadius: 4,

        backgroundColor:
            '#2ED573',
    },

});


export default Sidebar;