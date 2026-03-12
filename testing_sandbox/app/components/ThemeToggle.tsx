'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { IoMoon, IoSunny } from 'react-icons/io5';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!mounted) {
    return (
      <button className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 opacity-50 cursor-not-allowed">
        <IoSunny className="text-xl" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <IoMoon className="text-xl text-yellow-400" />
      ) : (
        <IoSunny className="text-xl text-orange-500" />
      )}
    </button>
  );
}
