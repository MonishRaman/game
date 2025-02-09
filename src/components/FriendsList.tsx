import React, { useState } from 'react';
import { UserPlus, Users, UserCheck, UserX } from 'lucide-react';
import { User } from '../types/user';
import { playSound } from '../utils/sounds';

type FriendsListProps = {
  currentUser: User;
  onlineFriends: User[];
  onSendRequest: (userId: string) => void;
  onAcceptRequest: (userId: string) => void;
  onDeclineRequest: (userId: string) => void;
  onStartGame: (friendId: string) => void;
};

const FriendsList: React.FC<FriendsListProps> = ({
  currentUser,
  onlineFriends,
  onSendRequest,
  onAcceptRequest,
  onDeclineRequest,
  onStartGame,
}) => {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendId, setFriendId] = useState('');

  const handleSendRequest = () => {
    if (friendId.trim()) {
      onSendRequest(friendId);
      playSound('notification');
      setFriendId('');
      setShowAddFriend(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-bold text-gray-800">Friends</h2>
        </div>
        <button
          onClick={() => setShowAddFriend(!showAddFriend)}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
        >
          <UserPlus className="w-5 h-5" />
          <span>Add Friend</span>
        </button>
      </div>

      {showAddFriend && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <input
            type="text"
            value={friendId}
            onChange={(e) => setFriendId(e.target.value)}
            placeholder="Enter friend's ID"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 mb-3"
          />
          <button
            onClick={handleSendRequest}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            Send Friend Request
          </button>
        </div>
      )}

      {currentUser.friendRequests.incoming.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Friend Requests</h3>
          <div className="space-y-3">
            {currentUser.friendRequests.incoming.map((requestId) => (
              <div key={requestId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-800">ID: {requestId}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onAcceptRequest(requestId);
                      playSound('notification');
                    }}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                  >
                    <UserCheck className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      onDeclineRequest(requestId);
                      playSound('click');
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <UserX className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Online Friends</h3>
        {onlineFriends.map((friend) => (
          <div
            key={friend.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              {friend.avatarUrl ? (
                <img
                  src={friend.avatarUrl}
                  alt={friend.displayName}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
              )}
              <div>
                <p className="font-medium text-gray-800">{friend.displayName}</p>
                <p className="text-sm text-gray-500">
                  {friend.status === 'in-game'
                    ? `Playing ${friend.currentGame}`
                    : 'Online'}
                </p>
              </div>
            </div>
            {friend.status !== 'in-game' && (
              <button
                onClick={() => {
                  onStartGame(friend.id);
                  playSound('click');
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Invite to Game
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;