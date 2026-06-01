import React, { useRef, useEffect } from 'react';
import { Plus, FileText, X, ChevronDown } from 'lucide-react';
import type { ChatAttachment } from '../../types/chat';

interface ChatInputAreaProps {
  message: string;
  setMessage: (message: string) => void;
  handleSend: () => void;
  isLoading: boolean;
  attachments: ChatAttachment[];
  setAttachments: React.Dispatch<React.SetStateAction<ChatAttachment[]>>;
  stopGenerating?: () => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

export const ChatInputArea: React.FC<ChatInputAreaProps> = ({ 
  message, 
  setMessage, 
  handleSend, 
  isLoading, 
  attachments, 
  setAttachments,
  stopGenerating,
  selectedModel,
  setSelectedModel
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [message]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleWrapperClick = () => {
    textareaRef.current?.focus();
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const newAttachment: ChatAttachment = {
              id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
              name: file.name,
              content: event.target.result as string,
              type: 'image'
            };
            setAttachments(prev => [...prev, newAttachment]);
          }
        };
        reader.readAsDataURL(file);
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const newAttachment: ChatAttachment = {
              id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
              name: file.name,
              content: event.target.result as string,
              type: 'text'
            };
            setAttachments(prev => [...prev, newAttachment]);
          }
        };
        reader.readAsText(file);
      }
    });
    
    // Reset the input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedText = e.clipboardData.getData('text');
    if (pastedText.length > 1000) {
      e.preventDefault();
        const newAttachment: ChatAttachment = {
          id: Date.now().toString(),
          name: 'Pasted content',
          content: pastedText,
          type: 'text'
        };
      setAttachments(prev => [...prev, newAttachment]);
    }
  };

  const removeAttachment = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAttachments(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="chat-input-area">
      <div className="chat-input-container">
        {attachments.length > 0 && (
          <div className="attachments-bar">
            {attachments.map(att => (
              <div key={att.id} className="attachment-pill">
                {att.type === 'image' ? (
                  <img src={att.content} alt={att.name} className="attachment-thumbnail" />
                ) : (
                  <FileText size={14} className="attachment-icon" />
                )}
                <span className="attachment-name">{att.name}</span>
                <span className="attachment-size">
                  {att.type === 'image' ? 'Image' : `${(att.content.length / 1000).toFixed(1)}k chars`}
                </span>
                <button 
                  className="attachment-remove" 
                  onClick={(e) => removeAttachment(att.id, e)}
                  title="Remove"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="chat-input-wrapper" onClick={handleWrapperClick}>
          <button className="input-action-btn" title="Attach" onClick={handleAttachClick}>
            <Plus size={20} />
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            style={{ display: 'none' }} 
            multiple 
            accept="image/*,.txt,.md,.json,.csv,.js,.ts,.tsx,.jsx,.html,.css"
          />
          <textarea
            ref={textareaRef}
            placeholder="Write a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            className="chat-input auto-resize-textarea"
            rows={1}
          />
          <div className="input-actions-right">
            <div className="model-selector-wrapper">
              <select 
                className="model-selector-dropdown" 
                value={selectedModel} 
                onChange={(e) => setSelectedModel(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                disabled={isLoading}
                title="Select AI Model"
              >
                <option value="anthropic/claude-3-haiku">Saritima SR1 Base i</option>
                <option value="openrouter/auto">Auto Mode (Best Response)</option>
                <option value="meta-llama/llama-3.3-70b-instruct:free">Llama 3.3 70B</option>
                <option value="qwen/qwen3-next-80b-a3b-instruct:free">Qwen3 Next 80B</option>
                <option value="google/gemma-2-27b-it">Gemma 4 31B</option>
                <option value="nousresearch/hermes-3-llama-3.1-405b:free">Hermes 3 405B</option>
              </select>
              <ChevronDown size={14} className="model-selector-icon" />
            </div>
            {isLoading ? (
              <button className="input-send-btn stop-btn" onClick={stopGenerating} title="Stop generating">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="6" width="12" height="12" />
                </svg>
              </button>
            ) : (
              <button className="input-send-btn" disabled={!message.trim() && attachments.length === 0} onClick={handleSend}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
