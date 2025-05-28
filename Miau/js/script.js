window.FontAwesomeConfig = {
  autoReplaceSvg: 'nest', // Options: 'nest', 'remove', 'replace'
};

// Tailwind config (se necessário para customização)
tailwind.config = {
  theme: {
    extend: {
      colors: {
        "transparent": "transparent",
        "current": "currentColor",
        "black": "#000000",
        "white": "#ffffff",
        "gray": {"50": "#f9fafb", "100": "#f3f4f6", "200": "#e5e7eb", "300": "#d1d5db", "400": "#9ca3af", "500": "#6b7280", "600": "#4b5563", "700": "#374151", "800": "#1f2937", "900": "#111827"},
        "red": {"50": "#fef2f2", "100": "#fee2e2", "200": "#fecaca", "300": "#fca5a5", "400": "#f87171", "500": "#ef4444", "600": "#dc2626", "700": "#b91c1c", "800": "#991b1b", "900": "#7f1d1d"},
        "yellow": {"50": "#fffbeb", "100": "#fef3c7", "200": "#fde68a", "300": "#fcd34d", "400": "#fbbf24", "500": "#f59e0b", "600": "#d97706", "700": "#b45309", "800": "#92400e", "900": "#78350f"},
        "green": {"50": "#ecfdf5", "100": "#d1fae5", "200": "#a7f3d0", "300": "#6ee7b7", "400": "#34d399", "500": "#10b981", "600": "#059669", "700": "#047857", "800": "#065f46", "900": "#064e3b"},
        "blue": {"50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", "300": "#93c5fd", "400": "#60a5fa", "500": "#3b82f6", "600": "#2563eb", "700": "#1d4ed8", "800": "#1e40af", "900": "#1e3a8a"},
        "indigo": {"50": "#eef2ff", "100": "#e0e7ff", "200": "#c7d2fe", "300": "#a5b4fc", "400": "#818cf8", "500": "#6366f1", "600": "#4f46e5", "700": "#4338ca", "800": "#3730a3", "900": "#312e81"},
        "purple": {"50": "#f5f3ff", "100": "#ede9fe", "200": "#ddd6fe", "300": "#c4b5fd", "400": "#a78bfa", "500": "#8b5cf6", "600": "#7c3aed", "700": "#6d28d9", "800": "#5b21b6", "900": "#4c1d95"},
        "pink": {"50": "#fdf2f8", "100": "#fce7f3", "200": "#fbcfe8", "300": "#f9a8d4", "400": "#f472b6", "500": "#ec4899", "600": "#db2777", "700": "#be185d", "800": "#9d174d", "900": "#831843"}
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'group-hover'],
      textColor: ['active', 'group-hover'],
    },
  },
  plugins: [],
};

document.addEventListener('DOMContentLoaded', function () {
  const track = document.getElementById('carousel-track');
  const leftBtn = document.getElementById('carousel-left');
  const rightBtn = document.getElementById('carousel-right');
  const cards = track?.children;
  if (!track || !leftBtn || !rightBtn || !cards || cards.length === 0) {
    console.warn('Carrossel: elementos não encontrados.');
    return;
  }

  // Carrossel: mostra 2 cards por vez (ajuste para 1 se quiser)
  const visibleCards = window.innerWidth < 900 ? 1 : 2;
  let currentIndex = 0;
  const cardWidth = cards[0].offsetWidth + 16; // 16px = gap-4
  const maxIndex = cards.length - visibleCards;

  function updateCarousel(animate = true) {
    if (animate) {
      track.style.transition = 'transform 0.5s cubic-bezier(.39,.575,.565,1)';
    } else {
      track.style.transition = 'none';
    }
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  leftBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel(true);
    }
  });

  rightBtn.addEventListener('click', () => {
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel(true);
    }
  });

  // Responsivo: atualiza ao redimensionar
  window.addEventListener('resize', () => {
    updateCarousel(false);
  });

  updateCarousel(false);
});

