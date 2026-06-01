import React, { useState } from 'react';
import { Sidebar, Plus, Clock, User, Code, FileText, Trash2, Edit2, MessageSquare, Check, X } from 'lucide-react';
import type { ChatSession } from '../../types/chat';

interface ChatSidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  sessions: ChatSession[];
  currentSessionId: string | null;
  loadSession: (sessionId: string) => void;
  handleNewChat: () => void;
  handleNavigateHome: () => void;
  initial: string;
  userName: string;
  deleteSession: (id: string, e: React.MouseEvent) => void;
  saveEdit: (id: string, title: string) => Promise<void>;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  sessions,
  currentSessionId,
  loadSession,
  handleNewChat,
  handleNavigateHome,
  initial,
  userName,
  deleteSession,
  saveEdit
}) => {
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const startEditing = (session: ChatSession, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSessionId(session.id);
    setEditTitle(session.title);
  };

  const handleSaveEdit = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (editingSessionId && editTitle.trim()) {
      await saveEdit(editingSessionId, editTitle.trim());
    }
    setEditingSessionId(null);
  };

  const cancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSessionId(null);
  };

  if (isSidebarOpen) {
    return (
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
                        if (e.key === 'Enter') handleSaveEdit(e as any);
                        if (e.key === 'Escape') cancelEdit(e as any);
                      }}
                      autoFocus
                    />
                    <button onClick={handleSaveEdit}><Check size={14} /></button>
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
    );
  }

  return (
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
  );
};
