import { useEffect, useState, useCallback } from "react";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 8, y: 8 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(randomFood(INITIAL_SNAKE));
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showStartScreen, setShowStartScreen] = useState(true);

  useEffect(() => {
    const handleKey = (e) => {
      if (isPaused || !isPlaying) return;
      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [direction, isPaused, isPlaying]);

  const moveSnake = useCallback(() => {
    const newSnake = [...snake];
    const head = {
      x: newSnake[0].x + direction.x,
      y: newSnake[0].y + direction.y,
    };

    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= GRID_SIZE ||
      head.y >= GRID_SIZE ||
      newSnake.some((seg) => seg.x === head.x && seg.y === head.y)
    ) {
      setGameOver(true);
      setIsPlaying(false);
      return;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setFood(randomFood(newSnake));
      setScore((prev) => prev + 1);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food, setFood, setScore, setGameOver, setIsPlaying]);

  useEffect(() => {
    if (gameOver || !isPlaying || isPaused) return;
    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [moveSnake, gameOver, isPlaying, isPaused]);

  function resetGame() {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(randomFood(INITIAL_SNAKE));
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
    setIsPlaying(false);
    setShowStartScreen(true);
  }

  function startGame() {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(randomFood(INITIAL_SNAKE));
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
    setIsPlaying(true);
    setShowStartScreen(false);
  }

  function pauseGame() {
    setIsPaused(true);
  }

  function resumeGame() {
    setIsPaused(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white relative">
      <h1 className="text-3xl font-bold mb-4">Snake Game</h1>

      {/* Start Screen */}
      {showStartScreen && !isPlaying && !gameOver && (
        <div className="text-center">
          <button
            onClick={startGame}
            className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 text-xl cursor-pointer"
          >
            Play
          </button>
        </div>
      )}

      {/* Game Screen */}
      {isPlaying && !isPaused && !gameOver && (
        <>
          <p className="mb-2">Score: {score}</p>
          <button
            onClick={pauseGame}
            className="px-4 py-2 mb-4 bg-yellow-600 rounded hover:bg-yellow-700 cursor-pointer"
          >
            Pause
          </button>
          <div
            className="grid bg-gray-800"
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, 20px)`,
              gridTemplateRows: `repeat(${GRID_SIZE}, 20px)`,
              gap: "1px",
            }}
          >
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
              const x = i % GRID_SIZE;
              const y = Math.floor(i / GRID_SIZE);
              const isSnake = snake.some((seg) => seg.x === x && seg.y === y);
              const isFood = food.x === x && food.y === y;

              let cellClassName;
              if (isSnake) {
                cellClassName = "bg-green-400";
              } else if (isFood) {
                cellClassName = "bg-red-500";
              } else {
                cellClassName = "bg-gray-700";
              }

              return (
                <div
                  key={`${x}-${y}`}
                  className={`w-5 h-5 ${cellClassName}`}
                ></div>
              );
            })}
          </div>
        </>
      )}

      {/* Pause Screen */}
      {isPaused && !gameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg text-center">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Paused</h2>
            <button
              onClick={resumeGame}
              className="px-4 py-2 mr-2 bg-blue-600 rounded hover:bg-blue-700 cursor-pointer"
            >
              Resume
            </button>
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 cursor-pointer"
            >
              Restart
            </button>
          </div>
        </div>
      )}

      {/* Game Over Modal */}
      {gameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Game Over!</h2>
            <p className="mb-4">Final Score: {score}</p>
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 cursor-pointer"
            >
              Restart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function randomFood(snake) {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some((seg) => seg.x === newFood.x && seg.y === newFood.y));
  return newFood;
}
