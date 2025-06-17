document.addEventListener('DOMContentLoaded', () => {
  // ✅ Preload all swatch images early
  document.querySelectorAll('.swatch-btn').forEach(btn => {
    const preloadImg = new Image();
    if (btn.dataset.src) preloadImg.src = btn.dataset.src;
    if (btn.dataset.srcset) preloadImg.srcset = btn.dataset.srcset;
  });

  // ✅ Handle swatch click events
  document.querySelectorAll('.product-card').forEach(card => {
    const mainImage = card.querySelector('.product-card__image--primary');
    const swatches = card.querySelectorAll('.swatch-btn');

    swatches.forEach(btn => {
      btn.addEventListener('click', () => {
        if (!mainImage) return;

        const newSrc = btn.dataset.src;
        const newSrcset = btn.dataset.srcset;

        // ✅ Only update image if new values differ
        if (newSrc && mainImage.src !== newSrc) {
          mainImage.classList.add('swapping'); // Optional visual feedback
          mainImage.src = newSrc;
        }
        if (newSrcset && mainImage.srcset !== newSrcset) {
          mainImage.srcset = newSrcset;
        }

        // ✅ Remove blur once image loads
        mainImage.onload = () => {
          mainImage.classList.remove('swapping');
        };

        // ✅ Update swatch selected state
        swatches.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
  });
});