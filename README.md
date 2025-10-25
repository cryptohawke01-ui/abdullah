# CV Portfolio Website - SERN Stack

A full-stack CV portfolio website built with Supabase, Express.js, React, and Node.js. Features a professional portfolio design with a password-protected admin panel for dynamic content management.

## 🚀 Features

- **Professional CV Design**: Clean, modern portfolio layout matching the provided design
- **Admin Panel**: WordPress-like interface at `/makecv` for content management
- **Dynamic Content**: All profile data, news articles, and settings stored in Supabase
- **Responsive Design**: Built with TailwindCSS for mobile-first design
- **Authentication**: Password-protected admin access
- **CRUD Operations**: Full create, read, update, delete functionality for news section

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + TailwindCSS + Vite
- **Backend**: Express.js + Node.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel (Frontend) + Render (Backend)

## 📁 Project Structure

```
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Express.js backend
│   ├── server.js           # Main server file
│   ├── supabase-schema.sql # Database schema
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### 1. Database Setup

1. Create a new Supabase project
2. Run the SQL schema from `backend/supabase-schema.sql` in your Supabase SQL editor
3. Note your Supabase URL and anon key

### 2. Backend Setup

```bash
cd backend
npm install
cp env.example .env
```

Update `.env` with your Supabase credentials:
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=5000
```

Start the backend:
```bash
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
cp env.example .env
```

Update `.env` with your backend URL:
```
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

## 🌐 Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable: `VITE_API_URL=your_backend_url`

### Backend (Render)

1. Connect your GitHub repository to Render
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `NODE_ENV=production`

## 🔐 Admin Access

- Navigate to `/makecv` for admin panel
- Default password: `admin123` (change in AdminPanel.tsx)
- Features:
  - Edit profile information
  - Manage news articles
  - Update site settings

## 📊 Database Schema

### Profile Table
- Personal information (name, title, bio, contact details)
- Profile image and resume URLs
- Date of birth, nationality, languages

### News Table
- Article title, content, and image
- Published status and timestamps
- Full CRUD operations

### Settings Table
- Site title, description
- Admin email and copyright text

## 🎨 Customization

### Styling
- Modify `frontend/tailwind.config.js` for theme customization
- Update color schemes in the config file
- All components use TailwindCSS classes

### Content
- Use the admin panel to update all content
- Profile images should be hosted on GitHub or similar
- Resume files should be accessible via URL

## 🔧 Development

### Adding New Features

1. **New API Endpoints**: Add to `backend/server.js`
2. **New Components**: Create in `frontend/src/components/`
3. **New Pages**: Add to `frontend/src/pages/`
4. **Database Changes**: Update schema and run migrations

### Environment Variables

**Backend (.env)**
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anon key
- `PORT`: Server port (default: 5000)

**Frontend (.env)**
- `VITE_API_URL`: Backend API URL

## 📝 API Endpoints

### Profile
- `GET /api/profile` - Get profile data
- `PUT /api/profile` - Update profile data

### News
- `GET /api/news` - Get all news articles
- `POST /api/news` - Create news article
- `PUT /api/news/:id` - Update news article
- `DELETE /api/news/:id` - Delete news article

### Settings
- `GET /api/settings` - Get site settings
- `PUT /api/settings` - Update site settings

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend CORS is configured
2. **Database Connection**: Verify Supabase credentials
3. **Build Errors**: Check TypeScript types and imports
4. **Deployment Issues**: Verify environment variables

### Debug Mode

Enable debug logging by setting `NODE_ENV=development` in backend environment.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

Built with ❤️ using the SERN stack