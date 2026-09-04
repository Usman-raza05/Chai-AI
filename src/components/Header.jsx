import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';

import COLORS from '../theme/colors';
import chaiLogo from '../assets/chai-ai-logo.png';

const Header = ({
    onNewChat,
    onMenu,
    onOpenSettings,
}) => {

    return (

        <View style={styles.header}>

            {/* ==========================================
                MENU
            ========================================== */}

            <TouchableOpacity
                style={styles.iconButton}
                onPress={onMenu}
                activeOpacity={0.7}
            >

                <Text style={styles.menuIcon}>
                    ☰
                </Text>

            </TouchableOpacity>


            {/* ==========================================
                TITLE
            ========================================== */}

            <View style={styles.titleContainer}>

                <View style={styles.logo}>

                    <Image
                        source={chaiLogo}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />

                </View>
                
                <View>
                    <Text style={styles.title}>
                        Chai AI
                    </Text>
                    <Text style={styles.subtitle}>
                        Your AI Assistant
                    </Text>
                </View>
            </View>


            {/* ==========================================
                RIGHT BUTTONS
            ========================================== */}

            <View style={styles.rightContainer}>

                {/* SETTINGS */}

                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={onOpenSettings}
                    activeOpacity={0.7}
                >

                    <Text style={styles.icon}>
                        ⚙
                    </Text>

                </TouchableOpacity>


                {/* NEW CHAT */}

                <TouchableOpacity
                    style={styles.newChatButton}
                    onPress={onNewChat}
                    activeOpacity={0.8}
                >

                    <Text style={styles.newChatIcon}>
                        +
                    </Text>

                </TouchableOpacity>

            </View>

        </View>

    );
};


// ======================================================
// STYLES
// ======================================================

const styles = StyleSheet.create({

    header: {

        height: 64,

        paddingHorizontal: 12,

        flexDirection: 'row',

        alignItems: 'center',

        borderBottomWidth: 1,

        borderBottomColor:
            COLORS.border,

        backgroundColor:
            COLORS.bg,

    },


    // ====================================================
    // ICON BUTTON
    // ====================================================

    iconButton: {

        width: 40,

        height: 40,

        borderRadius: 12,

        justifyContent: 'center',

        alignItems: 'center',

    },


    menuIcon: {

        color:
            COLORS.text,

        fontSize: 22,

        fontWeight: '600',

    },


    icon: {

        color:
            COLORS.text,

        fontSize: 20,

    },


    // ====================================================
    // TITLE
    // ====================================================

    titleContainer: {

        flex: 1,

        flexDirection: 'row',

        alignItems: 'center',

        marginLeft: 5,

    },


    logo: {
        width: 40,
        height: 40,
        borderRadius: 12,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        backgroundColor: '#F4E7D0',
    },

    logoImage: {
        width: '120%',
        height: '120%',
    },

    logoText: {

        color:
            COLORS.white,

        fontSize: 20,

        fontWeight: '800',

    },


    title: {

        color:
            COLORS.white,

        fontSize: 17,

        fontWeight: '800',

    },


    subtitle: {

        color:
            COLORS.textMuted,

        fontSize: 10,

        marginTop: 1,

    },


    // ====================================================
    // RIGHT
    // ====================================================

    rightContainer: {

        flexDirection: 'row',

        alignItems: 'center',

    },


    // ====================================================
    // NEW CHAT
    // ====================================================

    newChatButton: {

        width: 40,

        height: 40,

        borderRadius: 12,

        backgroundColor:
            COLORS.primary,

        justifyContent: 'center',

        alignItems: 'center',

        marginLeft: 3,

    },


    newChatIcon: {

        color:
            COLORS.white,

        fontSize: 27,

        fontWeight: '400',

        marginTop: -2,

    },

});


export default Header;