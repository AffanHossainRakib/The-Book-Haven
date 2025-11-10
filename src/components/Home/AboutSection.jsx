import React from "react";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="py-20 bg-secondary transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-6">
              About The Book Haven
            </h2>
            <p className="text-lg text-foreground mb-4 leading-relaxed">
              The Book Haven is your personal digital library where book lovers
              come together to discover, share, and discuss their favorite reads.
            </p>
            <p className="text-lg text-foreground mb-6 leading-relaxed">
              Whether you're looking for your next great read or want to share
              your literary discoveries with others, The Book Haven provides the
              perfect platform to connect with fellow book enthusiasts.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-primary mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-muted-foreground">
                  Discover new books from our growing collection
                </p>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-primary mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-muted-foreground">
                  Share your favorite books with the community
                </p>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-primary mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-muted-foreground">
                  Manage your personal book collection effortlessly
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800"
                alt="Books"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
