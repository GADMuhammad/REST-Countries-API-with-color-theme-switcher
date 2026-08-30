import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Container from "./Container";

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
      <header className="bg-white shadow-one dark:bg-darkBlue">
        <Container className="flex items-center justify-between gap-4 py-6 max-five:flex-col max-five:gap-3">
          {/* Brand doubles as a Home link: `to="/"` also clears any active
              `?q` / `?region` filters, giving one-click escape from a deep
              chain of border-country pages. */}
          <Link
            to="/"
            aria-label="Where in the world? — back to home"
            className="cursor-pointer rounded text-lg font-extrabold tracking-wide transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current sm:text-2xl"
          >
            Where in the world?
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            aria-pressed={darkMode}
            aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
            className="flex items-center gap-2 rounded px-2 py-1 text-sm font-semibold transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
          >
            <ion-icon
              name={darkMode ? "sunny-outline" : "moon-outline"}
              class="text-base"
            />
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </Container>
      </header>
      <Outlet />
    </>
  );
}
