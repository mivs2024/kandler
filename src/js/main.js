import Swiper from 'swiper';
import './components/watcher';

import { Pagination } from 'swiper/modules';
import { Spollers } from './components/Spollers';

import './components/header';

const faqSpollers = document.querySelector('.js-faq-spollers');

new Spollers(faqSpollers);



new Swiper(document.querySelector('.reviews-slider'), {
    slidesPerView: 1,

    // configure Swiper to use modules
    modules: [Pagination],
    pagination: {
        el: ".reviews-slider__pagination",
        clickable: true,
        bulletClass: 'slider-pagination__bullet',
        bulletActiveClass: 'slider-pagination__bullet--active',
    },



});


