import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const updateUserStatus = async (
  userId: string,
  status: 'online' | 'offline' | 'in-game',
  currentGame?: string
) => {
  return supabase
    .from('users')
    .update({
      status,
      current_game: currentGame,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);
};

export const sendFriendRequest = async (userId: string, friendId: string) => {
  return supabase
    .from('friends')
    .insert([
      {
        user_id: userId,
        friend_id: friendId,
        status: 'pending',
      },
    ]);
};

export const acceptFriendRequest = async (userId: string, friendId: string) => {
  return supabase
    .from('friends')
    .update({ status: 'accepted' })
    .eq('user_id', friendId)
    .eq('friend_id', userId);
};

export const getFriends = async (userId: string) => {
  const { data: friends } = await supabase
    .from('friends')
    .select(`
      friend:friend_id(
        id,
        username,
        display_name,
        avatar_url,
        level,
        total_score,
        status,
        current_game
      )
    `)
    .eq('user_id', userId)
    .eq('status', 'accepted');

  return friends?.map(f => f.friend) || [];
};

export const subscribeToFriendStatus = (
  userId: string,
  callback: (payload: any) => void
) => {
  return supabase
    .channel(`friends:${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'users',
        filter: `id=eq.${userId}`,
      },
      callback
    )
    .subscribe();
};