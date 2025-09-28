# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a React Snake Game built with Vite, using Tailwind CSS for styling. The game is a complete implementation with start screen, pause functionality, game over state, and score tracking.

## Development Commands
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

## Architecture
The entire Snake Game is implemented as a single React component (`App.jsx`) with:
- Game state management using React hooks (useState, useEffect)
- Grid-based game board (20x20) rendered with CSS Grid
- Real-time game loop using setInterval
- Keyboard event handling for snake movement (arrow keys)
- Modal overlays for pause and game over states

### Key Game Logic
- **Snake Movement**: Controlled by direction state, moves every 200ms
- **Collision Detection**: Checks for wall collisions and self-collision
- **Food Generation**: Randomly placed food that avoids snake segments
- **Game States**: Start screen → Playing → Paused/Game Over → Restart

### Styling
- Uses Tailwind CSS utility classes throughout
- Dark theme (gray-900 background)
- Responsive grid layout for the game board
- Color coding: Snake (green-400), Food (red-500), Grid (gray-700)

## File Structure
- `src/App.jsx` - Main Snake Game component (contains all game logic)
- `src/main.jsx` - React app entry point
- `src/index.css` - Global styles and Tailwind imports
- `index.html` - HTML template

## Configuration Files
- `vite.config.js` - Vite bundler configuration
- `eslint.config.js` - ESLint rules with React hooks and refresh plugins
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration for Tailwind

## Development Notes
- No test framework is currently configured
- Game logic is entirely client-side with no backend dependencies
- Uses modern React patterns (functional components, hooks)
- ESLint configured with React-specific rules and unused variable ignoring for constants