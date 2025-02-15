import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function Header() {
  const [darkModeCase, setDarkModeCase] = useState(
    !!JSON.parse(localStorage.getItem("darkModeCase")),
  );

  useEffect(() => {
    darkModeCase && document.documentElement.classList.add("dark");
  }, [darkModeCase]);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDarkModeCase((prev) => !prev);
    localStorage.setItem("darkModeCase", !darkModeCase);
  };

  return (
    <>
      <header className="border-b-solid flex justify-between border-b border-b-veryDarkBlueText px-14 py-8 shadow-one dark:border-b-veryLightGray">
        <p className="text-2xl font-semibold">Where in the world?</p>
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center gap-2 border border-solid border-veryDarkBlueText px-2 py-1 tracking-wide dark:border-veryLightGray"
        >
          <ion-icon name={darkModeCase ? "moon-outline" : "moon"} />
          Open {darkModeCase ? "Light" : "Dark"} Mood
        </button>
      </header>
      <Outlet />
    </>
  );
}
