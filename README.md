# Snake Game

A classic Snake game built with React and Vite, featuring smooth gameplay, score tracking, and modern UI styling with Tailwind CSS.

## Features

- **Classic Snake Gameplay**: Control the snake with arrow keys to eat food and grow
- **Score Tracking**: Keep track of your current and final scores
- **Game States**: Start screen, pause functionality, and game over modal
- **Responsive Design**: Clean, modern interface with dark theme
- **Smooth Controls**: Responsive keyboard controls with direction change validation

## How to Play

1. Click "Play" to start the game
2. Use arrow keys to control the snake:
   - ↑ Arrow Up: Move up
   - ↓ Arrow Down: Move down
   - ← Arrow Left: Move left
   - → Arrow Right: Move right
3. Eat the red food to grow and increase your score
4. Avoid hitting the walls or your own tail
5. Use "Pause" button to pause the game anytime
6. Click "Restart" to start over

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd snake-game
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

## Technology Stack

- **React 19** - UI framework with modern hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code quality and consistency

## Game Architecture

The game is built as a single React component with:

- **State Management**: Uses React hooks for game state (snake position, food, score, game status)
- **Game Loop**: Implements smooth movement with `setInterval` and `useEffect`
- **Collision Detection**: Checks for wall collisions and self-collision
- **Grid System**: 20x20 grid rendered with CSS Grid
- **Food Generation**: Random food placement avoiding snake segments

## Project Structure

```
src/
├── App.jsx          # Main game component with all game logic
├── main.jsx         # React app entry point
├── index.css        # Global styles and Tailwind imports
└── assets/          # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
