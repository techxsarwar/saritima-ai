import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar, Plus, Clock, User, Code, FileText, Trash2, Edit2, MessageSquare, Check, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useUser } from '@clerk/react';
import { supabase } from '../utils/supabase';
import { LogoIcon } from '../components/LogoIcon';
import './ChatInterface.css';

interface ChatMessage {
  id: string;
  role: 'user' | 'ai' | 'system';
  content: string;
}

interface ChatSession {
  id: string;
  title: string;
  created_at: string;
}

export const ChatInterface: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const userId = user?.id || 'anonymous';
  
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const userName = user?.firstName || (user?.unsafeMetadata?.userName as string) || localStorage.getItem('userName') || 'User';
  const initial = userName.charAt(0).toUpperCase();

  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleWrapperClick = () => {
    inputRef.current?.focus();
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (userId !== 'anonymous') {
      fetchSessions();
    }
  }, [userId]);

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
    const textToSend = typeof overrideMessage === 'string' ? overrideMessage : message;
    
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
    setIsLoading(true);
    
    let activeSessionId = currentSessionId;
    
    try {
      if (!activeSessionId) {
        // Create new session
        const title = userText.split(' ').slice(0, 4).join(' ') + (userText.split(' ').length > 4 ? '...' : '');
        const { data: sessionData, error: sessionError } = await supabase
          .from('chat_sessions')
          .insert([{ user_id: userId, title }])
          .select()
          .single();
          
        if (sessionData) {
          activeSessionId = sessionData.id;
          setCurrentSessionId(sessionData.id);
          setSessions(prev => [sessionData, ...prev]);
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
        content: 'You are Saritima Ai, a helpful and advanced AI assistant. You are fully capable of brainstorming, drafting emails, analyzing text, answering questions, and assisting with general tasks. However, you are strictly prohibited from writing, generating, or assisting with software code. If asked to write code, politely refuse and offer to help with something else. Always identify yourself as Saritima.'
      };

      const apiMessages = [
        systemMessage,
        ...messages.concat(newUserMsg).map(msg => ({
          role: msg.role === 'ai' ? 'assistant' : 'user',
          content: msg.content
        }))
      ];

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "anthropic/claude-3-haiku",
          messages: apiMessages
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponseText = data.choices[0].message.content;

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: aiResponseText
      };
      setMessages(prev => [...prev, aiResponse]);
      
      // Save AI message to supabase
      if (activeSessionId) {
        await supabase.from('chat_messages').insert([{
          session_id: activeSessionId,
          role: 'ai',
          content: aiResponseText
        }]);
      }
      
    } catch (error) {
      console.error("Failed to fetch from OpenRouter:", error);
      const errorResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: "Sorry, I encountered an error communicating with the server."
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleNewChat = () => {
    setCurrentSessionId(null);
    setMessages([]);
  };

  const handleNavigateHome = () => {
    navigate('/');
  };
  
  const startEditing = (session: ChatSession, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSessionId(session.id);
    setEditTitle(session.title);
  };
  
  const saveEdit = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (editingSessionId && editTitle.trim()) {
      await supabase.from('chat_sessions').update({ title: editTitle.trim() }).eq('id', editingSessionId);
      setSessions(prev => prev.map(s => s.id === editingSessionId ? { ...s, title: editTitle.trim() } : s));
    }
    setEditingSessionId(null);
  };
  
  const cancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSessionId(null);
  };

  const deleteSession = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await supabase.from('chat_sessions').delete().eq('id', id);
    setSessions(prev => prev.filter(s => s.id !== id));
    if (currentSessionId === id) {
      handleNewChat();
    }
  };

  return (
    <div className="chat-layout">
      {/* Sidebar Toggle Logic */}
      {isSidebarOpen ? (
        <aside className="chat-sidebar-expanded">
          <div className="sidebar-top-expanded">
            <div className="sidebar-header">
              <button className="icon-button" onClick={() => setIsSidebarOpen(false)} title="Close Sidebar">
                <Sidebar size={18} />
              </button>
              <button className="icon-button sidebar-btn-primary" onClick={handleNewChat} title="New Chat">
                <Plus size={18} />
              </button>
            </div>
            
            <div className="history-list">
              <div className="history-label">Recent Chats</div>
              {sessions.map(session => (
                <div 
                  key={session.id} 
                  className={`history-item ${currentSessionId === session.id ? 'active' : ''}`}
                  onClick={() => loadSession(session.id)}
                >
                  <MessageSquare size={16} className="history-icon" />
                  {editingSessionId === session.id ? (
                    <div className="history-edit-mode">
                      <input 
                        type="text" 
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        onClick={e => e.stopPropagation()}
                        onKeyDown={e => {
                          if (e.key === 'Enter') saveEdit(e as any);
                          if (e.key === 'Escape') cancelEdit(e as any);
                        }}
                        autoFocus
                      />
                      <button onClick={saveEdit}><Check size={14} /></button>
                      <button onClick={cancelEdit}><X size={14} /></button>
                    </div>
                  ) : (
                    <>
                      <span className="history-title">{session.title}</span>
                      <div className="history-actions">
                        <button onClick={(e) => startEditing(session, e)} title="Rename"><Edit2 size={14} /></button>
                        <button onClick={(e) => deleteSession(session.id, e)} title="Delete"><Trash2 size={14} /></button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="sidebar-bottom-expanded">
            <button className="sidebar-footer-btn" onClick={handleNavigateHome} title="Profile / Home">
              <div className="user-avatar-small">{initial}</div>
              <span className="user-name-label">{userName}</span>
            </button>
          </div>
        </aside>
      ) : (
        <aside className="chat-sidebar">
          <div className="sidebar-top">
            <button className="icon-button sidebar-toggle" onClick={() => setIsSidebarOpen(true)} title="Open Sidebar">
              <Sidebar size={18} />
            </button>
            
            <button className="icon-button sidebar-btn-primary" onClick={handleNewChat} title="New Chat">
              <Plus size={18} />
            </button>
            
            <button className="icon-button sidebar-btn" title="History" onClick={() => setIsSidebarOpen(true)}>
              <Clock size={18} />
            </button>
            
            <button className="icon-button sidebar-btn" title="Profile" onClick={handleNavigateHome}>
              <User size={18} />
            </button>
            
            <button className="icon-button sidebar-btn" title="Code">
              <Code size={18} />
            </button>
            
            <button className="icon-button sidebar-btn" title="Files">
              <FileText size={18} />
            </button>
          </div>
          
          <div className="sidebar-bottom">
            <button className="icon-button" onClick={handleNavigateHome} title="Profile / Home" style={{ padding: 0 }}>
              <div className="user-avatar-small">{initial}</div>
            </button>
          </div>
        </aside>
      )}

      {/* Main Chat Area */}
      <main className="chat-main">
        {/* Header */}
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

        {/* Chat History or Home State */}
        {messages.length === 0 ? (
          <div className="home-empty-state">
            <h1 className="home-greeting">Good afternoon, {userName}</h1>
            <div className="home-chat-input-wrapper" onClick={handleWrapperClick}>
              <button className="input-action-btn" title="Attach">
                <Plus size={20} />
              </button>
              <input 
                ref={inputRef}
                type="text" 
                placeholder="What can I help you with?" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="chat-input"
              />
              <div className="input-actions-right">
                <button className="input-send-btn" disabled={!message.trim()} onClick={handleSend}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                </button>
              </div>
            </div>
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
            <div className="chat-content">
              {messages.map((msg) => (
                msg.role === 'user' ? (
                  <div key={msg.id} className="message user-message-wrapper">
                    <div className="user-message" style={{ whiteSpace: 'pre-wrap' }}>
                      {msg.content}
                    </div>
                  </div>
                ) : (
                  <div key={msg.id} className="message ai-message-wrapper">
                    <div className="ai-message">
                      <div className="ai-avatar-wrapper">
                          <LogoIcon size={20} />
                      </div>
                      <div className="ai-content markdown-body" style={{ lineHeight: 1.6 }}>
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            code(props) {
                              const {children, className, node, ...rest} = props
                              const match = /language-(\w+)/.exec(className || '')
                              return match ? (
                                <SyntaxHighlighter
                                  {...(rest as any)}
                                  PreTag="div"
                                  children={String(children).replace(/\n$/, '')}
                                  language={match[1]}
                                  style={vscDarkPlus as any}
                                />
                              ) : (
                                <code {...rest} className={className}>
                                  {children}
                                </code>
                              )
                            }
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                )
              ))}
              {isLoading && (
                <div className="message ai-message-wrapper">
                  <div className="ai-message">
                    <div className="ai-avatar-wrapper">
                        <LogoIcon size={20} className="thinking-roll" />
                    </div>
                    <div className="ai-content" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ animation: 'pulse 1.5s infinite', opacity: 0.6 }}>●</span>
                      <span style={{ animation: 'pulse 1.5s infinite', opacity: 0.6, animationDelay: '0.2s' }}>●</span>
                      <span style={{ animation: 'pulse 1.5s infinite', opacity: 0.6, animationDelay: '0.4s' }}>●</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="chat-input-area">
              <div className="chat-input-wrapper" onClick={handleWrapperClick}>
                <button className="input-action-btn" title="Attach">
                  <Plus size={20} />
                </button>
                <input 
                  ref={inputRef}
                  type="text" 
                  placeholder="Write a message..." 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="chat-input"
                />
                <div className="input-actions-right">
                  <span className="model-selector">Saritima Base v3</span>
                  <button className="input-send-btn" disabled={!message.trim() || isLoading} onClick={handleSend}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};
