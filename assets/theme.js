// Loaded synchronously in <head>, before first paint, so the saved or system theme never flashes the wrong colors.
{
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = savedTheme || (prefersDark ? "dark" : "light");
  document.documentElement.classList.toggle("dark", theme === "dark");
}
