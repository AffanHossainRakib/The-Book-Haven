import React from "react";
import { motion } from "framer-motion";

const GenresSection = () => {
  const genres = [
    { name: "Fiction", icon: "📚", color: "from-blue-400 to-blue-600" },
    { name: "Mystery", icon: "🔍", color: "from-purple-400 to-purple-600" },
    { name: "Non-Fiction", icon: "📖", color: "from-green-400 to-green-600" },
    { name: "Fantasy", icon: "🐉", color: "from-pink-400 to-pink-600" },
    { name: "Romance", icon: "💕", color: "from-red-400 to-red-600" },
    { name: "Science", icon: "🔬", color: "from-teal-400 to-teal-600" },
    { name: "History", icon: "🏛️", color: "from-yellow-400 to-yellow-600" },
    { name: "Biography", icon: "👤", color: "from-indigo-400 to-indigo-600" },
  ];

  return (
    <section className="py-20 bg-background transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore by Genre
          </h2>
          <p className="text-xl text-muted-foreground">
            Find your next favorite book by category
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {genres.map((genre, index) => (
            <motion.div
              key={genre.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative overflow-hidden rounded-xl p-6 text-center cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Glassmorphism Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${genre.color} opacity-20 dark:opacity-30`} />
              <div className="absolute inset-0 backdrop-blur-md bg-white/10 dark:bg-white/5" />
              <div className="absolute inset-0 border border-white/20 dark:border-white/10 rounded-xl" />

              {/* Gradient Overlay on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${genre.color} opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />

              {/* Content */}
              <div className="relative z-10">
                <div className="text-5xl mb-3 filter drop-shadow-lg">{genre.icon}</div>
                <h3 className="text-foreground dark:text-slate-100 font-bold text-lg drop-shadow-md">{genre.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GenresSection;
