import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Plus, Send, ChevronLeft, Menu } from 'lucide-react-native';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'ai',
    content: 'Hello! I am Saritima, an advanced AI assistant built for technical professionals. How can I help you today?'
  },
];

export default function App() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText.trim()
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const newAiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: "I'm currently a UI prototype running on React Native. I don't have my backend logic hooked up yet, but I look great!"
      };
      setMessages(prev => [...prev, newAiMsg]);
    }, 1000);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.role === 'user';
    
    return (
      <View style={[styles.messageWrapper, isUser ? styles.messageWrapperUser : styles.messageWrapperAi]}>
        {!isUser && (
          <View style={styles.aiAvatar}>
            <Text style={styles.aiAvatarText}>S</Text>
          </View>
        )}
        <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.aiBubble]}>
          <Text style={[styles.messageText, isUser ? styles.userText : styles.aiText]}>
            {item.content}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F8F5" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon}>
          <Menu color="#1A1A1A" size={24} />
        </TouchableOpacity>
        
        <View style={styles.planBadge}>
          <Text style={styles.planText}>Free plan</Text>
          <Text style={styles.planDot}>·</Text>
          <Text style={styles.planUpgrade}>Upgrade</Text>
        </View>
        
        <TouchableOpacity style={styles.headerIcon}>
          <Plus color="#1A1A1A" size={24} />
        </TouchableOpacity>
      </View>

      {/* Chat Area */}
      <KeyboardAvoidingView 
        style={styles.keyboardAvoid} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.chatContainer}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          showsVerticalScrollIndicator={false}
        />

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TouchableOpacity style={styles.attachBtn}>
              <Plus color="#718096" size={20} />
            </TouchableOpacity>
            
            <TextInput
              style={styles.textInput}
              placeholder="What can I help you with?"
              placeholderTextColor="#A0AEC0"
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={2000}
            />
            
            <TouchableOpacity 
              style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]}
              onPress={handleSend}
              disabled={!inputText.trim()}
            >
              <Send color="#FFFFFF" size={16} />
            </TouchableOpacity>
          </View>
          <Text style={styles.footerText}>Saritima Base v3</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerIcon: {
    padding: 8,
  },
  planBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  planText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4A5568',
  },
  planDot: {
    fontSize: 14,
    color: '#4A5568',
    marginHorizontal: 8,
  },
  planUpgrade: {
    fontSize: 14,
    color: '#4A5568',
  },
  keyboardAvoid: {
    flex: 1,
  },
  chatContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 24,
    width: '100%',
  },
  messageWrapperUser: {
    justifyContent: 'flex-end',
  },
  messageWrapperAi: {
    justifyContent: 'flex-start',
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FFF3EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 4,
  },
  aiAvatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D3683A',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: '#F3F3F3',
    borderTopRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: 'transparent',
    maxWidth: '85%',
    paddingHorizontal: 0,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
  },
  userText: {
    color: '#1A1A1A',
  },
  aiText: {
    color: '#333333',
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 8 : 24,
    backgroundColor: '#FAFAFA',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 24,
    paddingHorizontal: 8,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  attachBtn: {
    padding: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    maxHeight: 100,
    minHeight: 40,
    paddingHorizontal: 8,
    paddingTop: Platform.OS === 'ios' ? 10 : 8,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendBtnDisabled: {
    backgroundColor: '#E5E5E5',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#A0AEC0',
    marginTop: 12,
  }
});
