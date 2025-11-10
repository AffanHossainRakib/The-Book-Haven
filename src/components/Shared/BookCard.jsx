import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Tooltip } from "react-tooltip";

const BookCard = ({ book, showViewDetails = true }) => {
  const { _id, title, author, genre, rating, coverImage, summary } = book;

  return (
    <>
      <motion.div
        className="group relative h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -8 }}
      >
        {/* Glassmorphism Card */}
        <div className="relative h-full overflow-hidden rounded-2xl bg-card/90 backdrop-blur-lg border border-border shadow-xl hover:shadow-2xl transition-all duration-300">
          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-teal-500/0 to-blue-500/0 group-hover:from-indigo-500/10 group-hover:via-teal-500/10 group-hover:to-blue-500/10 transition-all duration-500 pointer-events-none" />

          {/* Book Cover Image */}
          <div className="relative h-64 overflow-hidden">
            <motion.img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            {/* Rating Badge */}
            <div className="absolute top-3 right-3 bg-card/80 backdrop-blur-md text-foreground px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1 border border-border">
              <svg
                className="w-4 h-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {rating}
            </div>
          </div>

          {/* Card Content */}
          <div className="p-5 space-y-3">
            {/* Title */}
            <h3
              className="text-xl font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300"
              data-tooltip-id={`tooltip-${_id}`}
              data-tooltip-content={title}
            >
              {title}
            </h3>

            {/* Author */}
            <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
              <svg
                className="w-4 h-4 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {author}
            </p>

            {/* Genre Badge */}
            <div className="flex items-center gap-2">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-secondary rounded-full">
                {genre}
              </span>
            </div>

            {/* Summary */}
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {summary}
            </p>

            {/* View Details Button */}
            {showViewDetails && (
              <Link to={`/book/${_id}`}>
                <motion.button
                  className="w-full mt-4 py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-teal-600 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Details
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.button>
              </Link>
            )}
          </div>
        </div>
      </motion.div>

      {/* Tooltip */}
      <Tooltip id={`tooltip-${_id}`} place="top" />
    </>
  );
};

export default BookCard;
