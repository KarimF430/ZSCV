# MotorOctane - Car Catalogue Website

A comprehensive car catalogue website for Indian new car buyers, built with Next.js and TailwindCSS. Inspired by CarWale but focused exclusively on new cars with mobile-first design.

## 🚗 Features

### Homepage
- **Hero Section** with car search functionality
- **Popular Brands** showcase with starting prices
- **Cars by Budget** categorized listings
- **Upcoming Cars** with expected launch dates and prices
- **Featured Offers & Deals** by city and model
- **Latest News & Reviews** with expert insights
- **Quick Actions** for EMI calculator, compare cars, etc.

### Car Listings
- **Advanced Filters**: Brand, price range, fuel type, body type, transmission, seating capacity
- **Sort Options**: Price, popularity, rating, fuel efficiency, launch date
- **Grid/List View** toggle for desktop users
- **Mobile-First Design** optimized for 95% mobile users

### Planned Features
- Car detail pages with variants, image galleries, specifications
- Compare cars tool (up to 4 models)
- Price breakup calculator (ex-showroom, RTO, insurance, etc.)
- EMI calculator with amortization table
- City-specific pages with local prices
- News/Reviews/Blog pages with SEO optimization
- Admin panel with role-based access

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

### Backend (Planned)
- **Node.js** with Express
- **PostgreSQL/MySQL** database
- **JWT** authentication
- **Local + S3** media storage

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd motoroctane-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Mobile-First Design

This project prioritizes mobile experience as 95% of users access the site via mobile devices:

- **Responsive Design**: All components are built mobile-first
- **Touch-Friendly**: Large tap targets and intuitive gestures
- **Performance Optimized**: Fast loading times on mobile networks
- **Progressive Enhancement**: Desktop features enhance mobile experience

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563eb) - Trust and reliability
- **Secondary**: Gray (#64748b) - Professional and clean
- **Success**: Green - Positive actions and offers
- **Warning**: Orange - Important information
- **Error**: Red - Alerts and urgent actions

### Typography
- **Font Family**: Inter - Clean, modern, and highly readable
- **Font Weights**: 300, 400, 500, 600, 700

### Components
- **Cards**: Consistent white background with subtle shadows
- **Buttons**: Primary (filled) and secondary (outlined) variants
- **Forms**: Clean inputs with focus states
- **Navigation**: Sticky header with mobile hamburger menu

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout with SEO meta tags
│   ├── page.tsx           # Homepage
│   └── new-cars/          # Car listings page
├── components/            # Reusable React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── home/             # Homepage components
│   └── cars/             # Car-related components
├── public/               # Static assets
├── tailwind.config.js    # TailwindCSS configuration
├── next.config.js        # Next.js configuration
└── package.json          # Dependencies and scripts
```

## 🔧 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React best practices and hooks patterns
- Use TailwindCSS utility classes for styling
- Implement proper error boundaries and loading states

### Performance
- Optimize images with Next.js Image component
- Use dynamic imports for code splitting
- Implement proper caching strategies
- Monitor Core Web Vitals

### SEO
- Server-side rendering with Next.js
- Proper meta tags and structured data
- Clean URLs and sitemap generation
- Mobile-friendly and fast loading

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_SITE_URL=https://motoroctane.com
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

## 📈 Roadmap

### Phase 1 (Current)
- ✅ Project setup and configuration
- ✅ Homepage with all sections
- ✅ Car listings with filters
- 🔄 Car detail pages
- 🔄 Compare cars functionality

### Phase 2
- EMI calculator
- Price breakup tool
- Offers and promotions pages
- News and reviews section

### Phase 3
- Backend API development
- Admin panel
- User authentication
- Advanced search and recommendations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Email: info@motoroctane.com
- Phone: +91 98765 43210

---

Built with ❤️ for Indian car buyers
