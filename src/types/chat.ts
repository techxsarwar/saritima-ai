export interface ChatMessage {
  id: string;
  role: 'user' | 'ai' | 'system';
  content: string;
}

export interface ChatSession {
  id: string;
  title: string;
  created_at: string;
}

export interface ChatAttachment {
  id: string;
  name: string;
  content: string;
  type?: 'image' | 'text';
}
