import React, { useState } from 'react';

export default function Settings() {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    bio: '',
    avatar: ''
  });

  const handleSave = () => alert('Profile saved');

  return (
    <div className="flex h-full bg-[#fff8e4]">
      <div className="w-64 p-6 bg-white shadow-md">
        <h2 className="text-lg font-semibold mb-4">Settings</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="cursor-pointer hover:text-blue-600">Profile</li>
          {/* Future tabs */}
        </ul>
      </div>

      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-2xl mx-auto bg-white shadow-sm rounded-lg">
          {/* Header */}
          <div className="px-6 py-4 border-b">
            <h3 className="text-xl font-semibold">Profile Information</h3>
            <p className="text-gray-500">Update your personal details</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {profile.avatar ? (
                  <img src={profile.avatar} alt="avatar" className="object-cover h-full w-full" />
                ) : (
                  <span className="text-2xl font-bold text-gray-600">
                    {profile.firstName[0]}{profile.lastName[0]}
                  </span>
                )}
              </div>
              <div className="space-x-2">
                <button className="px-3 py-1 border rounded-lg text-blue-600 hover:bg-blue-50">Change</button>
                <button className="px-3 py-1 border rounded-lg text-red-600 hover:bg-red-50">Remove</button>
              </div>
            </div>

            {/* Inputs */}
            {['firstName', 'lastName', 'email', 'bio'].map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                  {key === 'bio' ? 'Bio' : key.replace(/([A-Z])/g, ' $1')}
                </label>
                {key === 'bio' ? (
                  <textarea
                    rows={4}
                    value={profile[key]}
                    onChange={e => setProfile({ ...profile, [key]: e.target.value })}
                    className="block w-full border rounded-md p-2"
                  />
                ) : (
                  <input
                    type={key === 'email' ? 'email' : 'text'}
                    value={profile[key]}
                    onChange={e => setProfile({ ...profile, [key]: e.target.value })}
                    className="block w-full border rounded-md p-2"
                  />
                )}
              </div>
            ))}

            {/* Save */}
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
