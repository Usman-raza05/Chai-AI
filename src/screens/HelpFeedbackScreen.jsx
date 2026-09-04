import React from 'react';
import {
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import COLORS from '../theme/colors';

const HelpFeedbackScreen = ({
    visible = false,
    onClose,
}) => {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <SafeAreaView style={styles.container}>
                
                {/* HEADER */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.backButton}
                    >
                        <Text style={styles.backText}>‹</Text>
                    </TouchableOpacity>

                    <View>
                        <Text style={styles.title}>
                            Help & Feedback
                        </Text>

                        <Text style={styles.subtitle}>
                            Chai AI Support
                        </Text>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                >

                    {/* INTRO */}
                    <View style={styles.heroCard}>
                        <Text style={styles.heroIcon}>☕</Text>

                        <Text style={styles.heroTitle}>
                            How can we help?
                        </Text>

                        <Text style={styles.heroText}>
                            Find answers, learn about Chai AI,
                            or share your feedback with us.
                        </Text>
                    </View>

                    {/* HELP */}
                    <Text style={styles.sectionTitle}>
                        HELP
                    </Text>

                    <View style={styles.card}>

                        <TouchableOpacity
                            style={styles.item}
                            activeOpacity={0.7}
                        >
                            <View style={styles.iconBox}>
                                <Text style={styles.icon}>?</Text>
                            </View>

                            <View style={styles.itemText}>
                                <Text style={styles.itemTitle}>
                                    Frequently Asked Questions
                                </Text>

                                <Text style={styles.itemSubtitle}>
                                    Get answers to common questions
                                </Text>
                            </View>

                            <Text style={styles.arrow}>›</Text>
                        </TouchableOpacity>

                        <View style={styles.separator} />

                        <TouchableOpacity
                            style={styles.item}
                            activeOpacity={0.7}
                        >
                            <View style={styles.iconBox}>
                                <Text style={styles.icon}>✦</Text>
                            </View>

                            <View style={styles.itemText}>
                                <Text style={styles.itemTitle}>
                                    About Chai AI
                                </Text>

                                <Text style={styles.itemSubtitle}>
                                    Learn more about your AI assistant
                                </Text>
                            </View>

                            <Text style={styles.arrow}>›</Text>
                        </TouchableOpacity>

                    </View>

                    {/* FEEDBACK */}
                    <Text style={styles.sectionTitle}>
                        FEEDBACK
                    </Text>

                    <View style={styles.card}>

                        <TouchableOpacity
                            style={styles.item}
                            activeOpacity={0.7}
                        >
                            <View style={styles.iconBox}>
                                <Text style={styles.icon}>♥</Text>
                            </View>

                            <View style={styles.itemText}>
                                <Text style={styles.itemTitle}>
                                    Send Feedback
                                </Text>

                                <Text style={styles.itemSubtitle}>
                                    Tell us what you think about Chai AI
                                </Text>
                            </View>

                            <Text style={styles.arrow}>›</Text>
                        </TouchableOpacity>

                        <View style={styles.separator} />

                        <TouchableOpacity
                            style={styles.item}
                            activeOpacity={0.7}
                        >
                            <View style={styles.iconBox}>
                                <Text style={styles.icon}>⚠</Text>
                            </View>

                            <View style={styles.itemText}>
                                <Text style={styles.itemTitle}>
                                    Report a Problem
                                </Text>

                                <Text style={styles.itemSubtitle}>
                                    Let us know if something isn't working
                                </Text>
                            </View>

                            <Text style={styles.arrow}>›</Text>
                        </TouchableOpacity>

                    </View>

                    {/* APP INFO */}
                    <View style={styles.footer}>
                        <Text style={styles.footerBrand}>
                            CHAI AI
                        </Text>

                        <Text style={styles.footerText}>
                            Your AI Assistant
                        </Text>

                        <Text style={styles.version}>
                            Version 1.0.0
                        </Text>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg,
    },

    header: {
        height: 72,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingTop:20,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        backgroundColor: COLORS.surface,
    },

    backButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        backgroundColor: COLORS.surfaceLight,
    },

    backText: {
        fontSize: 32,
        lineHeight: 34,
        color: COLORS.primaryLight,
        marginTop: -3,
    },

    title: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.text,
    },

    subtitle: {
        marginTop: 2,
        fontSize: 12,
        color: COLORS.textMuted,
    },

    content: {
        padding: 20,
        paddingBottom: 40,
    },

    heroCard: {
        padding: 24,
        borderRadius: 20,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: 'center',
        marginBottom: 28,
    },

    heroIcon: {
        fontSize: 42,
        marginBottom: 12,
    },

    heroTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 8,
    },

    heroText: {
        fontSize: 14,
        lineHeight: 21,
        textAlign: 'center',
        color: COLORS.textSecondary,
    },

    sectionTitle: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1.4,
        color: COLORS.primary,
        marginBottom: 10,
        marginLeft: 4,
    },

    card: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginBottom: 24,
        overflow: 'hidden',
    },

    item: {
        minHeight: 76,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },

    iconBox: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: COLORS.surfaceLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 13,
    },

    icon: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.primaryLight,
    },

    itemText: {
        flex: 1,
    },

    itemTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 4,
    },

    itemSubtitle: {
        fontSize: 12,
        lineHeight: 17,
        color: COLORS.textMuted,
    },

    arrow: {
        fontSize: 28,
        color: COLORS.textMuted,
        marginLeft: 8,
    },

    separator: {
        height: 1,
        backgroundColor: COLORS.border,
        marginLeft: 71,
    },

    footer: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 20,
    },

    footerBrand: {
        fontSize: 13,
        fontWeight: '800',
        letterSpacing: 2,
        color: COLORS.primary,
    },

    footerText: {
        marginTop: 5,
        fontSize: 12,
        color: COLORS.textMuted,
    },

    version: {
        marginTop: 8,
        fontSize: 11,
        color: COLORS.textMuted,
    },
});

export default HelpFeedbackScreen;