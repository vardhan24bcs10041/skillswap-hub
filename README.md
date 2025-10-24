# 🎯 SkillSwap Hub - MERN Stack Project

A full-stack web application that enables users to exchange skills with each other. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## 🌟 Features

### 🔐 Authentication & User Management
- User registration and login with JWT authentication
- Secure password hashing with bcrypt
- User profile management with bio, location, and avatar
- Rating system for users based on completed exchanges

### 🎨 Skill Management
- Create, read, update, and delete skills
- Categorize skills (Technology, Arts, Music, Languages, Sports, Cooking, Business, Other)
- Set skill levels (Beginner, Intermediate, Advanced, Expert)
- Define availability (Weekdays, Weekends, Flexible)
- Choose teaching mode (Online, Offline, Both)

### 🤝 Skill Exchange System
- Browse available skills with advanced filtering
- Request skill exchanges with other users
- Send personalized messages with exchange requests
- Track exchange status (Pending, Accepted, Rejected, Completed)
- Rate and provide feedback after completed exchanges

### 🎯 Advanced Features
- Real-time search and filtering
- Responsive design for all devices
- Input validation and error handling
- Secure API endpoints with authentication middleware
- Comprehensive error handling

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **React Router DOM** - Client-side routing
- **Context API** - State management
- **Axios** - HTTP client
- **CSS3** - Styling

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.0 or higher)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd skillswap-hub
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` file in `backend/` directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/skillswap-hub
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

   Create `.env` file in `frontend/` directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. **Start MongoDB**
   ```bash
   mongod --dbpath C:\data\db
   ```

6. **Run the Application**

   **Terminal 1 (Backend):**
   ```bash
   cd backend
   npm run dev
   ```

   **Terminal 2 (Frontend):**
   ```bash
   cd frontend
   npm start
   ```

7. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
skillswap-hub/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── skillController.js    # Skill management
│   │   ├── exchangeController.js # Exchange management
│   │   └── userController.js     # User management
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT authentication
│   │   └── validationMiddleware.js # Input validation
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Skill.js              # Skill schema
│   │   └── Exchange.js           # Exchange schema
│   ├── routes/
│   │   ├── auth.js               # Authentication routes
│   │   ├── skills.js             # Skill routes
│   │   ├── exchanges.js          # Exchange routes
│   │   └── users.js              # User routes
│   ├── test/
│   │   └── authFlowTest.js       # Authentication tests
│   ├── .env                      # Environment variables
│   ├── package.json              # Backend dependencies
│   └── server.js                  # Main server file
├── frontend/
│   ├── public/
│   │   └── index.html            # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js         # Navigation component
│   │   │   ├── SkillCard.js      # Skill display component
│   │   │   ├── ExchangeCard.js   # Exchange display component
│   │   │   └── ProtectedRoute.js # Route protection
│   │   ├── context/
│   │   │   └── AuthContext.js    # Authentication context
│   │   ├── pages/
│   │   │   ├── Home.js           # Home page
│   │   │   ├── Login.js           # Login page
│   │   │   ├── Register.js        # Registration page
│   │   │   ├── Dashboard.js       # User dashboard
│   │   │   ├── BrowseSkills.js   # Browse skills page
│   │   │   ├── MyExchanges.js    # User exchanges page
│   │   │   └── Profile.js         # User profile page
│   │   ├── utils/
│   │   │   └── api.js             # API utility functions
│   │   ├── App.js                 # Main app component
│   │   ├── App.css                # App styles
│   │   ├── index.js               # App entry point
│   │   └── index.css              # Global styles
│   ├── .env                       # Frontend environment
│   └── package.json               # Frontend dependencies
├── .gitignore                     # Git ignore file
└── README.md                      # Project documentation
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Skills
- `GET /api/skills` - Get all skills (with filtering)
- `GET /api/skills/my-skills` - Get user's skills
- `POST /api/skills` - Create new skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### Exchanges
- `POST /api/exchanges` - Create exchange request
- `GET /api/exchanges` - Get user's exchanges
- `PUT /api/exchanges/:id` - Update exchange status

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/profile` - Update user profile

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm run test:auth
```

### Manual Testing
1. Register a new user
2. Login with credentials
3. Create a skill
4. Browse skills from another account
5. Request a skill exchange
6. Complete the exchange flow

## 🚀 Deployment

### Backend Deployment (Heroku)
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Connect GitHub repository
4. Deploy from main branch

### Frontend Deployment (Netlify/Vercel)
1. Build the React app: `npm run build`
2. Deploy the build folder to your chosen platform
3. Set environment variables for production

### Environment Variables for Production
```env
# Backend
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/skillswap-hub
JWT_SECRET=your-production-jwt-secret
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com

# Frontend
REACT_APP_API_URL=https://your-backend-domain.com/api
```

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Request size limits
- Environment variable protection

## 🎨 UI/UX Features

- Responsive design for all devices
- Modern and clean interface
- Intuitive navigation
- Real-time feedback
- Error handling with user-friendly messages
- Loading states and animations

## 📱 Mobile Responsiveness

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes

## 🚀 Future Enhancements

- Real-time notifications
- Video call integration
- File upload for skill materials
- Advanced search with AI
- Mobile app development
- Payment integration
- Advanced analytics

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Vardhan** - MERN Stack Developer

## 📞 Contact

For any questions or support, please contact:
- Email: your-email@example.com
- GitHub: [your-github-username](https://github.com/your-username)

---

**Note**: This project was developed as part of the MERN Course Project Submission. All features are fully functional and tested.

## 🎯 Project Highlights

- **Full-Stack Development**: Complete MERN stack implementation
- **Authentication**: Secure JWT-based authentication system
- **Database Design**: Well-structured MongoDB schemas
- **API Design**: RESTful API with proper error handling
- **Frontend**: Modern React.js with hooks and context
- **Validation**: Comprehensive input validation
- **Security**: Production-ready security measures
- **Documentation**: Detailed documentation and setup instructions

**Total Development Time**: 2 weeks
**Lines of Code**: 2000+ lines
**Features Implemented**: 15+ core features
**API Endpoints**: 12+ endpoints
**Database Collections**: 3 main collections
**React Components**: 10+ components
