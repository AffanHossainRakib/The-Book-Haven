import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";

const AddBook = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    rating: "",
    summary: "",
    coverImage: "",
  });

  const genres = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Fantasy",
    "Romance",
    "Science Fiction",
    "Biography",
    "History",
    "Self-Help",
    "Poetry",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      toast.error("Please enter book title");
      return;
    }
    if (!formData.author.trim()) {
      toast.error("Please enter author name");
      return;
    }
    if (!formData.genre) {
      toast.error("Please select a genre");
      return;
    }
    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      toast.error("Rating must be between 1 and 5");
      return;
    }
    if (!formData.summary.trim()) {
      toast.error("Please enter book summary");
      return;
    }
    if (!formData.coverImage.trim()) {
      toast.error("Please enter cover image URL");
      return;
    }

    try {
      setSubmitting(true);

      const bookData = {
        ...formData,
        rating: parseFloat(formData.rating),
        userEmail: user?.email,
        userName: user?.displayName || "Anonymous",
      };

      await axiosSecure.post("/books", bookData);

      toast.success("Book added successfully!");
      navigate("/all-books");
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error(error.response?.data?.message || "Failed to add book");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Add a New Book
          </h1>
          <p className="text-xl text-muted-foreground">
            Share your favorite book with the community
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          className="bg-card border border-border rounded-2xl shadow-2xl p-8 md:p-12 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-foreground mb-2">
                Book Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background text-foreground border-2 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="Enter book title"
                disabled={submitting}
              />
            </div>

            {/* Author */}
            <div>
              <label htmlFor="author" className="block text-sm font-semibold text-foreground mb-2">
                Author <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background text-foreground border-2 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="Enter author name"
                disabled={submitting}
              />
            </div>

            {/* Genre and Rating Row */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Genre */}
              <div>
                <label htmlFor="genre" className="block text-sm font-semibold text-foreground mb-2">
                  Genre <span className="text-red-500">*</span>
                </label>
                <select
                  id="genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background text-foreground border-2 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  disabled={submitting}
                >
                  <option value="">Select a genre</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating */}
              <div>
                <label htmlFor="rating" className="block text-sm font-semibold text-foreground mb-2">
                  Rating (1-5) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  min="1"
                  max="5"
                  step="0.1"
                  className="w-full px-4 py-3 bg-background text-foreground border-2 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="4.5"
                  disabled={submitting}
                />
              </div>
            </div>

            {/* Cover Image URL */}
            <div>
              <label htmlFor="coverImage" className="block text-sm font-semibold text-foreground mb-2">
                Cover Image URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="coverImage"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background text-foreground border-2 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="https://example.com/book-cover.jpg"
                disabled={submitting}
              />
              <p className="mt-2 text-sm text-muted-foreground">
                Upload your image to a service like imgbb.com and paste the URL here
              </p>
            </div>

            {/* Image Preview */}
            {formData.coverImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative w-48 h-64 mx-auto rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={formData.coverImage}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/200x300?text=Invalid+URL";
                  }}
                />
              </motion.div>
            )}

            {/* Summary */}
            <div>
              <label htmlFor="summary" className="block text-sm font-semibold text-foreground mb-2">
                Summary <span className="text-red-500">*</span>
              </label>
              <textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-3 bg-background text-foreground border-2 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                placeholder="Enter a brief summary of the book..."
                disabled={submitting}
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 px-6 py-4 border-2 border-border text-foreground font-semibold rounded-xl hover:bg-muted transition-all duration-300"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-indigo-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Adding Book...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Book
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddBook;
