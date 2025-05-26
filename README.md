# SunFire - Motorcycle Helmet Store

![SunFire Store](https://github.com/yourusername/StoreDashboard/assets/your-asset-id/main-screenshot.png)

SunFire is a modern e-commerce platform specializing in motorcycle helmets and accessories. Built using Next.js, TypeScript, and Tailwind CSS, it provides a comprehensive solution for helmet shopping, featuring an interactive UI, real-time updates, and secure authentication. The application is designed to deliver a seamless and delightful shopping experience for motorcycle enthusiasts.

## Table of Contents
- [Live Website](#live-website)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Live Website

The live website for SunFire can be accessed at:
[https://sunfire.vercel.app/](https://sunfire.vercel.app/)

## Features

- **Modern UI/UX**: Built with Tailwind CSS and Radix UI components for a beautiful, responsive design
- **Interactive Components**: 
  - Responsive carousels and sliders for product showcases
  - Interactive product filtering and sorting
  - Shopping cart functionality
  - Toast notifications for user feedback
- **State Management**: Efficient state management using Zustand
- **Form Handling**: Robust form validation using React Hook Form and Zod
- **API Integration**: Seamless API communication with Axios
- **Image Management**: Cloudinary integration for efficient product image handling
- **Payment Processing**: Secure payment processing with Stripe integration
- **Responsive Design**: Fully responsive layout that works across all devices
- **Type Safety**: Full TypeScript support for better development experience

## Technologies

### Frontend
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: 
  - Radix UI
  - Headless UI
  - Flowbite React
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod
- **API Client**: Axios
- **Image Processing**: Cloudinary
- **Payment**: Stripe
- **Icons**: React Icons, FontAwesome
- **Animations**: Tailwind CSS Animate

### Development Tools
- ESLint for code linting
- PostCSS for CSS processing
- TypeScript for type safety

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/StoreDashboard.git
```

2. Navigate to the frontend directory:
```bash
cd frontend
```

3. Install dependencies:
```bash
npm install
```

4. Create a `.env.local` file in the frontend directory and add your environment variables:
```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## Usage

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
frontend/
├── app/              # Next.js app directory
├── components/       # Reusable UI components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and configurations
├── providers/       # Context providers
├── public/          # Static assets
└── types.ts         # TypeScript type definitions
```

## Contributing

We welcome contributions to enhance SunFire! If you find any bugs or have ideas for improvements, feel free to:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and adhere to the existing code style.
