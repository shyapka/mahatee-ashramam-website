# 🎨 Mahatee Ashramam Logo Setup Guide

## 📁 Where to Place Your Logo File

**Important**: Please place your logo file in the following location:

```
/public/images/logo/mahatee-logo.png
```

## 📍 Logo Placements Added

### ✅ **1. Navbar (Top Priority)**
- **Location**: Top-left corner, every page
- **Size**: 48px height (h-12)
- **Clickable**: Yes, returns to homepage
- **Fallback**: Text only if logo fails

### ✅ **2. Hero Section (Homepage)**
- **Location**: Above main title "Every Child Deserves..."
- **Size**: 64px height (h-16) 
- **Style**: White background box with shadow
- **Fallback**: Heart emoji if logo fails

### ✅ **3. Footer (Every Page)**
- **Location**: Bottom left, alongside heart icon and text
- **Size**: 40px height (h-10)
- **Style**: Simple placement with existing elements

### ✅ **4. About Page**
- **Location**: Above "About Mahatee Ashramam" title
- **Size**: 64px height (h-16)
- **Style**: Centered with margin

### ✅ **5. Admin Dashboard**
- **Location**: Sidebar header alongside "Mahatee Admin"
- **Size**: 32px height (h-8)
- **Style**: White logo on orange background

## 🔧 Technical Details

- **Expected Format**: PNG with transparent background
- **Recommended Sizes**: 
  - Minimum: 200x200px
  - Optimal: 512x512px or higher
- **File Type**: PNG preferred (also supports JPG, SVG)
- **File Name**: Must be exactly `mahatee-logo.png`

## 🚀 Next Steps

1. **Place your logo file** at: `/public/images/logo/mahatee-logo.png`
2. **Refresh the website** at http://localhost:3000
3. **Check all pages** to see the logo in action:
   - Homepage (navbar + hero)
   - About page
   - Footer on any page
   - Admin dashboard at `/admin`

## ⚠️ Important Notes

- The logo will gracefully fallback to text/icons if the file is missing
- All placements are responsive and work on mobile devices
- The navbar logo is clickable and returns users to the homepage
- If you want to change the logo filename or size, let me know!

## 🎯 Additional Logo Opportunities

If you want to add logos to more places, consider:
- Contact page header
- Email templates (future)
- Social media profiles
- Donation confirmation pages
- Print materials

Let me know if you need any adjustments to size, placement, or styling!
