// scripts/project.js
document.addEventListener("DOMContentLoaded", () => {
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  /* ---------- NAV / HAMBURGER ---------- */
  const menuToggle = $("#menu-toggle");
  const navMenu = $("#nav-menu");
  const menuIcon = menuToggle ? menuToggle.querySelector("i") : null;

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const opened = navMenu.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", opened ? "true" : "false");

      if (menuIcon) {
        menuIcon.classList.toggle("fa-bars");
        menuIcon.classList.toggle("fa-times");
      }
    });

    // Close menu when clicking outside
    document.addEventListener("click", e => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        if (menuIcon) {
          menuIcon.classList.remove("fa-times");
          menuIcon.classList.add("fa-bars");
        }
      }
    });

    // Close when a nav link is clicked
    navMenu.addEventListener("click", e => {
      const link = e.target.closest("a");
      if (link && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        if (menuIcon) {
          menuIcon.classList.remove("fa-times");
          menuIcon.classList.add("fa-bars");
        }
      }
    });
  }

  /* ---------- THEME TOGGLE ---------- */
  const themeBtn = $("#theme-toggle");
  const savedTheme = localStorage.getItem("theme") || "light";

  function applyTheme(theme) {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
      if (themeBtn) themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      document.body.classList.remove("dark-mode");
      if (themeBtn) themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
    localStorage.setItem("theme", theme);
  }

  applyTheme(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      applyTheme(
        document.body.classList.contains("dark-mode") ? "light" : "dark"
      );
    });
  }

  /* ---------- CONTACT FORM ---------- */
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      const name = (document.getElementById("name")?.value || "").trim();
      const email = (document.getElementById("email")?.value || "").trim();
      const subject = document.getElementById("subject")?.value || "";
      const message = (document.getElementById("message")?.value || "").trim();
      const feedback = document.getElementById("form-feedback");

      if (!name || !email || !subject || !message) {
        if (feedback) {
          feedback.textContent = "⚠ Please fill in all required fields.";
          feedback.style.color = "#b00020";
        } else {
          alert("Please fill all fields.");
        }
        return;
      }

      const entry = { name, email, subject, message, when: new Date().toISOString() };
      const stored = JSON.parse(localStorage.getItem("messages") || "[]");
      stored.push(entry);
      localStorage.setItem("messages", JSON.stringify(stored));

      // ✅ FIXED TEMPLATE STRING
      if (feedback) {
        feedback.innerHTML = `<p style="color:green;">✅ Thanks ${name}! Message saved locally at ${new Date().toLocaleString()}.</p>`;
      } else {
        // ✅ FIXED ALERT STRING
        alert(`Thanks ${name}! Message saved locally.`);
      }

      contactForm.reset();
    });
  }

  /* ---------- FOOTER: YEAR + LAST MODIFIED ---------- */
  const yearEl = document.getElementById("currentyear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const lastModifiedEl = document.getElementById("lastModified");
  if (lastModifiedEl) {
    // ✅ FIXED TEMPLATE STRING
    lastModifiedEl.textContent = `Last Modified: ${document.lastModified}`;
  }

  /* ---------- OPTIONAL: Projects count ---------- */
  const projectCards = $$(".project-card");
  if (projectCards.length) {
    projectCards.forEach((c, i) => c.setAttribute("data-index", i + 1));
    const pageTitle = $(".page-title");
    if (pageTitle) {
      const countEl = document.createElement("p");

      // ✅ FIXED TEMPLATE STRING
      countEl.textContent = `Showing ${projectCards.length} projects.`;

      countEl.style.fontWeight = "700";
      countEl.style.marginTop = ".5rem";
      pageTitle.appendChild(countEl);
    }
  }

});
