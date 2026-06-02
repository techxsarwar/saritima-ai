import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, FileText } from 'lucide-react';
import type { ChatMessage } from '../../types/chat';
import { LogoIcon } from '../icons/LogoIcon';

interface ChatMessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
  showToast: (message: string) => void;
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({ messages, isLoading, showToast }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast("Copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderUserMessage = (content: string) => {
    const documentRegex = /<document name="(.*?)">([\s\S]*?)<\/document>/g;
    const imageRegex = /<image_attachment name="([^"]*?)" src="([^"]*?)" \/>/g;
    
    const parts: Array<{ type: 'text'; content: string } | { type: 'document' | 'image'; index: number; length: number; name: string; data: string }> = [];
    let lastIndex = 0;
    
    // Combine matches from both regexes
    const allMatches: Array<{ type: 'document' | 'image'; index: number; length: number; name: string; data: string }> = [];
    let match;
    
    while ((match = documentRegex.exec(content)) !== null) {
      allMatches.push({ type: 'document', index: match.index, length: match[0].length, name: match[1], data: match[2] });
    }
    
    while ((match = imageRegex.exec(content)) !== null) {
      allMatches.push({ type: 'image', index: match.index, length: match[0].length, name: match[1], data: match[2] });
    }
    
    // Sort matches by index
    allMatches.sort((a, b) => a.index - b.index);
    
    for (const m of allMatches) {
      if (m.index > lastIndex) {
        parts.push({ type: 'text', content: content.substring(lastIndex, m.index) });
      }
      parts.push(m);
      lastIndex = m.index + m.length;
    }
    
    // Add remaining text
    if (lastIndex < content.length) {
      parts.push({ type: 'text', content: content.substring(lastIndex) });
    }

    if (parts.length === 0) {
      return <div className="user-message-text" style={{ whiteSpace: 'pre-wrap' }}>{content}</div>;
    }

    return (
      <div className="user-message-complex">
        {parts.map((part, i) => {
          if (part.type === 'text' && part.content.trim() !== '') {
            return <div key={i} className="user-message-text" style={{ whiteSpace: 'pre-wrap' }}>{part.content.trim()}</div>;
          } else if (part.type === 'document') {
            return (
              <div key={i} className="message-attachment-block">
                <div className="message-attachment-header">
                  <FileText size={16} className="message-attachment-icon" />
                  <span className="message-attachment-name">{part.name}</span>
                  <span className="message-attachment-size">{(part.data.length / 1000).toFixed(1)}k chars</span>
                </div>
                <div className="message-attachment-body">
                  Pasted content
                </div>
              </div>
            );
          } else if (part.type === 'image') {
            return (
              <div key={i} className="message-image-block">
                <img src={part.data} alt={part.name} className="message-image" />
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <div className="chat-content">
      {messages.map((msg) => (
        msg.role === 'user' ? (
          <div key={msg.id} className="message user-message-wrapper">
            <div className="user-message">
              {renderUserMessage(msg.content)}
            </div>
          </div>
        ) : (
          <div key={msg.id} className="message ai-message-wrapper group">
            <div className="ai-message">
              <div className="ai-avatar-wrapper">
                <LogoIcon size={20} />
              </div>
              <div className="ai-content markdown-body" style={{ lineHeight: 1.6, position: 'relative' }}>
                <button 
                  className="copy-button"
                  onClick={() => handleCopy(msg.content, msg.id)}
                  title="Copy to clipboard"
                >
                  {copiedId === msg.id ? <Check size={14} /> : <Copy size={14} />}
                </button>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code(props) {
                      const {children, className, node, ...rest} = props;
                      const match = /language-(\w+)/.exec(className || '');
                      const codeString = String(children).replace(/\n$/, '');
                      return match ? (
                        <div className="code-block-wrapper" style={{ position: 'relative', margin: '1rem 0', borderRadius: '8px', overflow: 'hidden' }}>
                          <div className="code-block-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#2d2d2d', color: '#999', padding: '0.4rem 1rem', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                            <span>{match[1]}</span>
                            <button 
                              onClick={() => handleCopy(codeString, `code-${Math.random()}`)}
                              style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                            >
                              <Copy size={12} /> Copy
                            </button>
                          </div>
                          <SyntaxHighlighter
                            {...(rest as any)}
                            PreTag="div"
                            children={codeString}
                            language={match[1]}
                            style={vscDarkPlus as any}
                            customStyle={{ margin: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                          />
                        </div>
                      ) : (
                        <code {...rest} className={className}>
                          {children}
                        </code>
                      );
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
            <div className="ai-content" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-muted)', fontStyle: 'italic', fontSize: '0.95rem' }}>
              <span>Saritima is thinking</span>
              <span style={{ animation: 'pulse 1.5s infinite', opacity: 0.6 }}>.</span>
              <span style={{ animation: 'pulse 1.5s infinite', opacity: 0.6, animationDelay: '0.2s' }}>.</span>
              <span style={{ animation: 'pulse 1.5s infinite', opacity: 0.6, animationDelay: '0.4s' }}>.</span>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
