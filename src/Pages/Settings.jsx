import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

export default function Settings() {
  const auth = getAuth();
  const db = getFirestore();

  const user = auth.currentUser;
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    avatar: ""
  });

  // Load profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setProfile(prev => ({ ...prev, ...userSnap.data() }));
        } else {
          // Populate with Firebase Auth info if new
          setProfile(prev => ({
            ...prev,
            email: user.email,
            firstName: user.displayName?.split(" ")[0] || "",
            lastName: user.displayName?.split(" ")[1] || ""
          }));
        }
      }
      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  // Save Profile to Firestore
  const handleSave = async () => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);

    try {
      await setDoc(userRef, profile);
      alert("Profile saved successfully!");
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Failed to save profile.");
    }
  };

  // Handle avatar as base64 (no Firebase Storage)
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setProfile(prev => ({ ...prev, avatar: base64String }));

      // Optionally update Firestore immediately:
      // await setDoc(doc(db, "users", user.uid), { avatar: base64String }, { merge: true });
    };

    reader.readAsDataURL(file);
  };

  if (loading) return <div className="p-8">Loading profile...</div>;

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
                    {profile.firstName[0] || ""}{profile.lastName[0] || ""}
                  </span>
                )}
              </div>
              <div className="flex gap-3">
                <label className={`px-4 py-2 border rounded-full ${gold} text-[#a07c2f] hover:bg-[#f7ecd9] transition cursor-pointer`}>
                  Change Photo
                  <input type="file" className="hidden" onChange={handleAvatarChange} />
                </label>
                <button
                  className="px-4 py-2 border rounded-full border-red-500 text-red-500 hover:bg-red-50 transition"
                  onClick={() => setProfile(p => ({ ...p, avatar: "" }))}
                >
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
                    readOnly={key === "email"}
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
              <button
                onClick={handleSave}
                className={`px-8 py-3 rounded-full text-white text-lg ${btnGold} hover:bg-[#bfa032] transition`}
              >
                Save Profile
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
