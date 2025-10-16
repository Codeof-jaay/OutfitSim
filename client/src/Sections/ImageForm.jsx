import React, { useState } from "react";

export default function ImageForm() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt) return alert("Please enter a prompt!");

    setLoading(true);
    setGeneratedImages([]);

    const formData = new FormData();
    formData.append("prompt", prompt);
    if (image) formData.append("image", image);

    try {
      const res = await fetch("http://127.0.0.1:5000/upload_and_generate", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      // The backend returns base64 images
      setGeneratedImages(data.images || []);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-center">
          Google Imagen Generator
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="3"
              placeholder="Describe what you want to generate..."
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">
              Upload Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full text-gray-700"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Image"}
          </button>
        </form>

        {generatedImages.length > 0 && (
          <div className="mt-6 space-y-4">
            <h2 className="text-lg font-medium text-center">Generated Images</h2>
            <div className="grid grid-cols-1 gap-4">
              {generatedImages.map((img, idx) => (
                <img
                  key={idx}
                  src={`data:image/png;base64,${img}`}
                  alt={`Generated ${idx}`}
                  className="rounded-xl shadow-md"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
