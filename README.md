# Amora AI - AI-Powered Wedding Planning Platform

Amora AI is a comprehensive wedding planning platform that leverages artificial intelligence to help couples plan their dream wedding. From venue selection to guest management, budget tracking, and timeline coordination - all in one intelligent platform.

## 🌟 Features

### Core Functionality
- **AI-Powered Wedding Planning**: Intelligent assistance for every aspect of wedding planning
- **Venue Selection**: Smart venue recommendations based on preferences and budget
- **Guest Management**: Comprehensive guest list management with RSVP tracking
- **Budget Tracking**: Detailed budget planning and expense monitoring
- **Timeline Coordination**: Automated timeline creation and task management
- **Vendor Management**: Connect with and manage wedding vendors

### User Experience
- **Responsive Design**: Fully responsive interface that works on all devices
- **Dark Mode Support**: Built-in dark mode toggle for better user experience
- **Intuitive Onboarding**: Step-by-step onboarding process for new users
- **Dashboard Analytics**: Visual insights into wedding planning progress

### Technical Features
- **Modern Tech Stack**: Built with Next.js 15, React 19, and TypeScript
- **Performance Optimized**: Uses Turbopack for fast development and builds
- **SEO Optimized**: Comprehensive SEO configuration with structured data
- **Analytics Integration**: Vercel Analytics and Speed Insights enabled
- **Form Validation**: Zod-based form validation with React Hook Form

## 🚀 Tech Stack

### Frontend
- **Next.js 15.5.4** - React framework for production
- **React 19.1.0** - Latest React version
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible component primitives
- **Framer Motion** - Animation library for smooth interactions

### State Management & Forms
- **React Hook Form** - Performant forms with built-in validation
- **Zod** - TypeScript-first schema validation
- **React Redux** - State management

### UI/UX
- **Lucide React** - Beautiful & consistent icon pack
- **Geist Font** - Modern, clean typography from Vercel
- **Embla Carousel** - Touch-friendly carousel component
- **Recharts** - Composable charting library

### Development & Deployment
- **Vercel** - Platform for deployment and analytics
- **Turbopack** - Fast bundler for development
- **PostCSS** - CSS processing and optimization

## 📁 Project Structure

```
amora_ai/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   ├── (dashboard)/              # Dashboard pages
│   ├── (onboarding)/             # User onboarding
│   ├── admin/                    # Admin panel
│   └── layout.tsx               # Root layout
├── components/                     # React components
│   ├── auth/                     # Authentication components
│   ├── dashboard/                # Dashboard components
│   ├── landing/                  # Landing page sections
│   ├── layout/                   # Layout components
│   └── ui/                       # Reusable UI components
├── lib/                          # Utilities and configurations
│   ├── constants/                # App constants
│   ├── types/                    # TypeScript types
│   └── utils/                    # Helper functions
├── public/                       # Static assets
│   ├── events/                   # Event-related images
│   ├── vendors/                  # Vendor category images
│   └── [other assets]
└── [config files]
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd amora_ai
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=/api
GOOGLE_SITE_VERIFICATION=your_google_verification_code
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server

## 🎯 Key Components

### Authentication System
- Multi-step authentication flow
- Social authentication support (Google, Facebook, Apple)
- Password reset functionality
- Email verification system

### Dashboard Features
- **Budget Management**: Track wedding expenses by category
- **Guest Management**: RSVP tracking and guest list organization
- **Vendor Directory**: Browse and connect with wedding vendors
- **Timeline Planner**: Visual timeline with task management
- **AI Assistant**: Intelligent recommendations and planning assistance

### Admin Panel
- User management
- Analytics dashboard
- Content management
- System monitoring

## 🔧 Configuration

### App Configuration
The application configuration is managed through `lib/constants/index.ts`:
- App metadata (name, description, version)
- API configuration
- Authentication settings
- Feature flags
- Route definitions

### Theme Configuration
- Dark mode support with next-themes
- Custom color scheme in `lib/design-tokens.ts`
- Responsive breakpoints configuration

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔒 Security Features

- Form validation with Zod schemas
- Secure authentication flow
- Input sanitization
- XSS protection
- CSRF protection (when deployed)

## 📈 Performance Optimizations

- **Turbopack**: Fast development builds
- **Image Optimization**: Next.js Image component for optimized loading
- **Code Splitting**: Automatic code splitting for better performance
- **Lazy Loading**: Components loaded on demand
- **Caching**: Strategic caching strategies

## 🌐 SEO & Analytics

- Comprehensive meta tags and structured data
- Open Graph and Twitter Card support
- Google Search Console verification
- Vercel Analytics integration
- Performance monitoring with Speed Insights

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@amoraai.com or join our Slack channel.

## 🌟 Acknowledgments

- Built with modern web technologies
- Inspired by the need for intelligent wedding planning solutions
- Thanks to all contributors and the open-source community

---

**Happy Wedding Planning!** 💍✨
