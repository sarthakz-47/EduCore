# EduCore

A full-stack Learning Management System (LMS) where instructors can create and publish courses with video lectures, and students can browse, purchase, and track their progress through courses.

Repo: [sarthakz-47/EduCore](https://github.com/sarthakz-47/EduCore)

## Features

**Student**
- Register / login with secure JWT (httpOnly cookie) authentication
- Browse and search published courses with category and price filters
- View course details and preview free lectures
- Purchase courses via Stripe Checkout
- Track lecture-by-lecture progress and mark courses complete/incomplete
- "My Learning" dashboard of enrolled courses
- Editable profile with photo upload

**Instructor**
- Admin dashboard with sidebar navigation
- Create, edit, publish/unpublish courses
- Rich text course descriptions (Quill editor)
- Add, edit, and remove lectures with video upload
- Toggle free preview per lecture
- Course thumbnail upload

## Tech Stack

**Frontend**
- React 19 + Vite
- Redux Toolkit & RTK Query
- React Router v7
- Tailwind CSS v4 + shadcn/ui (Radix primitives)
- React Quill (rich text editor)
- React Player

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- JSON Web Tokens (JWT) for auth
- bcryptjs for password hashing
- Multer for file uploads
- Cloudinary for media storage (images/videos)
- Stripe for payments

## Project Structure

```
EduCore/
├── client/                # React frontend
│   └── src/
│       ├── app/            # Redux store
│       ├── components/     # Shared components + shadcn/ui
│       ├── features/       # Redux slices & RTK Query API definitions
│       ├── layout/          # App layout (Navbar + Outlet)
│       └── pages/
│           ├── admin/       # Instructor dashboard, course/lecture management
│           └── student/     # Course browsing, detail, progress, profile
└── server/                # Express backend
    ├── controllers/         # Route logic (user, course, purchase, progress)
    ├── database/            # MongoDB connection
    ├── middlewares/          # Auth middleware
    ├── models/               # Mongoose schemas
    ├── routes/               # Express routers
    └── utils/                # Cloudinary, Multer, JWT helpers
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- A [Cloudinary](https://cloudinary.com/) account
- A [Stripe](https://stripe.com/) account

### 1. Clone the repo
```bash
git clone https://github.com/sarthakz-47/EduCore.git
cd EduCore
```

### 2. Backend setup
```bash
cd server
npm install
```

Create a `.env` file in `server/`:
```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
WEBHOOK_ENDPOINT_SECRET=your_stripe_webhook_secret
```

Run the server:
```bash
npm run dev
```
The API runs on `http://localhost:8080` by default.

### 3. Frontend setup
```bash
cd client
npm install
npm run dev
```
The client runs on `http://localhost:5173` by default.

> Note: The frontend currently points to `http://localhost:8080/api/v1` for API calls, and the backend's CORS config allows `http://localhost:5173` as the origin. Update these if you change ports or deploy.

## API Overview

| Base Route | Description |
|---|---|
| `/api/v1/user` | Register, login, logout, profile |
| `/api/v1/course` | Create/edit courses & lectures, search, publish |
| `/api/v1/media` | Video/image upload to Cloudinary |
| `/api/v1/purchase` | Stripe checkout & purchase status |
| `/api/v1/progress` | Lecture/course progress tracking |

## License

This project currently has no license specified.

## Contributing

Issues and pull requests are welcome.
