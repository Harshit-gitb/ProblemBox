import React, { useState } from "react";
import { submitIssue } from "../utils/firestoreHelpers";
import { getAuth, signOut } from "firebase/auth";

const Raiseissue = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tag: "",
    priority: "High",
    location: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result, // base64 encoded string
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("Please login to raise an issue.");
      return;
    }

    if (formData.title.trim() && formData.description.trim()) {
      try {
        const issueData = {
          ...formData,
        };

        await submitIssue(issueData, user.email);

        alert("Issue submitted successfully!");
        setFormData({
          title: "",
          description: "",
          tag: "",
          priority: "High",
          location: "",
          image: null,
        });
      } catch (err) {
        console.error("Error submitting issue:", err);
        alert("Failed to submit issue.");
      }
    } else {
      alert("Please fill all required fields.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fefdf9] py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white border border-[#f5e7c5] rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-[#bfa76f] mb-8 text-center">
          Raise an Issue
        </h2>
        <div className="space-y-5">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Issue Title"
            className="w-full px-5 py-3 rounded-md border border-[#f5e7c5] bg-[#fefcf4]"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe your issue here..."
            rows="4"
            className="w-full px-5 py-3 rounded-md border border-[#f5e7c5] bg-[#fefcf4] resize-none"
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Enter location (e.g., 3rd Floor, IT Department)"
            className="w-full px-5 py-3 rounded-md border border-[#f5e7c5] bg-[#fefcf4]"
          />
          <select
            name="tag"
            value={formData.tag}
            onChange={handleInputChange}
            className="w-full px-5 py-3 rounded-md border border-[#f5e7c5] bg-[#fefcf4]"
          >
            <option value="">Select Tag</option>
            <option value="HR_Employee_Issues">HR & Employee Issues</option>
            <option value="Office_Infrastructure_Issues">
              Office Infrastructure Issues
            </option>
            <option value="Office_Supplies_Assets">
              Office Supplies & Assets
            </option>
            <option value="Training_Access_Issues">
              Training & Access Issues
            </option>
            <option value="Administrative_Process_Issues">
              Administrative/Process Issues
            </option>
            <option value="others">Others</option>
          </select>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
            className="w-full px-5 py-3 rounded-md border border-[#f5e7c5] bg-[#fefcf4]"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* 🖼️ Upload Image */}
          <div
            className="w-full border-2 border-dashed border-[#f5e7c5] bg-[#fefcf4] rounded-lg p-6 h-52 flex flex-col items-center justify-center relative space-y-3"
            onClick={() => document.getElementById("imageUpload")?.click()}
          >
            {formData.image ? (
              <>
                {formData.image instanceof File ? (
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Preview"
                    className="max-h-28 object-contain rounded-md"
                  />
                ) : (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="max-h-28 object-contain rounded-md"
                  />
                )}

                <p className="text-sm text-[#5c4a23] font-medium">
                  {formData.image.name}
                </p>
              </>
            ) : (
              <>
                <p className="text-[#5c4a23] text-center font-medium opacity-40">
                  Drag and drop files here, or click to browse
                </p>
                <button
                  type="button"
                  className="px-4 py-2 bg-white border border-[#f5e7c5] text-[#5c4a23] rounded-md hover:bg-[#f5e7c5] transition-all"
                >
                  Choose Files
                </button>
              </>
            )}
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-[#f5e7c5] hover:bg-[#e6d8b0] text-[#5c4a23] font-semibold py-3 px-6 rounded-lg transition-all duration-300"
          >
            Submit Issue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Raiseissue;
