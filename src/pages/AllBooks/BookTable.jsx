import { Link } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const BookTable = ({ books }) => {
  // Column configuration
  const columns = [
    {
      header: "Book",
      accessor: "title",
      render: (value, book) => (
        <div className="flex items-center gap-4">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-12 h-16 object-cover rounded-lg shadow-md"
          />
          <div>
            <p className="font-semibold text-foreground">{value}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Author",
      accessor: "author",
    },
    {
      header: "Genre",
      accessor: "genre",
      render: (value) => (
        <span className="inline-block px-3 py-1 bg-secondary text-primary rounded-full text-sm font-medium">
          {value}
        </span>
      ),
    },
    {
      header: "Rating",
      accessor: "rating",
      align: "center",
      render: (value) => (
        <div className="flex items-center justify-center gap-1">
          <svg
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="font-semibold text-foreground">{value}</span>
        </div>
      ),
    },
    {
      header: "Actions",
      accessor: "_id",
      align: "center",
      render: (value) => (
        <Link to={`/book/${value}`}>
          <Button
            variant="outline"
            size="sm"
            className="bg-gradient-to-r from-indigo-600 to-teal-600 text-white border-none hover:shadow-lg transition-all duration-300"
          >
            View Details
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden transition-colors">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  className={`px-6 py-4 text-sm font-semibold text-foreground ${
                    column.align === "center" ? "text-center" : "text-left"
                  }`}
                >
                  {column.header}
                </th>
              ))}
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
                {columns.map((column) => (
                  <td
                    key={column.accessor}
                    className={`px-6 py-4 ${
                      column.align === "center" ? "text-center" : ""
                    }`}
                  >
                    {column.render
                      ? column.render(book[column.accessor], book)
                      : book[column.accessor]}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookTable;
