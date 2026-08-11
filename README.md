<div align="center">
  <h1>BlubugTech Landing Page</h1>
  <p>The public-facing showcase for BlubugTech's portfolio and technical expertise.</p>
</div>

## 🚀 Overview

The BlubugTech Landing Page is a lightning-fast, SEO-optimized web experience built with **Next.js**. It beautifully presents featured portfolio projects and provides a seamless way for visitors to get in touch.

## 🔌 API Integration Status

The landing page dynamically fetches data from the Micronaut backend:

- ✅ **Contact Form**: Submits inquiries directly to the backend (`/api/contact`).
- ✅ **Projects**: Fetches and displays featured portfolio projects (`/api/projects/recent`).
- 🚧 **Technical Guides**: *Pending UI Implementation* (`/api/guides/recent`).
- 🚧 **Dynamic Configuration**: *Pending UI Implementation* (`/api/site-config`).

## 🛠 Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS & Framer Motion
- **API Client**: Axios

## 🏃‍♂️ Getting Started

Ensure you have your environment variables defined (e.g. `NEXT_PUBLIC_API_URL`).

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
