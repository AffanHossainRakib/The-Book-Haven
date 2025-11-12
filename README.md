# The Book Haven

**Live Site:** [https://thebookhaven.vercel.app/](https://thebookhaven.vercel.app/)

## Overview

The Book Haven is a full-stack digital library application where book lovers can discover, share, and manage their favorite books. Built with React, Firebase, Express JS and MongoDB, this platform offers a seamless experience for exploring literary collections and engaging with a community of readers.

## Key Features

- **🔐 Secure Authentication System** - Complete user authentication with Firebase supporting email/password login and Google OAuth integration. Password validation ensures strong security with uppercase, lowercase, and minimum length requirements.

- **📚 Comprehensive Book Management** - Full CRUD functionality allowing users to add new books with cover images, update their existing entries, delete books they've added, and view detailed information about any book in the collection with a beautifully designed interface.

- **🌓 Dark/Light Theme Toggle** - Seamless theme switching with persistent storage, allowing users to choose their preferred viewing mode. The elegant transition affects the entire application, providing optimal readability in any lighting condition.

- **💬 Real-Time Comments & Reviews** - Interactive commenting system on book detail pages where authenticated users can share their thoughts, see comments from other readers with timestamps formatted using date-fns, and engage in meaningful discussions about their favorite books.

- **⭐ Advanced Filtering & Sorting** - Smart book discovery with multiple sorting options including highest rated, lowest rated, and newest additions. The intuitive filtering system helps users find exactly what they're looking for in the collection.

## Technologies Used

### Frontend

- **React 19** - Modern UI library with hooks and context API
- **React Router 7** - Client-side routing with protected routes
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Axios** - HTTP client for API requests
- **Firebase Auth** - Authentication service
- **date-fns** - Modern date utility library
- **React Hot Toast** - Beautiful toast notifications
- **React Tooltip** - Accessible tooltip component
- **Yup** - Form validation schema builder

### Backend

- **Node.js & Express** - Server-side runtime and framework
- **MongoDB Atlas** - Cloud database service
- **Firebase Admin SDK** - Server-side authentication

## Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account
- Firebase project

### Frontend Setup

1. Clone the repository:

```bash
git clone <your-repository-url>
cd PH-Assignment10-client
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=your_backend_api_url
```

4. Run the development server:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```

## Project Structure

```
PH-Assignment10-client/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Footer/       # Footer component
│   │   ├── Header/       # Navbar component
│   │   ├── Home/         # Home page sections
│   │   ├── Loader/       # Loading spinner
│   │   ├── Shared/       # Shared components (BookCard, BookDetails)
│   │   └── ui/           # UI library components
│   ├── Contexts/         # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── AuthProvider.jsx
│   │   └── ThemeContext.jsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useAxios.js
│   │   ├── useAxiosSecure.jsx
│   │   └── useTheme.js
│   ├── Layouts/          # Layout components
│   │   ├── AuthLayout.jsx
│   │   └── MainLayout.jsx
│   ├── pages/            # Page components
│   │   ├── AddBook/
│   │   ├── AllBooks/
│   │   ├── Auth/
│   │   ├── Home/
│   │   ├── MyBooks/
│   │   └── NotFound/
│   ├── Routes/           # Routing configuration
│   │   ├── PrivateRoute.jsx
│   │   └── Routes.jsx
│   ├── Firebase/         # Firebase configuration
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.js             # Backend server (in root)
├── vercel.json          # Vercel deployment config
└── package.json         # Project dependencies
```

## API Endpoints

### Books

<!-- - `GET /top-rated-books` - Get top 3 rated books (Public) -->

- `GET /latest-books` - Get latest 6 books (Public)
- `GET /all-books?sort=rating_desc|rating_asc` - Get all books with sorting (Protected)
- `GET /book/:id` - Get single book details (Protected)
- `GET /my-books?email=user@email.com` - Get user's books (Protected)
- `POST /books` - Add new book (Protected)
- `PUT /book/:id` - Update book (Protected)
- `DELETE /book/:id` - Delete book (Protected)

### Comments

- `GET /book/:id/comments` - Get all comments for a book (Protected)
- `POST /book/:id/comments` - Add comment to a book (Protected)

## Features in Detail

### Authentication Flow

- Users can register with email and password or use Google sign-in
- Password validation enforces security standards
- Protected routes redirect to login if not authenticated
- User session persists across page refreshes
- Logout functionality with confirmation

### Book Management

- Add books with title, author, genre, rating (1-5), summary, and cover image URL
- Image preview before submission
- Update functionality with pre-filled form data
- Delete with confirmation dialog
- Ownership verification ensures users can only modify their own books

### User Experience

- Smooth page transitions with Framer Motion
- Loading states for all async operations
- Error handling with user-friendly toast notifications
- Responsive design for mobile, tablet, and desktop
- Dark/light theme with system preference detection
- Custom 404 page for invalid routes

### Comments System

- Real-time comment updates without page refresh
- Display user information (name, photo, timestamp)
- Timestamp formatting with date-fns
- Comment validation (1-1000 characters)
- Empty state handling

## Security Features

- Ownership validation for update/delete operations
- Input sanitization and validation
- Firebase authentication integration
- Secure password requirements
- CORS configuration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is an academic project, but feedback and suggestions are welcome!

## License

This project is created for educational purposes as part of Programming Hero's Web Development course.

## Acknowledgments

- Programming Hero for the project requirements
- Firebase for authentication services
- MongoDB Atlas for database hosting
- Vercel for deployment platform
- The React and Node.js communities

## Contact

For any queries or feedback, please reach out through the project repository.

---

**Made by [Md. Affan Hossain Rakib](https://itsaffan.vercel.app)**
