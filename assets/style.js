// The initial theme is applied by theme.js in <head> to avoid a flash on load.

const syncThemeColorMeta = () => {
  const background = getComputedStyle(document.documentElement)
    .getPropertyValue("--backgroundcolor")
    .trim();
  document.querySelector('meta[name="theme-color"]').setAttribute("content", background);
};

const toggleTheme = () => {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  syncThemeColorMeta();
};

document.querySelector(".theme-toggle").addEventListener("click", toggleTheme);
syncThemeColorMeta();

// Easter egg: double-click or double-tap the photo to flip it, with confetti the first time.

const photoContainer = document.querySelector(".profilepic-flip-container");
const photoFlipper = document.querySelector(".profilepic-flipper");

const getPhotoCenter = () => {
  const rect = photoContainer.getBoundingClientRect();
  return {
    x: (rect.left + rect.width / 2) / window.innerWidth,
    y: (rect.top + rect.height / 2) / window.innerHeight,
  };
};

const fireConfettiOnce = () => {
  if (localStorage.getItem("seenConfetti") === "true") return;
  localStorage.setItem("seenConfetti", "true");
  setTimeout(() => {
    confetti({
      particleCount: 150,
      spread: 80,
      startVelocity: 50,
      origin: getPhotoCenter(),
    });
  }, 450);
};

const flipPhoto = () => {
  photoFlipper.classList.toggle("flipped");
  fireConfettiOnce();
};

photoContainer.addEventListener("dblclick", (event) => {
  event.preventDefault();
  flipPhoto();
});

// Mobile browsers do not reliably fire dblclick, so double-taps are detected by hand.
const doubleTapWindowMilliseconds = 500;
let lastTapTime = 0;
photoContainer.addEventListener("touchend", (event) => {
  event.preventDefault();
  const now = Date.now();
  if (now - lastTapTime < doubleTapWindowMilliseconds) {
    flipPhoto();
  }
  lastTapTime = now;
});
