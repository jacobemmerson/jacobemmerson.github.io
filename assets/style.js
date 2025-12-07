
// Dark/Light mode themes 

const themes = {
  light: {
    "--basecolor": "#616161ff",
    "--accentcolor": "rgba(24, 24, 111, 1)",
    "--highlightcolor": "#111111ff",
    "--backgroundcolor": "#FFFAF0"
  },
  dark: {
    "--basecolor": "#c9c9c9ff",
    "--accentcolor": "rgba(135, 179, 230, 1)",
    "--highlightcolor": "rgba(255, 255, 255, 1)",
    "--backgroundcolor": "#3b3935ff"
  },
};

// Invert icon (default black) for dark mode
const updateIconColor = (theme) => {
  const icons = document.querySelectorAll(".theme-icon");

  icons.forEach((el) => {
    if (theme === "dark") {
      // make the icon light
      el.style.filter = "invert(1) brightness(0.75)";
    } else {
      // normal icon
      el.style.filter = "brightness(0.75)";
    }
  });
};

// detect system preference
const systemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

// get saved theme or default
const getTheme = () => localStorage.getItem("theme") || systemTheme();

// apply theme
const setTheme = (t) => {
  localStorage.setItem("theme", t);

  // toogle dark
  document.documentElement.classList.toggle("dark", t === "dark");

  // Apply root CSS variables
  for (const k in themes[t]) {
    document.documentElement.style.setProperty(k, themes[t][k]);
  }

  updateIconColor(t); 
};

// initialize theme
setTheme(getTheme());

// Theme toggle
const toggleTheme = () => {
  const newTheme = getTheme() === "dark" ? "light" : "dark";
  setTheme(newTheme);
};

// smooth transitions 
const elementsToSmooth = [
  "html",
  "body",
  "a",
  ".header",
  ".name",
  ".menulink",
  ".papertitle",
  ".thisauthor",
  ".institution",
  ".years",
  "input"
];

elementsToSmooth.forEach((sel) => {
  document.querySelectorAll(sel).forEach((el) => {
    el.style.transition =
      "background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease";
  });
});

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

// default styling from main branch

const fontname = "Georgia";
const fontweights = [300, 400];

const bodyfontweight = 300;
const bodyfontsize = "12pt";
const adecoration = "underline dotted";
const menudecoration = "none";
const headerfontsize = "18pt";
const headerdecoration = "none";
const namefontsize = "23pt";
const namepadding = "0px";

const ptitlefontsize = bodyfontsize;
const ptitleweight = bodyfontweight;
const ptitledecoration = "none";
const ptitlestyle = "normal";

const selfweight = bodyfontweight;
const selfdecoration = "none";
const selfstyle = "normal";

const insttitlesize = "12px";
const instyearsize = "11px";

// load Google Fonts
$("head").append(
'<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap" rel="stylesheet">'
);

$("body")
  .css("font-family", fontname)
  .css("font-weight", bodyfontweight)
  .css("font-size", bodyfontsize)
  .css("color", "var(--basecolor)")
  .css("background-color", "var(--backgroundcolor)");

$("a").css("color", "var(--accentcolor)").css("text-decoration", adecoration);

$(".menulink")
  .css("color", "var(--basecolor)")
  .css("font-size", "15pt")
  .css("text-decoration", menudecoration);

$(".header")
  .css("color", "var(--accentcolor)")
  .css("font-size", headerfontsize)
  .css("text-decoration", headerdecoration);

$(".name")
  .css("color", "var(--highlightcolor)")
  .css("font-size", namefontsize)
  .css("padding-bottom", namepadding)
  .css("margin-bottom", namepadding);

$(".papertitle")
  .css("color", "var(--accentcolor)")
  .css("font-size", ptitlefontsize)
  .css("font-weight", ptitleweight)
  .css("text-decoration", ptitledecoration)
  .css("font-style", ptitlestyle);

$(".thisauthor")
  .css("color", "var(--highlightcolor)")
  .css("font-weight", selfweight)
  .css("text-decoration", selfdecoration)
  .css("font-style", selfstyle);

$(".institution")
  .css("color", "var(--highlightcolor)")
  .css("font-size", insttitlesize);

$(".credits")
  .css("color", "var(--basecolor)")
  .css("text-decoration", "None")
  .css("opacity", 0.75)
  .css("font-size", insttitlesize);

$(".years").css("color", "var(--accentcolor)").css("font-size", instyearsize);