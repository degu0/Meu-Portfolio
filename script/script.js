// Animação de texto
function typeWriter(element) {
    const textArray = element.innerHTML.split('');
    element.innerHTML = '';
    textArray.forEach((letra, i) => {
        setTimeout(() => element.innerHTML += letra, 75 * i)
    });
}

const titulo = document.querySelector('.tit');
typeWriter(titulo);

// Animação do scroll
const debounce = function (func, wait, immediate) {
    let timeout;
    return function (...args) {
        const context = this;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

const targetAnimation = document.querySelectorAll('[data-anime]');
const animationClass = 'animate';

function animeScroll() {
    const windowTop = window.pageYOffset + ((window.innerHeight * 3) / 4);
    targetAnimation.forEach(function (element) {
        if ((windowTop) > element.offsetTop) {
            element.classList.add(animationClass);
        } else {
            element.classList.remove(animationClass);
        }
    })
}

animeScroll();

if (targetAnimation.length) {
    window.addEventListener('scroll', debounce(function () {
        animeScroll();
        console.log('xxx');
    }, 200))
}

// Link interno suave

const menuItems = document.querySelectorAll('.menu a[href^="#"]');

menuItems.forEach(item => {
    item.addEventListener('click', scrollToIdOnClick);
})

function getScrollTopByHref(element) {
    const id = element.getAttribute('href');
    return document.querySelector(id).offsetTop;
}

function scrollToIdOnClick(event) {
    event.preventDefault();
    const to = getScrollTopByHref(event.target) - 28;
    scrollToPosition(to);
}

function scrollToPosition(to) {
    // window.scroll({
    //   top: to,
    //   behavior: "smooth",
    // });
    smoothScrollTo(0, to);
}

/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int} endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
function smoothScrollTo(endX, endY, duration) {
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();

    duration = typeof duration !== 'undefined' ? duration : 400;

    // Easing function
    const easeInOutQuart = (time, from, distance, duration) => {
        if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
        return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
    };

    const timer = setInterval(() => {
        const time = new Date().getTime() - startTime;
        const newX = easeInOutQuart(time, startX, distanceX, duration);
        const newY = easeInOutQuart(time, startY, distanceY, duration);
        if (time >= duration) {
            clearInterval(timer);
        }
        window.scroll(newX, newY);
    }, 1000 / 60); // 60 fps
};


//Modo escuro

const html = document.querySelector('html');
const checkbox = document.querySelector('#chk');

checkbox.addEventListener('change', () => {
    html.classList.toggle('dark-mode')
    if(html.classList.contains('open')) {
        html.classList.remove('open');
        document.querySelector('.icon').src = 'image/moon.png'
        document.querySelector('#EmBreve').src = 'image/EmBreve-light-mode.png'
        document.querySelector('.IconLinkedIn').src = 'image/linkedin-light-mode.png'
        document.querySelector('.IconGitHub').src = 'image/github-light-mode.png'
    } else {
        html.classList.add('open');
        document.querySelector('.icon').src = 'image/sun.png'
        document.querySelector('#EmBreve').src = 'image/EmBreve-dark-mode.png'
        document.querySelector('.IconLinkedIn').src = 'image/linkedin-dark-mode.png'
        document.querySelector('.IconGitHub').src = 'image/github-dark-mode.png'
    }
})


//Menu Mobile

function menuShow() {
    let menuMobile = document.querySelector('.nav-list');
    if (menuMobile.classList.contains('openMenu')) {
        menuMobile.classList.remove('openMenu');
        document.querySelector('.iconMenu').src = 'image/hamburger.png';
    } else {
        menuMobile.classList.add('openMenu');
        document.querySelector('.iconMenu').src = 'image/sair.png';

    }
}