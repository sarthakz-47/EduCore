# EduCore

A full-stack Learning Management System (LMS) where instructors can create and publish courses with video lectures, and students can browse, purchase, and track their progress through courses.

Repo: [sarthakz-47/EduCore](https://github.com/sarthakz-47/EduCore)

## Features

**Student**
- Register / login with secure JWT (httpOnly cookie) authentication
- Browse and search published courses with category and price filters
- View course details and preview free lectures
- Purchase courses via Stripe Checkout
- Track lecture-by-lecture progress and mark courses complete / incomplete
- "My Learning" dashboard of enrolled courses
- Editable profile with photo upload

**Instructor**
- Admin dashboard with sidebar navigation
- Create, edit, publish / unpublish courses
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
- Cloudinary for media storage (images / videos)
- Stripe for payments

## Project Structure

```
EduCore/
├── client/                     # React frontend
│   └── src/
│       ├── app/                # Redux store & root reducer
│       ├── components/         # Shared components + shadcn/ui primitives
│       ├── features/           # RTK Query API slices & auth slice
│       ├── layout/              # App layout wrapper
│       ├── lib/                # Utility helpers
│       └── pages/
│           ├── admin/          # Instructor dashboard, course & lecture management
│           └── student/        # Course browsing, purchase, progress, profile
└── server/                     # Express backend
    ├── controllers/            # Route handlers (course, purchase, progress, user)
    ├── database/                # MongoDB connection
    ├── middlewares/            # Auth middleware
    ├── models/                 # Mongoose schemas
    ├── routes/                 # API route definitions
    └── utils/                  # Cloudinary, Multer, JWT helpers
```

## API Overview

| Base Route          | Responsibility                                        |
|----------------------|---------------------------------------------------------|
| `/api/v1/user`       | Register, login, logout, profile                        |
| `/api/v1/course`     | CRUD for courses & lectures, publish toggle, search      |
| `/api/v1/media`      | Video / image upload to Cloudinary                       |
| `/api/v1/purchase`   | Stripe checkout session, webhook, purchase status         |
| `/api/v1/progress`   | Lecture view tracking, mark complete / incomplete         |

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB instance (local or Atlas)
- Cloudinary account
- Stripe account

### 1. Clone the repo
```bash
git clone https://github.com/sarthakz-47/EduCore.git
cd EduCore
```

### 2. Server setup
```bash
cd server
npm install
```

Create a `.env` file in `server/` with:
```env
PORT=3000
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

### 3. Client setup
```bash
cd client
npm install
npm run dev
```

The client runs on `http://localhost:5173` and expects the API at `http://localhost:3000` (CORS is configured for this origin in `server/index.js`).

### 4. Stripe webhook (local testing)
Use the [Stripe CLI](https://stripe.com/docs/stripe-cli) to forward events to your local server:
```bash
stripe listen --forward-to localhost:3000/api/v1/purchase/webhook
```
