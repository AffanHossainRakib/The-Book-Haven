import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import useAxios from "@/hooks/useAxios";
import BookCard from "@/components/Shared/BookCard";
import HeroBanner from "@/components/Home/HeroBanner";
import AboutSection from "@/components/Home/AboutSection";
import GenresSection from "@/components/Home/GenresSection";
import toast from "react-hot-toast";
import Loader from "@/components/Loader/Loader";

const Home = () => {
  const axios = useAxios();
  const [latestBooks, setLatestBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/latest-books");

        // Ensure response.data is an array and limit to 6 books
        if (Array.isArray(response.data)) {
          setLatestBooks(response.data.slice(0, 6));
        } else {
          console.warn("API response is not an array:", response.data);
          setLatestBooks([]);
        }
      } catch (error) {
        console.error("Error fetching latest books:", error);
        toast.error("Failed to load latest books");
        setLatestBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBooks();
  }, []);

  return (
    <div className="min-h-screen">
      <HeroBanner />

      {/* Latest Books Section */}
      <section className="py-20 bg-secondary transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Latest Additions
            </h2>
            <p className="text-xl text-muted-foreground">
              Explore the newest books in our collection
            </p>
          </motion.div>

          {loading ? <Loader message="Loading latest books..." /> : null}

          {latestBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestBooks.map((book, index) => (
                <motion.div
                  key={book._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <BookCard book={book} />
                </motion.div>
              ))}
            </div>
          ) : (
            !loading && (
              <div className="text-center py-20">
                <p className="text-2xl text-muted-foreground">
                  No books available yet
                </p>
                <Link to="/add-book">
                  <button className="mt-6 px-6 py-3 bg-gradient-to-r from-indigo-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300">
                    Add the First Book
                  </button>
                </Link>
              </div>
            )
          )}
        </div>
      </section>

      <AboutSection />
      <GenresSection />
    </div>
  );
};

export default Home;
