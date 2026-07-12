import { createClient } from '@supabase/supabase-js';

// These should be set in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getUserCredits(clerkId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('credits, tier')
    .eq('clerk_id', clerkId)
    .single();
    
  if (error) {
    console.error('Error fetching user credits:', error);
    return { credits: 0, tier: 'Free' };
  }
  return data;
}

export async function decrementCredits(clerkId: string, amount: number = 1) {
  // Normally you'd want a secure RPC call for this to prevent race conditions
  const current = await getUserCredits(clerkId);
  if (current.credits < amount) {
    throw new Error('Insufficient credits');
  }
  
  const { error } = await supabase
    .from('users')
    .update({ credits: current.credits - amount })
    .eq('clerk_id', clerkId);
    
  if (error) {
    throw new Error('Failed to update credits');
  }
}

export async function saveGeneratedImage(record: any) {
  const { error } = await supabase
    .from('generated_images')
    .insert([record]);
    
  if (error) {
    console.error('Error saving generated image:', error);
    throw new Error('Failed to save image record');
  }
}
