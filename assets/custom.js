document.addEventListener("DOMContentLoaded", () => {
    var customSection = document.querySelectorAll(".shopify-section--press");
  
        customSection.forEach((section, index)=>{
           var customDots = section.querySelector(".custom-page-dots");
            var pressCarousel = section.querySelector("press-carousel");
            var customTap = customDots.querySelectorAll(".tap-area");
            var pressImg = pressCarousel.querySelectorAll(".press__list-item");

            var autoSliderInterval;
            var startX, endX;

            function startAutoSlider() {
                stopAutoSlider();
                autoSliderInterval = setInterval(() => {
                    let currentSelectedIndex = Array.from(pressImg).findIndex(item => item.classList.contains("is-selected"));
                    let nextIndex = (currentSelectedIndex + 1) % pressImg.length;
                    updateSelection(currentSelectedIndex, nextIndex);
                }, 4500);
            }

            function stopAutoSlider() {
                clearInterval(autoSliderInterval);
            }

            function updateSelection(currentIndex, nextIndex) {
                if (currentIndex === -1 || pressImg.length === 0) return;
                pressImg[currentIndex].classList.remove("is-selected");
                pressImg[currentIndex].setAttribute("aria-current", "false");
                customTap[currentIndex].setAttribute("aria-current", "false");
                pressImg[nextIndex].classList.add("is-selected");
                pressImg[nextIndex].setAttribute("aria-current", "true");
                customTap[nextIndex].setAttribute("aria-current", "true");
            }

            // Swipe functionality for this specific section
            pressCarousel.addEventListener("touchstart", function (e) {
                startX = e.touches[0].clientX;
            });

            pressCarousel.addEventListener("touchend", function (e) {
                endX = e.changedTouches[0].clientX;
                let diffX = startX - endX;

                if (diffX > 50) {
                    // Swipe left
                    let currentSelectedIndex = Array.from(pressImg).findIndex(item => item.classList.contains("is-selected"));
                    let nextIndex = (currentSelectedIndex + 1) % pressImg.length;
                    updateSelection(currentSelectedIndex, nextIndex);
                } else if (diffX < -50) {
                    // Swipe right
                    let currentSelectedIndex = Array.from(pressImg).findIndex(item => item.classList.contains("is-selected"));
                    let prevIndex = (currentSelectedIndex - 1 + pressImg.length) % pressImg.length;
                    updateSelection(currentSelectedIndex, prevIndex);
                }
            });

            customTap.forEach((item, index) => {
                item.addEventListener("click", () => {
                    console.log("click working");
                    stopAutoSlider();
                    let currentSelectedIndex = Array.from(pressImg).findIndex(item => item.classList.contains("is-selected"));
                    updateSelection(currentSelectedIndex, index);
                    setTimeout(startAutoSlider, 600000);
                });
            });
        })
           
});



//Start On mobile Device (Product Page) clickable arrow icon
    document.addEventListener("DOMContentLoaded", async () => {
    let nextBtn = document.querySelector("#main_slider_next_btn");
    let prevBtn = document.querySelector("#main_slider_prev_btn");
    if (prevBtn) {
        prevBtn.disabled = true;
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", async () => {
            await pageDots("next");
            updateButtonState();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", async () => {
            await pageDots("prev");
            updateButtonState();
        });
    }

    const pageDots = async (direction) => {
        let iconSelect = document.querySelector(".page-dots");

        if (iconSelect) {
            let tapArea = iconSelect.querySelectorAll(".tap-area");
            let currentIndex = -1;

            tapArea.forEach((item, index) => {
                if (item.getAttribute("aria-current") === "true") {
                    currentIndex = index;
                    item.setAttribute("aria-current", "false");
                }
            });

            let nextIndex;

            if (direction === "next") {
                nextIndex = (currentIndex >= 0 && currentIndex < tapArea.length - 1) ? currentIndex + 1 : (tapArea.length > 0 ? 0 : -1);
            } else if (direction === "prev") {
                nextIndex = (currentIndex > 0) ? currentIndex - 1 : (tapArea.length > 0 ? tapArea.length - 1 : -1);
            }

            // Set aria-current to the next or previous item and trigger a click on it
            let targetItem = tapArea[nextIndex];
            if (targetItem) {
                targetItem.click();
                targetItem.setAttribute("aria-current", "true");
            }
        }
    };

    const updateButtonState = () => {
        let iconSelect = document.querySelector(".page-dots");

        if (iconSelect) {
            let tapArea = iconSelect.querySelectorAll(".tap-area");
            let currentIndex = -1;

            tapArea.forEach((item, index) => {
                if (item.getAttribute("aria-current") === "true") {
                    currentIndex = index;
                }
            });

            // Enable or disable buttons based on current index
            if (prevBtn) {
                prevBtn.disabled = currentIndex <= 0;
            }
            if (nextBtn) {
                nextBtn.disabled = currentIndex >= tapArea.length - 1;
            }
        }
    };
});
//End On mobile Device (Product Page) clickable arrow icon

// Start Video autoplay
    document.addEventListener("DOMContentLoaded", () => {
      let videoTag = document.querySelectorAll("video-media");
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("show", entry.isIntersecting);
          if (entry.isIntersecting) {
            entry.target.play();
          } else {
            entry.target.pause();
          }
        });
      }, { threshold: 1 }); 
      videoTag.forEach((videoItem) => {
        observer.observe(videoItem);
      });
    });
    document.addEventListener("DOMContentLoaded", () => {
  const iframes = document.querySelectorAll("iframe");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const iframe = entry.target;
      if (iframe.src.includes("player.vimeo.com")) {
        const vimeoPlayer = new Vimeo.Player(iframe);

        if (entry.isIntersecting) {
          vimeoPlayer.play().then(() => {
            console.log("Video is playing.");
          }).catch((error) => {
            console.error("Error playing the video:", error);
          });
        } else {
          vimeoPlayer.pause().then(() => {
          }).catch((error) => {
            console.error("Error pausing the video:", error);
          });
        }
      }
    });
  }, { threshold: 1 });

  iframes.forEach((iframe) => {
 
    observer.observe(iframe);
  });
let tabClass = document.querySelector(".buttons-list");
if (tabClass) {
  let btnTab = tabClass.querySelectorAll("li");
  btnTab.forEach((item) => {
    item.addEventListener("click", () => {
      let anchorTag = item.querySelector("a");
      let itemHref = anchorTag ? anchorTag.getAttribute("href") : null;
      if (itemHref) {
        let newUrl = `${location.origin}${location.pathname}${itemHref}`;
        history.pushState(null, "", newUrl);
      }
    });
  });
}

    });
// End Video autoplay
















