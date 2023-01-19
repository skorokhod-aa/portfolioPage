const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const close = document.querySelector('.menu__close')

hamburger.addEventListener('click', () => {
    menu.classList.add("active");
})

close.addEventListener('click', () => {
    menu.classList.remove("active");
});

const counters = document.querySelectorAll('.skills__ratings-counter');
const lines = document.querySelectorAll('.skills__ratings-line span');

counters.forEach((item, i) => {
    lines[i].style.width = item.innerHTML;
})

const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    
    const blockID = anchor.getAttribute('href').substr(1)
    
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}