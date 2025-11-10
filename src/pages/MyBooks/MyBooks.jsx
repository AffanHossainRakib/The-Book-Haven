import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";
import Loader from "@/components/Loader/Loader";
import toast from "react-hot-toast";

const MyBooks = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchMyBooks();
  }, [user]);

  const fetchMyBooks = async () => {
    if (!user?.email) return;

    try {
      setLoading(true);
      const response = await axiosSecure.get(`/my-books?email=${user.email}`);

      if (Array.isArray(response.data)) {
        setBooks(response.data);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error("Error fetching my books:", error);
      toast.error("Failed to load your books");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookId, bookTitle) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${bookTitle}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeleting(bookId);
      await axiosSecure.delete(`/book/${bookId}?userEmail=${user.email}`);

      // Remove from UI
      setBooks(books.filter((book) => book._id !== bookId));
      toast.success("Book deleted successfully!");
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error(error.response?.data?.message || "Failed to delete book");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return <Loader message="Loading your books..." />;
  }

  return (
    <div className="min-h-screen bg-background transition-colors py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            My Books
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage your personal book collection
          </p>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          className="bg-gradient-to-r from-indigo-600 to-teal-600 rounded-2xl p-6 mb-8 text-white shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium mb-1">
                Total Books
              </p>
              <p className="text-4xl font-bold">{books.length}</p>
            </div>
            <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
              <svg
                className="w-12 h-12"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            </div>
          </div>
        </motion.div>

        {books.length > 0 ? (
          <motion.div
            className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Book
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Author
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Genre
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">
                      Rating
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {books.map((book, index) => (
                    <motion.tr
                      key={book._id}
                      className="hover:bg-muted transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-12 h-16 object-cover rounded-lg shadow-md"
                          />
                          <div>
                            <p className="font-semibold text-foreground">
                              {book.title}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-foreground">{book.author}</td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-secondary text-primary rounded-full text-sm font-medium">
                          {book.genre}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <svg
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="font-semibold text-foreground">
                            {book.rating}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link to={`/update-book/${book._id}`}>
                            <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(book._id, book.title)}
                            disabled={deleting === book._id}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {deleting === book._id ? (
                              <svg
                                className="w-5 h-5 animate-spin"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            )}
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-border">
              {books.map((book, index) => (
                <motion.div
                  key={book._id}
                  className="p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <div className="flex gap-4">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-20 h-28 object-cover rounded-lg shadow-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">
                        {book.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {book.author}
                      </p>
                      <span className="inline-block px-2 py-1 bg-secondary text-primary rounded-full text-xs font-medium mb-2">
                        {book.genre}
                      </span>
                      <div className="flex items-center gap-1 mb-3">
                        <svg
                          className="w-4 h-4 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-semibold text-foreground">
                          {book.rating}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Link to={`/update-book/${book._id}`} className="flex-1">
                          <button className="w-full py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
                            Update
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(book._id, book.title)}
                          disabled={deleting === book._id}
                          className="flex-1 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50 text-sm font-medium"
                        >
                          {deleting === book._id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-20 bg-card border border-border rounded-2xl shadow-xl transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <svg
              className="w-24 h-24 mx-auto text-muted mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <p className="text-2xl text-muted-foreground mb-4">
              You haven't added any books yet
            </p>
            <Link to="/add-book">
              <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all duration-300">
                Add Your First Book
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyBooks;
