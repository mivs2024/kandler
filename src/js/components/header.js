const burger = document.querySelector('.burger')
const header = document.querySelector('.header')
const menu = document.querySelector('.menu')
const menuClose = document.querySelector('.menu__close')


burger.onclick = function () {

    burger.classList.add('open');
    menu.classList.add('open');
    document.body.setAttribute('style', 'overflow:hidden')

}

menu.addEventListener("click", (e) => {
    if (e.target.closest('.menu__item')) {
        burger.classList.remove('open');
        menu.classList.remove('open');
        document.body.removeAttribute('style')
    }

});


menuClose.onclick = function () {
    burger.classList.remove('open');
    menu.classList.remove('open');
    document.body.removeAttribute('style')

}

function initHeader() {

    function checkFixed() {
        let scrollY = window.scrollY;

        if (scrollY > 200 && !header.classList.contains('fixed')) {
            header.classList.add('fixed');
            const headerStyles = window.getComputedStyle(header);


            headerHeight = parseInt(headerStyles.getPropertyValue('height'));

            document.body.style.paddingTop = `${headerHeight}px`;

        } else if (scrollY <= 0) {
            header.classList.remove('fixed');
            document.body.style.paddingTop = '';
        }

    }
    window.addEventListener('scroll', checkFixed);
    checkFixed();
}

initHeader()