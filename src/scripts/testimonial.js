import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const testimonialSwiper = new Swiper('.testimonial-carousel', {
  modules: [Navigation],

  slidesPerView: 1,
  spaceBetween: 30,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1280: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

const thumbnails = document.querySelectorAll('.gatos');
    const modal = document.getElementById('imageModal');
    const closeModal = document.getElementById('closeModal');
    const modalImage = document.getElementById('modalImage');

    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener('click', () => {
        modalImage.src = thumbnail.src.replace('100', '600'); // Cambia la resolución si es necesario
        modal.classList.remove('hidden');
      });
    });

    closeModal.addEventListener('click', () => {
      modal.classList.add('hidden');
    });

    window.addEventListener('click', (e) => {
      if (e.target == modal) {
        modal.classList.add('hidden');
      }
    });