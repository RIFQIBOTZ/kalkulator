# Vercel Speed Insights Setup

This project has been configured with Vercel Speed Insights to monitor performance metrics and help optimize the trading calculator's performance.

## What is Speed Insights?

Vercel Speed Insights is a performance monitoring solution that provides real-world performance metrics for your website visitors. It tracks Core Web Vitals and other important metrics without impacting your site's performance.

## How it's Set Up

### 1. **Package Configuration** (`package.json`)
   - Added `@vercel/speed-insights` as a dependency
   - This enables proper package management for the project

### 2. **HTML Integration** (`index.html`)
   - Speed Insights tracking script is included in the `<body>` closing tag
   - The script initializes with: `window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };`
   - The tracking script loads from: `/_vercel/speed-insights/script.js`

### 3. **Vercel Configuration** (`vercel.json`)
   - Configured the output directory to serve static files
   - Build command is set appropriately for a static site

## Metrics Tracked

Speed Insights automatically tracks:
- **Core Web Vitals**: LCP (Largest Contentful Paint), FID (First Input Delay), CLS (Cumulative Layout Shift)
- **Page Load Time**: Time to load the full page
- **Resource Timing**: How long assets take to load
- **Navigation Timing**: Browser performance metrics

## Viewing Your Data

1. **Enable Speed Insights on Vercel Dashboard**
   - Go to https://vercel.com/dashboard
   - Select your project
   - Click the **Speed Insights** tab
   - Click **Enable**

2. **Deploy Your Project**
   - Run: `vercel deploy` or push to your connected git repository
   - Once deployed, Speed Insights routes will be available at `/_vercel/speed-insights/*`

3. **Monitor Your Metrics**
   - After a few days with visitor traffic, your data will appear in the dashboard
   - Analyze performance trends and identify optimization opportunities

## For Local Development

When running locally:
- The Speed Insights script will attempt to reach `/_vercel/speed-insights/script.js`
- This won't cause errors - it simply won't collect data locally
- Data collection only happens on Vercel deployments

## Privacy & Data

Vercel Speed Insights:
- Does not collect personally identifiable information (PII)
- Follows privacy and data compliance standards
- Only stores essential performance metrics
- See: https://vercel.com/docs/speed-insights/privacy-policy

## Next Steps

1. Install dependencies: `npm install` (or pnpm/yarn/bun)
2. Test locally: `npm run dev`
3. Deploy to Vercel: `vercel deploy`
4. Monitor performance in your Vercel dashboard

## Resources

- [Vercel Speed Insights Documentation](https://vercel.com/docs/speed-insights)
- [Using Speed Insights](https://vercel.com/docs/speed-insights/using-speed-insights)
- [Metrics Guide](https://vercel.com/docs/speed-insights/metrics)
- [Troubleshooting](https://vercel.com/docs/speed-insights/troubleshooting)
