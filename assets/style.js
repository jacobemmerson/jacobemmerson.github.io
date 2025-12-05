//--------------------------------------------------
// SMOOTH THEME SYSTEM (ALL JAVASCRIPT)
//--------------------------------------------------

// Theme definitions
const themes = {
  light: {
    "--basecolor": "#777",
    "--accentcolor": "#007",
    "--highlightcolor": "#111",
    "--backgroundcolor": "#FFFAF0"
  },
  dark: {
    "--basecolor": "#c9c9c9ff",
    "--accentcolor": "rgba(161, 205, 255, 1)",
    "--highlightcolor": "rgba(255, 255, 255, 1)",
    "--backgroundcolor": "#3b3935ff"
  },
};

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

// Detect system preference
const systemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

// Get saved theme or default
const getTheme = () => localStorage.getItem("theme") || systemTheme();

// Apply theme variables
const setTheme = (t) => {
  localStorage.setItem("theme", t);

  // Toggle dark class
  document.documentElement.classList.toggle("dark", t === "dark");

  // Apply root CSS variables
  for (const k in themes[t]) {
    document.documentElement.style.setProperty(k, themes[t][k]);
  }

  updateIconColor(t); 
};

// Initialize theme
setTheme(getTheme());

// Theme toggle
const toggleTheme = () => {
  const newTheme = getTheme() === "dark" ? "light" : "dark";
  setTheme(newTheme);
};

//--------------------------------------------------
// GLOBAL SMOOTH TRANSITIONS (APPLIED ONCE)
//--------------------------------------------------

// Add smooth transitions to ANY element that uses your CSS variables
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
      "background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease";
  });
});

// ————————————————————————————————
// PROFILE PICTURE FLIPPING (double click)
// ————————————————————————————————

const flipper = document.querySelector('.profilepic-flipper');

function flipProfile() {
    flipper.classList.toggle('flipped');
}

// Also support double-tap on mobile
let lastTap = 0;
document.querySelector('.profilepic-flip-container').addEventListener('touchend', function(e) {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 500 && tapLength > 0) {
        flipProfile();
        e.preventDefault();
    }
    lastTap = currentTime;
});

//--------------------------------------------------
// STYLING (ALL JS, NO CSS NEEDED)
//--------------------------------------------------

const fontname = "Garamond";
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

// Load Google Fonts
$("head").append(
  `<link href="https://fonts.googleapis.com/css2?family=${fontname}:wght@${fontweights.join(
    ";"
  )}&display=swap" rel="stylesheet" type="text/css">`
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

$(".years").css("color", "var(--accentcolor)").css("font-size", instyearsize);