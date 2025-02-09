export type User = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  level: number;
  totalScore: number;
  friends: string[]; // Array of friend IDs
  friendRequests: {
    incoming: string[]; // Array of user IDs who sent requests
    outgoing: string[]; // Array of user IDs to whom requests were sent
  };
  status: 'online' | 'offline' | 'in-game';
  currentGame?: string;
};