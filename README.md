# Emoji Cipher

A modern web application built with React, TypeScript, and Tailwind CSS for encoding and decoding emoji-based cipher messages.

## Tech Stack

- **Frontend Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 3.4 with PostCSS
- **UI Components**: Radix UI + shadcn/ui components
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: React Router v6
- **State Management**: TanStack Query (React Query)
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Testing**: Vitest

## Getting Started

### Prerequisites
- Node.js 18+ (with npm or yarn)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally
- `npm run test` - Run tests once
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```
src/
├── components/     # Reusable React components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and helpers
├── pages/         # Page components
├── test/          # Test files
├── App.tsx        # Main App component
├── App.css        # App styles
├── main.tsx       # Entry point
└── index.css      # Global styles
```

## Features

- Emoji cipher encoding/decoding
- Modern, responsive UI with Tailwind CSS
- Form validation with Zod
- Dark mode support with next-themes
- Toast notifications with Sonner
- Accessible UI components from Radix UI

## Development

### Code Quality
- ESLint configuration for code linting
- TypeScript for type safety
- React Hooks for functional components

### Testing
Run tests with Vitest:
```bash
npm run test         # Run once
npm run test:watch   # Watch mode
```

## Browser Support

Works on all modern browsers supporting ES2020 and CSS Grid.


## Contributing

Feel free to submit issues and enhancement requests.
