import React, { useState } from "react";

export default function Settings() {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "",
    bio: "",
    avatar: ""
  });

  const handleSave = () => alert("Profile saved!");

  const gold = "border-[#d4af37] hover:border-[#bfa032]";
  const btnGold = "bg-[#d4af37] hover:bg-[#bfa032]";

  return (
    <div className="bg-[#fef9e8] min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">Profile Settings</h1>

        <section className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow">
          <div className="px-8 py-6 space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-6">
              <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                {profile.avatar ? (
                  <img src={profile.avatar} alt="avatar" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-3xl font-semibold text-gray-600">
                    {profile.firstName[0]}{profile.lastName[0]}
                  </span>
                )}
              </div>
              <div className="flex gap-3">
                <button className={`px-4 py-2 border rounded-full ${gold} text-[#a07c2f] hover:bg-[#f7ecd9] transition`}>
                  Change Photo
                </button>
                <button className="px-4 py-2 border rounded-full border-red-500 text-red-500 hover:bg-red-50 transition">
                  Remove
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid sm:grid-cols-2 gap-6">
              {["firstName", "lastName", "email", "phone"].map(key => (
                <div key={key}>
                  <label className="block text-lg font-medium text-gray-700 mb-1 capitalize">
                    {key === "email" ? "Email Address" : key.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase())}
                  </label>
                  <input
                    type={key === "email" ? "email" : "text"}
                    value={profile[key]}
                    onChange={e => setProfile(p => ({ ...p, [key]: e.target.value }))}
                    className={`w-full border ${gold} rounded-md p-3 text-lg focus:border-[#d4af37] transition`}
                  />
                </div>
              ))}
            </div>

            {/* Bio */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                rows="4"
                value={profile.bio}
                onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                className={`w-full border ${gold} rounded-md p-3 text-lg focus:border-[#d4af37] transition`}
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button className={`px-8 py-3 rounded-full text-white text-lg ${btnGold} hover:bg-[#bfa032] transition`}>
                Save Profile
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
