# Your Energy - Fitness Exercise Platform

## 📱 Project Overview

"Your Energy" is a modern web application for discovering and managing fitness
exercises. The app allows users to browse exercises by various filters (Muscles,
Body Parts, Equipment), add them to favorites, rate exercises, and subscribe to
receive fitness tips.

## 🚀 Features

### Main Functionality

- **Exercise Catalog**: Browse a comprehensive database of exercises with
  detailed information
- **Smart Filtering**: Filter exercises by Muscles, Body Parts, or Equipment
- **Search**: Find exercises by keyword
- **Favorites**: Save your favorite exercises to localStorage for easy access
- **Exercise Details**: View complete exercise information including images,
  descriptions, and ratings
- **Rating System**: Rate exercises and share your feedback
- **Daily Quote**: Inspirational fitness quote displayed daily
- **Newsletter Subscription**: Subscribe to receive fitness updates
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices

### Pages

1. **Home Page (index.html)**: Main landing page with hero section, exercise
   catalog, filters, and daily quote
2. **Favorites Page (page-2.html)**: Display saved favorite exercises with
   options to remove them
3. **Page 3 (page-3.html)**: Available for future expansion

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3 with Flexbox and CSS Grid
- **Build Tool**: Vite
- **Package Manager**: npm
- **API Integration**: RESTful API (Your Energy API)

## 📋 Prerequisites

- Node.js (LTS version)
- npm or yarn package manager

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd HW-Js-term-paper-Savchenko-Maksym
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔨 Build

To build the project for production:

```bash
npm run build
```

The optimized files will be in the `dist` directory.

## 📊 API Endpoints Used

### Quotes

- `GET https://your-energy.b.goit.study/api/quote`
- Fetches daily inspirational quote

### Filters

- `GET https://your-energy.b.goit.study/api/filters?filter=Muscles`
- `GET https://your-energy.b.goit.study/api/filters?filter=Body parts`
- `GET https://your-energy.b.goit.study/api/filters?filter=Equipment`

### Exercises

- `GET https://your-energy.b.goit.study/api/exercises?page=1&limit=12`
- `GET https://your-energy.b.goit.study/api/exercises/{exerciseId}`
- `PATCH https://your-energy.b.goit.study/api/exercises/{exerciseId}/rating`

### Subscription

- `POST https://your-energy.b.goit.study/api/subscription`

## 📁 Project Structure

```
src/
├── index.html          # Home page
├── page-2.html         # Favorites page
├── page-3.html         # Additional page
├── main.js             # Main application logic
├── css/
│   ├── styles.css      # Main CSS entry point
│   ├── header.css      # Header styles
│   ├── main.css        # Main content styles
│   ├── footer.css      # Footer styles
│   ├── base.css        # Base styles
│   ├── container.css   # Container styles
│   ├── animations.css  # Animation definitions
│   └── reset.css       # CSS reset
├── partials/
│   ├── header.html     # Header component
│   ├── footer.html     # Footer component
│   └── other.html      # Other components
└── img/
    └── ... (images and icons)
```

## 🎨 Responsive Design

The application is fully responsive with three breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1279px
- **Desktop**: ≥ 1280px

## 🔐 Features Details

### Favorites Management

- Exercises are stored in browser's localStorage
- Persist across browser sessions
- Quick add/remove functionality with heart icon

### Rating System

- 5-star rating system
- Email validation (regex pattern: `^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$`)
- PATCH request to save ratings

### Quote Caching

- Daily quote is fetched once per day
- Stored in localStorage with date
- Prevents unnecessary API calls

### Search & Pagination

- Server-side pagination (page and limit parameters)
- Real-time search functionality
- Smooth page transitions

## 🌐 Deployment

The project is deployed on GitHub Pages. To deploy:

1. Update the `--base` flag in `package.json` build script with your repository
   name
2. Ensure GitHub Pages is configured in repository settings
3. Push changes to `main` branch - deployment happens automatically

**Live URL**: https://github.com/yourusername/HW-Js-term-paper-Savchenko-Maksym/

## ♿ Accessibility

- Semantic HTML5 markup
- ARIA labels for icons and interactive elements
- Keyboard navigation support
- Proper heading hierarchy
- Color contrast compliance

## 🧹 Code Quality

- No console errors or warnings
- Clean, commented code
- Consistent naming conventions:
  - Variables: camelCase
  - Classes: PascalCase
  - Constants: UPPER_SNAKE_CASE
- Removed all `console.log()` statements
- Code validated through W3C validators

## 📈 Performance

- PageSpeed Insights score: 90+ (Target)
- Optimized images
- Efficient API calls
- Minimal bundle size
- CSS animations using transforms

## 🐛 Testing

To test the application:

1. Test all filters
2. Search for exercises
3. Add/remove favorites
4. Rate an exercise
5. Subscribe to newsletter
6. Check responsive design on different screen sizes
7. Verify localStorage persistence

## 🔗 External Resources

- [Your Energy API Documentation](https://your-energy.b.goit.study/api-docs/)
- [Figma Design](https://www.figma.com/file/1ifqGcQBIzMoc21yIqyV5q/Your-energy)
- [Vite Documentation](https://vitejs.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)

## 📝 License

ISC License - See LICENSE file for details

## 👤 Author

**Maksym Savchenko**

---

**Last Updated**: January 2025

For issues or questions, please contact the author or open an issue in the
repository.
