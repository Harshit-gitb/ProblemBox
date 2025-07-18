import React, { useState } from 'react';

export default function Settings() {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    bio: ''
  });

  const handleSave = () => {
    alert('Profile Saved'); // simple feedback instead of toast
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem' }}>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Settings</h1>

      <section style={{
          border: '1px solid #ddd',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
        <h2>Profile Information</h2>
        <hr style={{ margin: '0.5rem 0' }} />

        <div style={{ marginBottom: '1rem' }}>
          <label>
            First Name<br />
            <input
              type="text"
              value={profile.firstName}
              onChange={e => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>
            Last Name<br />
            <input
              type="text"
              value={profile.lastName}
              onChange={e => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>
            Email<br />
            <input
              type="email"
              value={profile.email}
              onChange={e => setProfile(prev => ({ ...prev, email: e.target.value }))}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>
            Bio<br />
            <textarea
              value={profile.bio}
              onChange={e => setProfile(prev => ({ ...prev, bio: e.target.value }))}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', height: '100px' }}
            />
          </label>
        </div>

        <button
          onClick={handleSave}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Save Profile
        </button>
      </section>
    </div>
  );
}
