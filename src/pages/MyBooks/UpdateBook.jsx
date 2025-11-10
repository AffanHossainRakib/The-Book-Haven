import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";
import Loader from "@/components/Loader/Loader";
import toast from "react-hot-toast";

const UpdateBook = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get(`/book/${id}`);
      const book = response.data;

      // Check if the book belongs to the current user
      if (book.userEmail !== user?.email) {
        toast.error("You can only update your own books");
        navigate("/my-books");
        return;
      }

      setFormData({
        title: book.title || "",
        author: book.author || "",
        genre: book.genre || "",
        rating: book.rating || "",
        summary: book.summary || "",
        coverImage: book.coverImage || "",
      });
    } catch (error) {
      console.error("Error fetching book:", error);
      toast.error("Failed to load book details");
      navigate("/my-books");
    } finally {
      setLoading(false);
    }
  };

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
      };

      await axiosSecure.put(`/book/${id}`, bookData);

      toast.success("Book updated successfully!");
      navigate("/my-books");
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error(error.response?.data?.message || "Failed to update book");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loader message="Loading book details..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Update Book
          </h1>
          <p className="text-xl text-gray-600">
            Edit your book information
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                Book Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                placeholder="Enter book title"
                disabled={submitting}
              />
            </div>

            {/* Author */}
            <div>
              <label htmlFor="author" className="block text-sm font-semibold text-gray-700 mb-2">
                Author <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                placeholder="Enter author name"
                disabled={submitting}
              />
            </div>

            {/* Genre and Rating Row */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Genre */}
              <div>
                <label htmlFor="genre" className="block text-sm font-semibold text-gray-700 mb-2">
                  Genre <span className="text-red-500">*</span>
                </label>
                <select
                  id="genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-white"
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
                <label htmlFor="rating" className="block text-sm font-semibold text-gray-700 mb-2">
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  placeholder="4.5"
                  disabled={submitting}
                />
              </div>
            </div>

            {/* Cover Image URL */}
            <div>
              <label htmlFor="coverImage" className="block text-sm font-semibold text-gray-700 mb-2">
                Cover Image URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="coverImage"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                placeholder="https://example.com/book-cover.jpg"
                disabled={submitting}
              />
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
              <label htmlFor="summary" className="block text-sm font-semibold text-gray-700 mb-2">
                Summary <span className="text-red-500">*</span>
              </label>
              <textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none"
                placeholder="Enter a brief summary of the book..."
                disabled={submitting}
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate("/my-books")}
                className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300"
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
                    Updating Book...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Update Book
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

export default UpdateBook;