-- Create chat_sessions table
CREATE TABLE chat_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL,
    title TEXT NOT NULL DEFAULT 'New Chat',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create chat_messages table
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'ai', 'system')),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Note: For a rapid prototype using Clerk without a custom Supabase JWT template, 
-- we are writing relaxed policies that allow operations for the 'anon' role based 
-- on the client providing their user_id. In production, you should use the Clerk 
-- integration to verify the user_id securely via auth.uid().

-- Policies for chat_sessions
CREATE POLICY "Enable all actions for sessions based on user_id" 
ON chat_sessions FOR ALL TO anon
USING (true)
WITH CHECK (true);

-- Policies for chat_messages
CREATE POLICY "Enable all actions for messages"
ON chat_messages FOR ALL TO anon
USING (true)
WITH CHECK (true);

-- Note: The above policies are intentionally completely open for rapid prototyping.
-- Anyone with the anon key can read/write data. You should lock this down in production.
