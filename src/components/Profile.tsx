import React, { useState } from 'react';
import { User, Camera } from 'lucide-react';

type ProfileProps = {
  onClose: () => void;
  onSave: (profile: ProfileData) => void;
  initialData?: ProfileData;
};

export type ProfileData = {
  username: string;
  displayName: string;
  avatarUrl: string;
  level: number;
  totalScore: number;
};

const Profile: React.FC<ProfileProps> = ({ onClose, onSave, initialData }) => {
  const [profile, setProfile] = useState<ProfileData>(initialData || {
    username: '',
    displayName: '',
    avatarUrl: '',
    level: 1,
    totalScore: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(profile);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6 text-center">
            <div className="relative inline-block">
              {profile.avatarUrl ? (
                <img 
                  src={profile.avatarUrl} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
              )}
              <button
                type="button"
                className="absolute bottom-0 right-0 bg-indigo-600 rounded-full p-2 text-white hover:bg-indigo-700"
                onClick={() => {
                  const url = prompt('Enter image URL:');
                  if (url) setProfile({ ...profile, avatarUrl: url });
                }}
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={profile.displayName}
                onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
            >
              Save Profile
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;