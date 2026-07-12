-- Supabase Database Schema for PhotoFlugel

-- 1. Users table (synced with Clerk via webhook)
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clerk_id TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    credits INTEGER DEFAULT 10,
    tier TEXT DEFAULT 'Free',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Subscriptions table (for Stripe integration)
CREATE TABLE public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    stripe_customer_id TEXT UNIQUE,
    stripe_subscription_id TEXT UNIQUE,
    status TEXT,
    plan_id TEXT,
    current_period_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Collections table (Folders for generated images)
CREATE TABLE public.collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. GeneratedImages table
CREATE TABLE public.generated_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    prompt TEXT NOT NULL,
    negative_prompt TEXT,
    style TEXT,
    width INTEGER NOT NULL,
    height INTEGER NOT NULL,
    seed INTEGER,
    cfg NUMERIC,
    steps INTEGER,
    status TEXT DEFAULT 'pending',
    generation_time NUMERIC,
    image_url TEXT,
    collection_id UUID REFERENCES public.collections(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. PromptHistory table
CREATE TABLE public.prompt_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    prompt TEXT NOT NULL,
    settings JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompt_history ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own data
CREATE POLICY "Users can view own record" ON public.users FOR SELECT USING (auth.uid()::text = clerk_id);
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions FOR SELECT USING (user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text));
CREATE POLICY "Users can manage own collections" ON public.collections FOR ALL USING (user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text));
CREATE POLICY "Users can manage own images" ON public.generated_images FOR ALL USING (user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text));
CREATE POLICY "Users can view own prompt history" ON public.prompt_history FOR ALL USING (user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text));
