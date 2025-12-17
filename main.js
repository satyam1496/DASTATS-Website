let navbar = document.querySelector('.header .navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
}; 

window.onscroll = () =>{
    navbar.classList.remove('active');
}


var swiper = new Swiper(".home-slider", {
    loop: true,
    grabCursor: true,

    autoplay: {
        delay: 3000,              // slides every 3 seconds
        disableOnInteraction: false
    },

    speed: 700,                   // smooth slide transition

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


// ======================
// COUNTER ANIMATION WITH +
// ======================

const counters = document.querySelectorAll('.count');
let started = false;

function startCounter() {
  if (started) return;

  counters.forEach(counter => {
    let target = +counter.dataset.target;
    let count = 0;
    let speed = 40;

    let updateCount = () => {
      if (count < target) {
        count++;
        counter.innerText = count;  // animate number only
        setTimeout(updateCount, speed);
      } else {
        counter.innerText = target + "+";  // add + when finished
      }
    };

    updateCount();
  });

  started = true;
}

const statsSection = document.querySelector('.stats');
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    startCounter();
  }
}, { threshold: 0.4 });

if (statsSection) observer.observe(statsSection);




// ===========================
// SEPARATE PERCENT COUNTER (0 → 22%)
// ===========================

const percentElements = document.querySelectorAll(".percent-counter");
let percentAnimated = false;

function startPercentAnimation() {
    if (percentAnimated) return;

    percentElements.forEach(el => {
        let target = +el.dataset.target;  // e.g. 22
        let count = 0;
        let speed = 40; // adjust speed

        function update() {
            if (count < target) {
                count++;
                el.innerText = count + "%";
                setTimeout(update, speed);
            } else {
                el.innerText = target + "%"; // final value
            }
        }

        update();
    });

    percentAnimated = true;
}

// separate observer for % counter
const percentSection = document.querySelector(".stats");
if (percentSection) {
    const percentObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            startPercentAnimation();
        }
    }, { threshold: 0.4 });

    percentObserver.observe(percentSection);
}







document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector('.service-visual-card');
  if (!card) return; // prevent error if element isn't found

  const img = card.querySelector('img');

  const maxRotate = 12;   // degrees
  const maxScale  = 1.06; // zoom

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateY = ((x - midX) / midX) * maxRotate;
    const rotateX = -((y - midY) / midY) * maxRotate;

    img.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${maxScale})`;
  });

  card.addEventListener('mouseleave', () => {
    img.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  });
});

// =======================
// VOCA PROCESS TIMELINE ANIMATION
// =======================
const processWrapper = document.querySelector('.process-wrapper');

if (processWrapper) {
  const processObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        processWrapper.classList.add('process-active');
        processObserver.disconnect(); // run only once
      }
    },
    {
      threshold: 0.4,
    }
  );

  processObserver.observe(processWrapper);
}




// =======================
// CASE STUDIES SLIDER
// =======================
const caseSliderEl = document.querySelector('.caseSwiper');

if (caseSliderEl) {
  const caseSwiper = new Swiper('.caseSwiper', {
    slidesPerView: 3,
    spaceBetween: 24,
    loop: false,

    navigation: {
      nextEl: '.case-next',
      prevEl: '.case-prev',
    },
    pagination: {
      el: '.case-pagination',
      clickable: true,
    },

    breakpoints: {
      0: {
        slidesPerView: 1.05,
        spaceBetween: 16,
      },
      640: {
        slidesPerView: 1.5,
        spaceBetween: 18,
      },
      900: {
        slidesPerView: 2.2,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  });
}

