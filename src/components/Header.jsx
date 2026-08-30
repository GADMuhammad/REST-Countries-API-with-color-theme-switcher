import { useState } from "react";
import { Outlet } from "react-router-dom";

function getInitialDarkMode() {
  try {
    return !!JSON.parse(localStorage.getItem("darkModeCase"));
  } catch {
    return false;
  }
}

export default function Header() {
  // The `dark` class is already applied (or not) by the inline script in
  // index.html before first paint, so we only mirror that state here.
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      try {
        localStorage.setItem("darkModeCase", JSON.stringify(next));
      } catch {
        // Storage unavailable – the toggle still works for this session.
      }
      return next;
    });
  };

  return (
    <>
      <header className="border-b-solid flex justify-between gap-4 border-b border-b-veryDarkBlueText px-14 py-8 shadow-one dark:border-b-veryLightGray max-five:flex-col">
        <p className="text-2xl font-semibold max-five:mx-auto">
          Where in the world?
        </p>
        <button
          type="button"
          onClick={toggleTheme}
          aria-pressed={darkMode}
          aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
          className="flex items-center justify-center gap-2 border border-solid border-veryDarkBlueText px-2 py-1 tracking-wide dark:border-veryLightGray"
        >
          <ion-icon name={darkMode ? "sunny" : "moon-outline"} />
          {darkMode ? "Light" : "Dark"} Mode
        </button>
      </header>
      <Outlet />
    </>
  );
}
