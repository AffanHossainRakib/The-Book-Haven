import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";

const BookDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchBookAndComments();
  }, [id]);

  const fetchBookAndComments = async () => {
    try {
      setLoading(true);
      // Fetch book details and comments in parallel
      const [bookRes, commentsRes] = await Promise.all([
        axiosSecure.get(`/book/${id}`),
        axiosSecure.get(`/book/${id}/comments`),
      ]);

      setBook(bookRes.data);
      setComments(Array.isArray(commentsRes.data) ? commentsRes.data : []);
    } catch (error) {
      console.error("Error fetching book details:", error);
      toast.error("Failed to load book details");
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    try {
      setSubmitting(true);
      const commentData = {
        comment: commentText.trim(),
        userName: user?.displayName || "Anonymous",
        userEmail: user?.email,
        userPhoto: user?.photoURL || "",
      };

      const response = await axiosSecure.post(`/book/${id}/comments`, commentData);

      // Add new comment to the list (real-time update)
      if (response.data.comment) {
        setComments([response.data.comment, ...comments]);
      }

      setCommentText("");
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error(error.response?.data?.message || "Failed to add comment");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loader message="Loading book details..." />;
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background transition-colors">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Book not found</h2>
          <p className="text-muted-foreground">The book you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background transition-colors py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Book Details Card */}
        <motion.div
          className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden mb-12 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="md:flex">
            {/* Book Cover */}
            <div className="md:w-2/5 relative">
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {/* Rating Badge */}
                <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 border border-white/20">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-bold text-lg">{book.rating}</span>
                </div>
              </div>
            </div>

            {/* Book Info */}
            <div className="md:w-3/5 p-8 md:p-12">
              <div className="space-y-6">
                {/* Title */}
                <motion.h1
                  className="text-4xl md:text-5xl font-bold text-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  {book.title}
                </motion.h1>

                {/* Author */}
                <motion.div
                  className="flex items-center gap-3 text-xl text-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-semibold">by {book.author}</span>
                </motion.div>

                {/* Genre Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <span className="inline-block px-4 py-2 bg-secondary text-primary rounded-full font-semibold">
                    {book.genre}
                  </span>
                </motion.div>

                {/* Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-foreground mb-3">Summary</h2>
                  <p className="text-foreground leading-relaxed text-lg">{book.summary}</p>
                </motion.div>

                {/* Added By */}
                <motion.div
                  className="pt-6 border-t border-border"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <p className="text-sm text-muted-foreground">
                    Added by <span className="font-semibold text-primary">{book.userName}</span>
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Comments Section */}
        <motion.div
          className="bg-card border border-border rounded-2xl shadow-xl p-8 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Comments ({comments.length})
          </h2>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="mb-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <img
                  src={user?.photoURL || "https://via.placeholder.com/40"}
                  alt={user?.displayName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your thoughts about this book..."
                  className="w-full px-4 py-3 bg-background border-2 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none text-foreground"
                  rows="3"
                  disabled={submitting}
                />
                <div className="flex justify-end mt-3">
                  <button
                    type="submit"
                    disabled={submitting || !commentText.trim()}
                    className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Posting..." : "Post Comment"}
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <motion.div
                  key={comment._id || index}
                  className="flex gap-4 p-4 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <div className="flex-shrink-0">
                    <img
                      src={comment.userPhoto || "https://via.placeholder.com/40"}
                      alt={comment.userName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-foreground">{comment.userName}</h4>
                      <span className="text-sm text-muted-foreground">
                        {comment.createdAt && formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-foreground leading-relaxed">{comment.comment}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <svg className="w-16 h-16 mx-auto mb-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-lg">No comments yet. Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookDetails;
