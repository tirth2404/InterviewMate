# 🧠 InterviewMate - AI-Powered Interview Preparation Platform

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.11-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Smart interview preparation powered by Generative AI** - Help students and job seekers prepare for technical interviews with personalized AI-generated questions, mock interviews, and instant feedback.

## 📋 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [✨ Key Features](#-key-features)
- [🛠️ Technology Stack](#️-technology-stack)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🎨 Design System](#-design-system)
- [🔧 Development](#-development)
- [📱 User Flow](#-user-flow)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🎯 Project Overview

InterviewMate is a comprehensive web-based interview preparation platform that leverages Generative AI to provide personalized learning experiences. The platform helps users prepare for technical interviews through AI-generated questions, interactive mock interviews, and intelligent feedback systems.

### 🎯 Project Objectives

- **Build a smart AI-driven interview preparation tool**
- **Provide personalized practice through AI-generated content**
- **Improve user confidence through mock interviews and real-time feedback**
- **Showcase modern web development and AI integration skills**

## ✨ Key Features

### 👤 User Features
- **🔐 Secure Authentication** - Role-based login/signup system
- **🎯 Domain & Difficulty Selection** - Personalized learning paths
- **📚 Practice Mode** - AI-generated Q&A with instant model answers
- **💬 Mock Interview Mode** - Manual answer input with AI feedback and rating
- **📊 Answer History** - Track past answers and progress
- **🔖 Bookmark Questions** - Save important questions for later
- **📈 Domain-Wise Analytics** - Performance insights per topic
- **🏆 Earn Badges** - Gamification through achievement system
- **🏅 Leaderboard** - Competitive spirit among users

### 👨‍💼 Admin Features
- **🔐 Admin Authentication** - Secure admin-only access
- **👥 User Management** - View, update, or remove users
- **📝 Content Control** - Add/edit/remove interview domains and topics
- **📊 Performance Dashboard** - Platform-wide analytics and usage insights

### 🧠 AI-Powered Capabilities
- **🤖 Dynamic Question Generation** - AI creates questions based on domain and difficulty
- **📝 Intelligent Answer Evaluation** - AI scores answers (1-10) with detailed feedback
- **💡 Personalized Feedback** - Contextual suggestions for improvement
- **📋 Result Summaries** - Comprehensive performance reports

## 🛠️ Technology Stack

| Layer | Technology | Version |
|-------|------------|---------|
| **Frontend Framework** | React.js | 18.3.1 |
| **Build Tool** | Vite | 5.4.1 |
| **Styling** | Tailwind CSS | 3.4.11 |
| **UI Components** | shadcn/ui | Latest |
| **Routing** | React Router DOM | 6.26.2 |
| **State Management** | React Query | 5.56.2 |
| **Form Handling** | React Hook Form | 7.53.0 |
| **Icons** | Lucide React | 0.462.0 |
| **Animations** | Tailwind CSS Animate | 1.0.7 |

### 🔮 Future AI Integration
- **OpenAI API (GPT-4 Turbo)** - For question generation and evaluation
- **Google Gemini Pro API** - Alternative AI model integration
- **Custom Prompt Engineering** - Optimized for interview scenarios

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/interviewmate.git
   cd interviewmate
   ```

2. **Install dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

## 📁 Project Structure

```
InterviewMate/
├── client/                          # Frontend application
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── ui/                  # shadcn/ui components
│   │   │   └── Navbar.jsx           # Navigation component
│   │   ├── pages/                   # Page components
│   │   │   ├── Index.jsx            # Landing page
│   │   │   ├── Login.jsx            # Authentication
│   │   │   ├── Dashboard.jsx        # User dashboard
│   │   │   ├── Practice.jsx         # Practice questions
│   │   │   ├── Interview.jsx        # AI interview chat
│   │   │   ├── Mock.jsx             # Mock interview
│   │   │   └── NotFound.jsx         # 404 page
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── lib/                     # Utility functions
│   │   ├── assets/                  # Images and static files
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # App entry point
│   │   └── index.css                # Global styles
│   ├── package.json                 # Dependencies and scripts
│   ├── tailwind.config.js           # Tailwind configuration
│   ├── vite.config.ts               # Vite configuration
│   └── eslint.config.js             # ESLint configuration
├── server/                          # Backend (future implementation)
└── README.md                        # Project documentation
```

## 🎨 Design System

### Color Palette
- **Primary**: Modern purple gradient (`hsl(262.1 83.3% 57.8%)`)
- **Secondary**: Neutral grays and whites
- **Success**: Green (`hsl(142.1 76.2% 36.3%)`)
- **Warning**: Orange (`hsl(32.2 95% 44.1%)`)
- **Error**: Red (`hsl(0 84.2% 60.2%)`)

### Typography
- **Headings**: Bold, modern sans-serif
- **Body**: Clean, readable font stack
- **Code**: Monospace for technical content

### Components
- **Cards**: Elevated with subtle shadows
- **Buttons**: Multiple variants (primary, secondary, outline, hero)
- **Forms**: Clean, accessible input fields
- **Navigation**: Sticky header with responsive mobile menu

## 📱 User Flow

### 1. **Landing Page** (`/`)
- Hero section with platform overview
- Feature highlights and benefits
- Call-to-action buttons (Login/Signup)

### 2. **Authentication** (`/login`, `/signup`)
- Email and password fields
- Role selection (User/Admin)
- Form validation and error handling

### 3. **Dashboard** (`/dashboard`)
- Welcome message with user info
- Domain and difficulty selection
- Quick action buttons for interviews
- Progress tracking and statistics

### 4. **Practice Mode** (`/practice`)
- Filterable question library
- Domain and difficulty filters
- Search functionality
- Card-based question display

### 5. **AI Interview** (`/interview`)
- Chat-style interface
- Real-time AI responses
- Progress tracking
- Session completion summary

### 6. **Mock Interview** (`/mock`)
- Single question display
- Text input for answers
- Timer functionality
- AI evaluation and scoring

## 🔧 Development

### Code Style
- **ESLint** configuration for code quality
- **Prettier** for consistent formatting
- **React Hooks** for state management
- **Functional components** with hooks

### Best Practices
- **Component composition** over inheritance
- **Custom hooks** for reusable logic
- **Proper error boundaries**
- **Accessibility-first design**
- **Mobile-responsive layouts**

### Performance Optimization
- **React.memo** for expensive components
- **useMemo** and **useCallback** for optimization
- **Lazy loading** for route-based code splitting
- **Image optimization** and compression

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure mobile responsiveness
- Test across different browsers

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build the project
npm run build

# Deploy to Netlify
# Upload the dist folder to Netlify
```

### Other Platforms
- **GitHub Pages**: Static hosting
- **Firebase Hosting**: Google's hosting solution
- **AWS S3**: Scalable cloud hosting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Development** - UI/UX, form pages, answer display
- **AI Integration** - ChatGPT/Gemini API integration and prompt engineering
- **Backend Development** - API development and database management
- **DevOps** - Deployment and infrastructure management

## 📞 Support

- **Email**: support@interviewmate.com
- **Issues**: [GitHub Issues](https://github.com/yourusername/interviewmate/issues)
- **Documentation**: [Wiki](https://github.com/yourusername/interviewmate/wiki)

---

<div align="center">

**Made with ❤️ by the InterviewMate Team**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/interviewmate?style=social)](https://github.com/yourusername/interviewmate)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/interviewmate?style=social)](https://github.com/yourusername/interviewmate)

</div> 