const currentYearElement = document.getElementById("current-year");
const lastUpdatedElement = document.getElementById("last-updated");

if (currentYearElement) {
  currentYearElement.textContent = String(new Date().getFullYear());
}

if (lastUpdatedElement) {
  const lastModified = new Date(document.lastModified);

  lastUpdatedElement.dateTime = lastModified.toISOString();
  lastUpdatedElement.textContent = lastModified.toLocaleString("en-GB");
}

const themeButtons = document.querySelectorAll("[data-theme-choice]");
const savedTheme = localStorage.getItem("theme");

function setTheme(theme) {
  document.body.dataset.theme = theme === "lime" ? "" : theme;
  themeButtons.forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.themeChoice === theme),
    );
  });
  localStorage.setItem("theme", theme);
}

setTheme(savedTheme === "amber" || savedTheme === "ice" ? savedTheme : "lime");
themeButtons.forEach((button) => {
  button.addEventListener("click", () => setTheme(button.dataset.themeChoice));
});

const typeTargets = document.querySelectorAll("[data-type]");
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const domainLink = document.getElementById("header-url");

function scheduleDomainFlicker() {
  if (!domainLink || reduceMotion) return;

  const delay = 1800 + Math.random() * 5000;
  window.setTimeout(() => {
    domainLink.classList.add("is-flickering");
    window.setTimeout(
      () => {
        domainLink.classList.remove("is-flickering");
        scheduleDomainFlicker();
      },
      45 + Math.random() * 130,
    );
  }, delay);
}

scheduleDomainFlicker();

function typeText(element) {
  const text = element.dataset.typeText;
  let position = 0;
  element.classList.add("is-typing");

  function typeNextCharacter() {
    position += 1;
    element.textContent = text.slice(0, position);
    if (position === text.length) {
      element.classList.remove("is-typing");
      return;
    }

    const lastCharacter = text[position - 1];
    const pauseForPunctuation = /[,.!?:]/.test(lastCharacter) ? 100 : 0;
    const randomSpeed = 14 + Math.random() * 42;
    window.setTimeout(typeNextCharacter, randomSpeed + pauseForPunctuation);
  }

  window.setTimeout(typeNextCharacter, 120 + Math.random() * 500);
}

if (reduceMotion || !("IntersectionObserver" in window)) {
  typeTargets.forEach((element) => {
    element.dataset.typeText = element.textContent.trim();
  });
} else {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        typeText(element);
        currentObserver.unobserve(element);
      });
    },
    { threshold: 0.4 },
  );

  typeTargets.forEach((element) => {
    element.dataset.typeText = element.textContent.trim();
    element.textContent = "";
    observer.observe(element);
  });
}
