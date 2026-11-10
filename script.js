document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  const bubbleLayer = document.querySelector(".bubble-layer");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (bubbleLayer && !prefersReducedMotion) {
    const bubbleCount = 20;
    for (let index = 0; index < bubbleCount; index += 1) {
      const bubble = document.createElement("span");
      bubble.className = "bubble";

      const size = 18 + Math.random() * 42;
      const left = Math.random() * 100;
      const drift = (Math.random() * 130 - 65).toFixed(2);
      const duration = 14 + Math.random() * 18;
      const delay = (Math.random() * 12).toFixed(2);
      const opacity = 0.18 + Math.random() * 0.25;

      bubble.style.setProperty("--size", `${size}px`);
      bubble.style.setProperty("--left", `${left}%`);
      bubble.style.setProperty("--drift", `${drift}px`);
      bubble.style.setProperty("--duration", `${duration}s`);
      bubble.style.setProperty("--delay", `${delay}s`);
      bubble.style.opacity = opacity;

      bubbleLayer.appendChild(bubble);
    }
  }

  const audio = new Audio("assets/piano.mp3");
  audio.loop = true;
  audio.volume = 0.08;
  const musicToggle = document.getElementById("music-toggle");

  if (musicToggle) {
    musicToggle.addEventListener("click", async () => {
      try {
        if (audio.paused) {
          await audio.play();
          musicToggle.classList.remove("is-muted");
          musicToggle.setAttribute("aria-label", "Tắt nhạc nền");
          musicToggle.setAttribute("aria-pressed", "true");
          musicToggle.textContent = "🎵";
        } else {
          audio.pause();
          musicToggle.classList.add("is-muted");
          musicToggle.setAttribute("aria-label", "Bật nhạc nền");
          musicToggle.setAttribute("aria-pressed", "false");
          musicToggle.textContent = "🔇";
        }
      } catch (error) {
        // Trình duyệt chặn autoplay: không báo lỗi, chỉ giữ trạng thái tắt.
      }
    });
  }
});
