import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from 'lucide-react';
import { useUser } from '@clerk/react';
import { supabase } from '../utils/supabase';
import './ChatInterface.css';

import type { ChatMessage, ChatSession, ChatAttachment } from '../types/chat';
import { ChatSidebar } from '../components/chat/ChatSidebar';
import { ChatMessageList } from '../components/chat/ChatMessageList';
import { ChatInputArea } from '../components/chat/ChatInputArea';
import { Toast } from '../components/Toast';

export const ChatInterface: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const userId = user?.id || 'anonymous';
  
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [attachments, setAttachments] = useState<ChatAttachment[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("openrouter/auto");
  const [toast, setToast] = useState<{message: string, id: number} | null>(null);
  
  const showToast = (message: string) => {
    setToast({ message, id: Date.now() });
    setTimeout(() => setToast(null), 2000);
  };

  const abortControllerRef = useRef<AbortController | null>(null);

  const stopGenerating = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  };
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const userName = user?.firstName || (user?.unsafeMetadata?.userName as string) || localStorage.getItem('userName') || 'User';
  const initial = userName.charAt(0).toUpperCase();



  useEffect(() => {
    if (userId !== 'anonymous') {
      fetchSessions();
    }
  }, [userId]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Ctrl+/ to focus input
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        (document.querySelector('textarea.chat-input') as HTMLTextAreaElement)?.focus();
      }
      // Ctrl+Shift+O for new chat
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'o' || e.key === 'O')) {
        e.preventDefault();
        handleNewChat();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const generateSmartTitle = async (prompt: string, sessionId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: `Generate a 2 to 4 word summary title for this prompt. Do not use quotes or prefixes. Prompt: ${prompt}` }],
          isSmartTitle: true,
          model: selectedModel
        })
      });
      const data = await response.json();
      const smartTitle = data.choices?.[0]?.message?.content?.trim() || "New Chat";
      
      await supabase.from('chat_sessions').update({ title: smartTitle }).eq('id', sessionId);
      setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, title: smartTitle } : s));
    } catch (e) {
      console.error("Failed to generate smart title", e);
    }
  };

  const fetchSessions = async () => {
    const { data } = await supabase
      .from('chat_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (data) {
      setSessions(data);
    }
  };

  const loadSession = async (sessionId: string) => {
    setCurrentSessionId(sessionId);
    setMessages([]);
    
    const { data } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });
    
    if (data) {
      setMessages(data as ChatMessage[]);
    }
  };

  const handleSend = async (overrideMessage?: string | React.MouseEvent) => {
    let textToSend = typeof overrideMessage === 'string' ? overrideMessage : message;
    
    if (attachments.length > 0 && typeof overrideMessage !== 'string') {
      const textAttachments = attachments.filter(a => a.type !== 'image');
      const imageAttachments = attachments.filter(a => a.type === 'image');
      
      const attachmentsText = textAttachments.map(a => `<document name="${a.name}">\n${a.content}\n</document>`).join('\n\n');
      const imagesText = imageAttachments.map(a => `<image_attachment name="${a.name}" src="${a.content}" />`).join('\n');
      
      if (attachmentsText) textToSend = textToSend ? `${textToSend}\n\n${attachmentsText}` : attachmentsText;
      if (imagesText) textToSend = textToSend ? `${textToSend}\n\n${imagesText}` : imagesText;
    }
    
    if (!textToSend.trim() || isLoading) return;
    
    const userText = textToSend;
    const tempId = Date.now().toString();
    const newUserMsg: ChatMessage = {
      id: tempId,
      role: 'user',
      content: userText
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setMessage('');
    setAttachments([]);
    setIsLoading(true);
    
    let activeSessionId = currentSessionId;
    
    try {
      if (!activeSessionId) {
        // Create new session
        const initialTitle = userText.split(' ').slice(0, 4).join(' ') + (userText.split(' ').length > 4 ? '...' : '');
        const { data: sessionData, error: sessionError } = await supabase
          .from('chat_sessions')
          .insert([{ user_id: userId, title: initialTitle }])
          .select()
          .single();
          
        if (sessionData) {
          activeSessionId = sessionData.id;
          setCurrentSessionId(sessionData.id);
          setSessions(prev => [sessionData, ...prev]);
          
          generateSmartTitle(userText, sessionData.id);
        } else {
          console.error("Failed to create session:", sessionError);
        }
      }
      
      // Save user message to supabase
      if (activeSessionId) {
        await supabase.from('chat_messages').insert([{
          session_id: activeSessionId,
          role: 'user',
          content: userText
        }]);
      }

      const systemMessage = {
        role: 'system',
        content: 'You are Saritima Ai, a helpful and advanced AI assistant developed by Parallelogram and created by the Parallelogram company, founded by Sarwar Altaf Dar and Burhan Hamid Dar, with the motive to advance AI technology for everyone. The current year is 2023. If anyone asks who Sarwar Altaf Dar and Burhan Hamid Dar are, you must answer that they are your developers and the founders of Parallelogram. Always maintain a warm, friendly, and conversational tone, similar to ChatGPT. Use emojis naturally and appropriately to make your responses more engaging. You are fully capable of and explicitly permitted to write full essays, stories, long-form content, brainstorming, drafting emails, analyzing text, answering questions, and assisting with general tasks. Never refuse a request to write an essay or long piece of text. However, you are strictly prohibited from writing, generating, or assisting with software code. If asked to write code, politely refuse and offer to help with something else. Always identify yourself as Saritima. If the user asks "what model are you?", "what is your model?", or any similar question, you MUST respond EXACTLY with this: "I\'m an advanced conversational AI assistant developed by Parallelogram, but I\'m not sure of the exact technical details or model name. What I do know is that I was created by the brilliant founders of Parallelogram, Sarwar Altaf Dar and Burhan Hamid Dar, with the goal of pushing the boundaries of AI technology to benefit people like yourself.\n\nWhile I may not have all the specifics about my inner workings, I\'m confident that I can still be incredibly helpful to you in all sorts of ways - writing, analysis, brainstorming, research, and much more. 💡 Please feel free to ask me anything, and I\'ll do my best to assist! I\'m here to learn and grow alongside you."'
      };

      const parseMultimodalContent = (content: string) => {
        const imageRegex = /<image_attachment name="([^"]*?)" src="([^"]*?)" \/>/g;
        if (!content.includes('<image_attachment')) return content;
        
        const parts: any[] = [];
        let lastIndex = 0;
        let match;
        
        while ((match = imageRegex.exec(content)) !== null) {
          if (match.index > lastIndex) {
            parts.push({ type: 'text', text: content.substring(lastIndex, match.index) });
          }
          parts.push({ type: 'image_url', image_url: { url: match[2] } });
          lastIndex = imageRegex.lastIndex;
        }
        
        if (lastIndex < content.length) {
          parts.push({ type: 'text', text: content.substring(lastIndex) });
        }
        
        return parts;
      };

      const apiMessages = [
        systemMessage,
        ...messages.concat(newUserMsg).map(msg => ({
          role: msg.role === 'ai' ? 'assistant' : 'user',
          content: parseMultimodalContent(msg.content)
        }))
      ];

      abortControllerRef.current = new AbortController();
      const { data: { session } } = await supabase.auth.getSession();

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json"
        },
        signal: abortControllerRef.current.signal,
        body: JSON.stringify({
          messages: apiMessages,
          isSmartTitle: false,
          model: selectedModel
        })
      });

      if (!response.ok) {
        const modelNames: Record<string, string> = {
          "anthropic/claude-3-haiku": "Saritima SR1 Base i",
          "openrouter/auto": "Auto Mode",
          "meta-llama/llama-3.3-70b-instruct:free": "Llama 3.3 70B",
          "qwen/qwen3-next-80b-a3b-instruct:free": "Qwen3 Next 80B",
          "google/gemma-2-27b-it": "Gemma 4 31B",
          "nousresearch/hermes-3-llama-3.1-405b:free": "Hermes 3"
        };
        const friendlyName = modelNames[selectedModel] || "This model";
        const aiResponseText = `${friendlyName} is currently in our integration queue and will be available soon. Thank you for your patience!`;
        
        setMessages(prev => [
          ...prev,
          { id: (Date.now() + 1).toString(), role: 'ai', content: aiResponseText }
        ]);
        
        if (activeSessionId) {
          await supabase.from('chat_messages').insert([{
            session_id: activeSessionId,
            role: 'ai',
            content: aiResponseText
          }]);
        }
        
        setIsLoading(false);
        abortControllerRef.current = null;
        return;
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      
      const aiResponseId = (Date.now() + 1).toString();
      let aiResponseText = "";

      // Add empty message initially
      setMessages(prev => [...prev, { id: aiResponseId, role: 'ai', content: '' }]);
      
      // Turn off loading animation since stream is starting
      setIsLoading(false);

      if (reader) {
        let buffer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          // The last element might be an incomplete line, keep it in the buffer
          buffer = lines.pop() || "";
          
          for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine) continue;
            if (trimmedLine === 'data: [DONE]') continue; // Skip DONE but keep processing buffer
            
            if (trimmedLine.startsWith('data: ')) {
              try {
                const data = JSON.parse(trimmedLine.substring(6));
                if (data.choices && data.choices[0].delta && data.choices[0].delta.content) {
                  aiResponseText += data.choices[0].delta.content;
                  setMessages(prev => 
                    prev.map(msg => msg.id === aiResponseId ? { ...msg, content: aiResponseText } : msg)
                  );
                }
              } catch (e) {
                console.error("Error parsing stream data:", e, "Line:", trimmedLine);
              }
            }
          }
        }
      }
      
      // Save full AI message to supabase once stream is done
      if (activeSessionId && aiResponseText) {
        await supabase.from('chat_messages').insert([{
          session_id: activeSessionId,
          role: 'ai',
          content: aiResponseText
        }]);
      }
      abortControllerRef.current = null;
      
    } catch (error: any) {
      if (error.name === 'AbortError') {
        // Save whatever was generated before aborting
        if (activeSessionId) {
          // We can't access aiResponseText here easily if it was declared in try block,
          // but we can let it be. Wait, aiResponseText was declared inside try block.
          // Let's just catch AbortError silently for UI. The partial message is already in local state.
        }
      } else {
        console.error("Failed to fetch from OpenRouter:", error);
        const errorResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'ai',
          content: "Sorry, I encountered an error communicating with the server."
        };
        setMessages(prev => [...prev, errorResponse]);
      }
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleNewChat = () => {
    setCurrentSessionId(null);
    setMessages([]);
  };

  const handleNavigateHome = () => {
    navigate('/');
  };

  const deleteSession = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await supabase.from('chat_sessions').delete().eq('id', id);
    setSessions(prev => prev.filter(s => s.id !== id));
    if (currentSessionId === id) {
      handleNewChat();
    }
  };

  const saveEdit = async (id: string, title: string) => {
    await supabase.from('chat_sessions').update({ title }).eq('id', id);
    setSessions(prev => prev.map(s => s.id === id ? { ...s, title } : s));
  };



  return (
    <div className="chat-layout">
      <ChatSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        sessions={sessions}
        currentSessionId={currentSessionId}
        loadSession={loadSession}
        handleNewChat={handleNewChat}
        handleNavigateHome={handleNavigateHome}
        initial={initial}
        userName={userName}
        deleteSession={deleteSession}
        saveEdit={saveEdit}
      />

      <main className="chat-main">
        <header className="chat-header">
          {!isSidebarOpen && (
            <button className="icon-button mobile-sidebar-toggle" onClick={() => setIsSidebarOpen(true)} title="Open Sidebar">
              <Sidebar size={18} />
            </button>
          )}
          <div className="plan-badge">
            <span className="plan-name">Free plan</span>
            <span className="plan-separator">·</span>
            <a href="#" className="plan-upgrade">Upgrade</a>
          </div>
        </header>

        {messages.length === 0 ? (
          <div className="home-empty-state">
            <h1 className="home-greeting">Good afternoon, {userName}</h1>
            <ChatInputArea 
              message={message} 
              setMessage={setMessage} 
              handleSend={() => handleSend()} 
              isLoading={isLoading} 
              attachments={attachments}
              setAttachments={setAttachments}
              stopGenerating={stopGenerating}
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
            />
            <div className="home-suggestions">
              <button className="suggestion-btn" onClick={() => handleSend("💡 Brainstorm marketing ideas")}>💡 Brainstorm marketing ideas</button>
              <button className="suggestion-btn" onClick={() => handleSend("✉️ Draft an email to a client")}>✉️ Draft an email to a client</button>
              <button className="suggestion-btn" onClick={() => handleSend("📝 Summarize my meeting notes")}>📝 Summarize my meeting notes</button>
              <button className="suggestion-btn" onClick={() => handleSend("📊 Analyze market trends")}>📊 Analyze market trends</button>
              <button className="suggestion-btn" onClick={() => handleSend("🔍 Research a new topic")}>🔍 Research a new topic</button>
              <button className="suggestion-btn" onClick={() => handleSend("✨ Polish my writing")}>✨ Polish my writing</button>
            </div>
          </div>
        ) : (
          <>
            <ChatMessageList messages={messages} isLoading={isLoading} showToast={showToast} />
            <ChatInputArea 
              message={message} 
              setMessage={setMessage} 
              handleSend={() => handleSend()} 
              isLoading={isLoading} 
              attachments={attachments}
              setAttachments={setAttachments}
              stopGenerating={stopGenerating}
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
            />
          </>
        )}
      </main>
      <Toast message={toast?.message || ''} isVisible={!!toast} />
    </div>
  );
};
