# Mahatee Ashramam Website

A modern, responsive website for Mahatee Ashramam nonprofit organization, built with Next.js and TypeScript.

## Features

- **Modern Design**: Clean, professional design with responsive layout
- **Complete Website**: Home, About, Programs, Get Involved, Gallery, Contact pages
- **Admin Dashboard**: Content management system for managing donations, volunteers, and content
- **Authentication**: Secure admin login system
- **Database Integration**: PostgreSQL database for storing data
- **Donation Integration**: Ready for payment gateway integration
- **SEO Optimized**: Meta tags and semantic HTML structure
- **Mobile Responsive**: Works perfectly on all devices

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mahati-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
mahati-website/
├── src/
│   ├── app/                 # Next.js 13+ app directory
│   │   ├── about/          # About Us page
│   │   ├── programs/       # Programs page
│   │   ├── get-involved/   # Get Involved page
│   │   ├── gallery/        # Gallery page
│   │   ├── contact/        # Contact page
│   │   ├── admin/          # Admin dashboard
│   │   └── layout.tsx      # Root layout
│   ├── components/         # Reusable components
│   │   ├── Navbar.tsx      # Navigation component
│   │   ├── Footer.tsx      # Footer component
│   │   ├── HeroSection.tsx # Hero section
│   │   └── ...             # Other components
│   ├── lib/               # Utility functions
│   └── types/             # TypeScript type definitions
├── public/                # Static assets
├── package.json
└── README.md
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The website can be deployed on:
- Netlify
- AWS Amplify
- Digital Ocean App Platform
- Any platform supporting Node.js applications

## Customization

### Colors and Branding

Edit the Tailwind CSS classes in components to match your brand colors:
- Primary color: Orange (`orange-500`)
- Secondary color: Blue (`blue-500`)

### Content Updates

All content can be updated by editing the respective page files in the `src/app/` directory.

### Adding New Pages

Create a new directory in `src/app/` with a `page.tsx` file.

## Admin Dashboard Features

- Content management
- Donation tracking
- Volunteer management
- Gallery image uploads
- User authentication
- Analytics dashboard

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is created for Mahatee Ashramam nonprofit organization.

## Support

For support or questions, please contact the development team.