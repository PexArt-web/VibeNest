import { useState } from "react";
import SharedInput from "../../Shared/Component/SharedInput";
import SharedButton from "../../Shared/Component/SharedButton";
import { FaImage, FaFeatherAlt } from "react-icons/fa";
import { Form } from "react-router-dom";

const CreatePost = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white flex justify-center items-center px-4 py-10">
      <Form className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-xl w-full space-y-5">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
          <FaFeatherAlt /> Create a Vibe
        </h2>

        <textarea
          className="w-full p-3 rounded-md bg-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
          rows="5"
          placeholder="What's vibing in your mind?"
          name={"content"}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer text-pink-400 hover:text-pink-300">
            <FaImage />
            <span>Upload Image</span>
            <SharedInput
              type={"file"}
              accept={"image/*"}
              className={"hidden"}
              onChange={handleImageChange}
            />
          </label>

          <SharedButton
            label="Post"
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full transition duration-300"
          />
        </div>

        {imagePreview && (
          <div className="mt-4">
            <p className="text-sm text-white/60">Image Preview:</p>
            <img
              src={imagePreview}
              alt="Preview"
              className="rounded-lg mt-2 max-h-64 object-cover border border-white/20"
            />
          </div>
        )}
      </Form>
    </div>
  );
};

export default CreatePost;
