
import React, { useState, useEffect, useCallback } from 'react';

const App: React.FC = () => {
  const [timeElapsed, setTimeElapsed] = useState<number>(0); // Time in milliseconds
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let intervalId: number | undefined;

    if (isRunning) {
      intervalId = window.setInterval(() => {
        setTimeElapsed(prevTime => prevTime + 10); // Update every 10ms for centiseconds
      }, 10);
    } else {
      if (intervalId !== undefined) {
        clearInterval(intervalId);
      }
    }

    return () => {
      if (intervalId !== undefined) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  const formatTime = useCallback((timeMs: number): string => {
    const totalCentiseconds = Math.floor(timeMs / 10);
    const centiseconds = totalCentiseconds % 100;
    const totalSeconds = Math.floor(totalCentiseconds / 100);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    const pad = (num: number) => num.toString().padStart(2, '0');

    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
    return `${pad(minutes)}:${pad(seconds)}:${pad(centiseconds)}`;
  }, []);

  const handleStart = useCallback(() => {
    setIsRunning(true);
  }, []);

  const handleStop = useCallback(() => {
    setIsRunning(false);
  }, []);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setTimeElapsed(0);
  }, []);

  const buttonBaseStyle = "font-semibold py-3 px-4 rounded-lg text-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-75 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none";

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-slate-100 p-4 selection:bg-sky-500 selection:text-white">
      <div className="bg-slate-800 p-6 sm:p-10 rounded-xl shadow-2xl w-full max-w-lg text-center border border-slate-700">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 sm:mb-10 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-500">
          Contador de Tiempo
        </h1>
        
        <div className="text-6xl sm:text-7xl lg:text-8xl font-mono mb-8 sm:mb-12 p-4 bg-slate-700/50 rounded-lg text-emerald-400 tracking-wider tabular-nums shadow-inner select-none">
          {formatTime(timeElapsed)}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 w-full">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className={`${buttonBaseStyle} bg-emerald-600 hover:bg-emerald-500 text-white focus:ring-emerald-400 disabled:bg-emerald-800 disabled:text-emerald-500`}
          >
            Iniciar
          </button>
          <button
            onClick={handleStop}
            disabled={!isRunning}
            className={`${buttonBaseStyle} bg-red-600 hover:bg-red-500 text-white focus:ring-red-400 disabled:bg-red-800 disabled:text-red-500`}
          >
            Parar
          </button>
          <button
            onClick={handleReset}
            disabled={timeElapsed === 0 && !isRunning}
            className={`${buttonBaseStyle} bg-amber-500 hover:bg-amber-400 text-slate-900 focus:ring-amber-300 disabled:bg-amber-700 disabled:text-amber-400`}
          >
            Reiniciar
          </button>
        </div>
        
        {timeElapsed > 0 && !isRunning && (
            <p className="mt-8 text-sm text-slate-400">
                Tiempo detenido. Presiona 'Iniciar' para reanudar o 'Reiniciar' para comenzar de nuevo.
            </p>
        )}
      </div>
      <footer className="mt-8 text-center text-sm text-slate-500">
        <p>Creado con React, TypeScript y Tailwind CSS.</p>
        <p>&copy; {new Date().getFullYear()} Contador App</p>
      </footer>
    </div>
  );
};

export default App;
