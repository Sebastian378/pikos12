const screens = {
  login: document.querySelector("#screen-login"),
  check: document.querySelector("#screen-check"),
  prize: document.querySelector("#screen-prize")
};

const stepDots = [...document.querySelectorAll(".step-dot")];
const stepLabel = document.querySelector("#step-number");
const loginForm = document.querySelector("#login-form");
const loginMessage = document.querySelector("#login-message");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const passwordToggle = document.querySelector(".password-toggle");
const identityCheckbox = document.querySelector("#identity-confirm");
const verifyButton = document.querySelector("#verify-button");
const whatsappButton = document.querySelector("#whatsapp-button");
const confettiLayer = document.querySelector("#confetti-layer");

const whatsappNumber = "573046580213";
const whatsappMessage = "Hola, vengo a hacer efectivo mi cupón de besos 💋";

function showScreen(name) {
  Object.entries(screens).forEach(([screenName, screen]) => {
    const isActive = screenName === name;
    screen.hidden = !isActive;
    screen.classList.toggle("screen--active", isActive);
  });

  const activeIndex = Object.keys(screens).indexOf(name);
  stepDots.forEach((dot, index) => {
    dot.classList.toggle("is-current", index === activeIndex);
    dot.classList.toggle("is-done", index < activeIndex);
  });
  stepLabel.textContent = String(activeIndex + 1).padStart(2, "0");
  document.querySelector(".step-indicator").setAttribute("aria-label", `Paso ${activeIndex + 1} de 3`);
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = usernameInput.value.toLocaleLowerCase();
  const password = passwordInput.value.toLocaleLowerCase();

  if (username === "farruko" && password === "kiramarcela") {
    loginMessage.textContent = "";
    showScreen("check");
    identityCheckbox.focus();
    return;
  }

  loginMessage.textContent = "Credenciales incorrectas. Intente de nuevo, sospechosa...";
  passwordInput.value = "";
  passwordInput.focus();
});

passwordToggle.addEventListener("click", () => {
  const shouldShow = passwordInput.type === "password";
  passwordInput.type = shouldShow ? "text" : "password";
  passwordToggle.textContent = shouldShow ? "OCULTAR" : "VER";
  passwordToggle.setAttribute("aria-label", shouldShow ? "Ocultar contraseña" : "Mostrar contraseña");
  passwordToggle.setAttribute("aria-pressed", String(shouldShow));
});

identityCheckbox.addEventListener("change", () => {
  verifyButton.disabled = !identityCheckbox.checked;
});

document.querySelector("#back-to-login").addEventListener("click", () => {
  showScreen("login");
  usernameInput.focus();
});

verifyButton.addEventListener("click", () => {
  if (!identityCheckbox.checked) return;

  whatsappButton.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  showScreen("prize");
  launchConfetti();
  document.querySelector("#restart-button").focus();
});

document.querySelector("#restart-button").addEventListener("click", () => {
  loginForm.reset();
  identityCheckbox.checked = false;
  verifyButton.disabled = true;
  loginMessage.textContent = "";
  showScreen("login");
  usernameInput.focus();
});

function launchConfetti() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const colors = ["#bb8aff", "#ff83c7", "#ffd16f", "#69e0ae", "#f8f4ff"];
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < 72; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = colors[index % colors.length];
    piece.style.setProperty("--duration", `${2.1 + Math.random() * 2.1}s`);
    piece.style.setProperty("--delay", `${Math.random() * 0.7}s`);
    piece.style.setProperty("--drift", `${Math.random() * 180 - 90}px`);
    piece.style.setProperty("--spin", `${Math.random() * 800 - 400}deg`);
    fragment.append(piece);
  }

  confettiLayer.replaceChildren(fragment);
  window.setTimeout(() => confettiLayer.replaceChildren(), 5000);
}
