import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import BookCard from "@/components/Shared/BookCard";
import Loader from "@/components/Loader/Loader";
import toast from "react-hot-toast";

const AllBooks = () => {
  const axiosSecure = useAxiosSecure();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetchBooks();
  }, [sortBy]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const endpoint = sortBy ? `/all-books?sort=${sortBy}` : "/all-books";
      const response = await axiosSecure.get(endpoint);

      if (Array.isArray(response.data)) {
        setBooks(response.data);
      } else {
        setBooks([]);
      }
    } catch (err) {
      console.error("Error fetching books:", err.message);
      toast.error("Failed to load books");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader message="Loading all books..." />;
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
            All Books
          </h1>
          <p className="text-xl text-muted-foreground">
            Browse our complete collection of books
          </p>
        </motion.div>

        {/* Sort Controls */}
        <motion.div
          className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-card border border-border p-6 rounded-xl shadow-md transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
              />
            </svg>
            <span className="text-foreground font-medium">Sort by:</span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setSortBy("")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                sortBy === ""
                  ? "bg-gradient-to-r from-indigo-600 to-teal-600 text-white shadow-lg"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              Default
            </button>
            <button
              onClick={() => setSortBy("rating_desc")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                sortBy === "rating_desc"
                  ? "bg-gradient-to-r from-indigo-600 to-teal-600 text-white shadow-lg"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Highest Rating
            </button>
            <button
              onClick={() => setSortBy("rating_asc")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                sortBy === "rating_asc"
                  ? "bg-gradient-to-r from-indigo-600 to-teal-600 text-white shadow-lg"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Lowest Rating
            </button>
          </div>

          <div className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">{books.length}</span>{" "}
            books found
          </div>
        </motion.div>

        {/* Books Grid */}
        {books.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book, index) => (
              <motion.div
                key={book._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <BookCard book={book} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-20"
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
              No books found
            </p>
            <p className="text-muted-foreground">
              Be the first to add a book to the collection!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllBooks;
