# Supabase Setup Guide for Mahatee Ashramam Website

## Quick Setup (5 minutes)

### 1. Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Sign up with your GitHub account (recommended)
3. Create a new project
4. Choose a database password (save it somewhere safe)

### 2. Get Your Credentials
After project is created:
1. Go to Settings → API
2. Copy the **Project URL**
3. Copy the **anon public** key

### 3. Set Environment Variables
Create `.env.local` file in your project root:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
JWT_SECRET=your-secret-key-change-this-in-production
```

### 4. Create Database Tables
1. In your Supabase dashboard, go to SQL Editor
2. Copy and paste the entire content of `supabase-schema.sql`
3. Click "Run" to create tables

### 5. Deploy
Push your code to GitHub - Netlify will automatically deploy with the new environment variables.

## That's it! 

Your donation tracking will now work perfectly:
- ✅ Donations save to Supabase database
- ✅ Admin dashboard shows real data
- ✅ Works on all platforms (Netlify, Vercel, etc.)
- ✅ Free tier: 500MB database, unlimited API calls

## Admin Access
- Username: `admin`
- Password: `admin123`
- URL: `/admin`

You can change the admin password later through the admin interface.

## Troubleshooting
If you get environment variable errors:
1. Double-check your `.env.local` file
2. Restart your development server
3. Make sure environment variables are set in Netlify dashboard

Need help? The setup is very straightforward - just follow the steps above!