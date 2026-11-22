const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const menuLabel = menuToggle.querySelector(".menu-label");
const navigation = document.querySelector("#site-nav");
const mobileLayout = window.matchMedia("(max-width: 800px)");

function setMenu(open = false) {
  const isMobile = mobileLayout.matches;
  menuToggle.hidden = !isMobile;
  menuToggle.setAttribute("aria-expanded", String(open));
  menuLabel.textContent = open ? "Закрыть" : "Меню";
  navigation.hidden = isMobile && !open;
}

header.setAttribute("data-menu", "");
setMenu();
mobileLayout.addEventListener("change", () => {
  const focusWasInNavigation = navigation.contains(document.activeElement);
  const focusWasOnToggle = document.activeElement === menuToggle;
  setMenu();

  if (mobileLayout.matches && focusWasInNavigation) menuToggle.focus();
  if (!mobileLayout.matches && focusWasOnToggle) navigation.querySelector("a").focus();
});

menuToggle.addEventListener("click", () => {
  setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenu();
    menuToggle.focus();
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".menu-toggle, .site-nav")) setMenu();
});

const form = document.querySelector("#booking-form");
const service = form.elements.namedItem("service");
const name = form.elements.namedItem("name");
const contact = form.elements.namedItem("contact");
const status = document.querySelector("#form-status");
const serviceValues = new Set(Array.from(service.options, (option) => option.value).filter(Boolean));

function showFieldError(field, message) {
  const error = document.querySelector(`#${field.name}-error`);
  error.textContent = message;
  error.hidden = !message;

  if (message) {
    field.setAttribute("aria-invalid", "true");
  } else {
    field.removeAttribute("aria-invalid");
  }
}

function validateContact(value) {
  const email = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/u;
  const phone = /^\+?[\d\s().-]+$/u;
  const digitCount = value.replace(/\D/g, "").length;
  return email.test(value) || (phone.test(value) && digitCount >= 10 && digitCount <= 15);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const request = {
    service: service.value,
    name: name.value.trim(),
    contact: contact.value.trim(),
  };
  const errors = [
    [service, serviceValues.has(request.service) ? "" : "Выберите услугу."],
    [name, /^[\p{L}\p{M}][\p{L}\p{M} .’'-]*$/u.test(request.name) && /\p{L}/u.test(request.name)
      ? "" : "Введите имя буквами. Можно использовать пробел, дефис и апостроф."],
    [contact, validateContact(request.contact) ? "" : "Укажите email или номер телефона из 10–15 цифр."],
  ];

  for (const [field, message] of errors) showFieldError(field, message);

  const firstError = errors.find(([, message]) => message);
  if (firstError) {
    status.textContent = "Проверьте выделенные поля.";
    firstError[0].focus();
    return;
  }

  // Здесь можно передать проверенный объект request в обработчик реальных заявок.
  status.textContent = "Поля заполнены корректно. Это демонстрационная проверка, заявка не отправлена.";
});

for (const field of [service, name, contact]) {
  field.addEventListener(field === service ? "change" : "input", () => {
    showFieldError(field, "");
    status.textContent = "";
  });
}

document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

  const target = document.getElementById(link.hash.slice(1));
  if (!target) return;

  let focusTarget = target.matches("main") ? target : target.querySelector("h2[tabindex]");
  if (link.dataset.service) {
    service.value = link.dataset.service;
    service.dispatchEvent(new Event("change"));
    focusTarget = service;
  }

  setMenu();
  if (focusTarget) requestAnimationFrame(() => focusTarget.focus({ preventScroll: true }));
});

form.hidden = false;
