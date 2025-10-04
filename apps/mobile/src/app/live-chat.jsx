import React, { useRef, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as DocumentPicker from 'expo-document-picker';
import { useTheme } from "@/context/ThemeContext";

const dummyMessages = [
  { id: '1', text: 'Hello! How can I help you today?', sender: 'support', timestamp: new Date(Date.now() - 60 * 1000 * 5).toISOString() },
  { id: '2', text: 'I have a question about my application.', sender: 'user', timestamp: new Date(Date.now() - 60 * 1000 * 2).toISOString() },
  { id: '3', text: 'Of course, I am here to help. What is your question?', sender: 'support', timestamp: new Date().toISOString() },
];

const ChatHeader = ({ colors }) => {
  const router = useRouter();
  return (
    <View style={[styles.headerContainer, { backgroundColor: colors.primary }]}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={colors.primaryText} />
      </TouchableOpacity>
      <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.avatar} />
      <View>
        <Text style={[styles.headerTitle, { color: colors.primaryText }]}>Chat with Support</Text>
        <Text style={[styles.headerSubtitle, { color: colors.primaryText }]}>We typically reply within a few minutes.</Text>
      </View>
    </View>
  );
};

const LiveChat = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [messages, setMessages] = React.useState(dummyMessages);
  const [input, setInput] = React.useState('');
  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { id: Date.now().toString(), text: input, sender: 'user', timestamp: new Date().toISOString() }]);
      setInput('');
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now().toString(), text: 'Thank you for your message. An agent will be with you shortly.', sender: 'support', timestamp: new Date().toISOString() }]);
      }, 1000);
    }
  };

  const handleAttach = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.canceled === false) {
        Alert.alert('File Attached', `Attached file: ${result.assets[0].name}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to attach file.');
    }
  };

  const handleEmoji = () => {
    setInput(prev => prev + '😊');
  };

  const renderMessage = ({ item }) => {
    const messageTime = new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return (
      <View style={[
        styles.messageContainer,
        item.sender === 'user' ? styles.userMessageContainer : styles.supportMessageContainer,
        { backgroundColor: item.sender === 'user' ? colors.primary : colors.surfaceSecondary }
      ]}>
        <Text style={[styles.messageText, { color: item.sender === 'user' ? colors.primaryText : colors.text }]}>{item.text}</Text>
        <Text style={[styles.timestampText, { color: item.sender === 'user' ? colors.primaryText : colors.textSecondary }]}>{messageTime}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <ChatHeader colors={colors} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -insets.bottom}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          style={{ flex: 1 }}
        />
        <View style={[styles.inputContainer, { paddingBottom: insets.bottom, backgroundColor: colors.surface }]}>
          <TouchableOpacity onPress={handleAttach} style={styles.iconButton}>
            <Ionicons name="attach-outline" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEmoji} style={styles.iconButton}>
            <Ionicons name="happy-outline" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
          <TextInput
            style={[styles.input, { backgroundColor: colors.surfaceSecondary, color: colors.text }]}
            value={input}
            onChangeText={setInput}
            placeholder="Enter your message..."
            placeholderTextColor={colors.textSecondary}
          />
          <TouchableOpacity onPress={handleSend} style={[styles.sendButton, { backgroundColor: colors.primary }]}>
            <Ionicons name="send" size={20} color={colors.primaryText} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    marginRight: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    opacity: 0.8,
  },
  messagesList: {
    padding: 10,
  },
  messageContainer: {
    padding: 12,
    borderRadius: 18,
    marginBottom: 10,
    maxWidth: '80%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  supportMessageContainer: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
  },
  timestampText: {
    fontSize: 10,
    marginTop: 5,
    alignSelf: 'flex-end',
    opacity: 0.7,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  input: {
    flex: 1,
    height: 45,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    borderWidth: 0,
  },
  iconButton: {
    padding: 5,
    marginHorizontal: 5,
  },
  sendButton: {
    marginLeft: 10,
    borderRadius: 25,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LiveChat;
