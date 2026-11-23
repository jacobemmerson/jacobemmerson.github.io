// Dark/Light mode themes
// The initial theme is applied by the inline script in <head> to avoid a flash on load.

const getTheme = () =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

const syncThemeColorMeta = () => {
  const background = getComputedStyle(document.documentElement)
    .getPropertyValue("--backgroundcolor")
    .trim();
  document.querySelector('meta[name="theme-color"]').setAttribute("content", background);
};

const toggleTheme = () => {
  const newTheme = getTheme() === "dark" ? "light" : "dark";
  document.documentElement.classList.toggle("dark", newTheme === "dark");
  localStorage.setItem("theme", newTheme);
  syncThemeColorMeta();
};

syncThemeColorMeta();

// profile picture flipping
// confetti on first flip

const pfp = document.querySelector('.profilepic-flip-container');

function getPFPOrigin() {
  const rect = pfp.getBoundingClientRect();

  // compute center in normalized coordinates (0–1)
  const x = (rect.left + rect.width / 2) / window.innerWidth;
  const y = (rect.top + rect.height / 2) / window.innerHeight;

  return { x, y };
}

let hasSeenConfetti = localStorage.getItem("seenConfetti") === "true";
function fireConfettiOnce() {
  if (!hasSeenConfetti) {
    setTimeout(function () {
      confetti({
      particleCount: 150,
      spread: 80,
      startVelocity: 50,
      origin: getPFPOrigin()
    })
    }, 450);
    localStorage.setItem("seenConfetti", "true");
    hasSeenConfetti = true;
  }
}

const flipper = document.querySelector('.profilepic-flipper');
function flipProfile() {
    flipper.classList.toggle('flipped');
    fireConfettiOnce()
}

document.querySelector('.profilepic-flip-container').addEventListener('dblclick', function(e) {
  e.preventDefault();
  flipProfile();
});

// support double-tap on mobile
let lastTap = 0;
document.querySelector('.profilepic-flip-container').addEventListener('touchend', function(e) {
    e.preventDefault();
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 500 && tapLength > 0) {
        flipProfile();
    }
    lastTap = currentTime;
});

// fade content in as it scrolls into view

const revealSelectors = [
  ".about .header",
  ".about .paper",
  ".about .row.text-center .mx-auto"
];

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  revealSelectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      // anything already on screen at load renders normally, so it can't flash in
      if (el.getBoundingClientRect().top < window.innerHeight) return;

      el.classList.add("reveal");
      revealObserver.observe(el);
    });
  });

  document.querySelectorAll(".about .row.text-center").forEach((row) => {
    row.querySelectorAll(".mx-auto.reveal").forEach((card, index) => {
      card.style.transitionDelay = `${index * 80}ms`;
    });
  });
}