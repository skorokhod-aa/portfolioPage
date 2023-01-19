window.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent(){
        tabsContent.forEach(item => {
            console.log(item);
            item.style.display = 'none';
            // item.style.dispay = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    }

    function showTabContent(i){
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    hideTabContent();
    showTabContent(0);

    // timer 
    
    function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor( (t/(1000*60*60*24))),
              hours = Math.floor(t/(1000*60*60)%24),
              minutes =  Math.floor(t/(1000*60)%60),
              seconds =  Math.floor(t/(1000)%60);
        return {
            'total': t,
            'days': days,
            'minutes': minutes,
            'seconds': seconds,
            'hours': hours
        };
    }

    function getZero(num){
        if (num > 0 && num < 9){
            return '0' + num;
        } else{
            return num;
        }
    }

    function setClock(selector, endtime){
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
    
        updateClock();
        
        function updateClock(){
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total === endtime){
                clearInterval(timeInterval);
            }
        }
    }

    deadline = '2022-05-05';
    setClock('.timer', deadline);

    // Modal 

    const modalTrigger = document.querySelectorAll('[data-modal]'),
            modalClose = document.querySelector('[data-close]'),
            modalWindow = document.querySelector('.modal');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
            modalWindow.style.display = 'block';
            clearInterval(modalTimerId);
        });
    });
    
    function closeWindow(){
        modalWindow.style.display = 'none';
    }

    modalClose.addEventListener('click', closeWindow);

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow){
            closeWindow();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modalWindow.style.display == 'block'){
            closeWindow();
        }
    })

    // const modalTimerId = setTimeout(() => {
    //     modalWindow.style.display = 'block';
    // }, 6000);

    function showModalByScroll(){
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1){
            modalWindow.style.display = 'block';
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    const menu = document.querySelector('.menu__field');

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.transfer = 27;
            this.parent = document.querySelector(parentSelector);
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price*this.transfer;
        }
        
        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                <img src=${this.src} alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.title}"</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        `menu__item`
    ).render();

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        `menu__item`
    ).render();
});

// slider

const slides = document.querySelectorAll('.offer__slide'),
      next = document.querySelector('.offer__slider-next'),
      prev = document.querySelector('.offer__slider-prev'),
      total = document.querySelector('#total'),
      current = document.querySelector('#current'),
      slider = document.querySelector('.offer__slider'),
      slidesWrapper = document.querySelector('.offer__slider-wrapper'),
      slidesField = document.querySelector('.offer__slider-inner'),
      widthWrapper = window.getComputedStyle(slidesWrapper).width;

      
let index_slide = 0;

function strToInt(str){
    return +str.replace(/\D/g, '')
}

console.log(strToInt('1234efw'));


if (slides.length<10){
    total.textContent = `0${slides.length}`;
}
else{
    total.textContent = slides.length;
}

slidesField.style.width = slides.length * 100 + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all'

slides.forEach(slide => {
    slide.style.width = widthWrapper + 'px';
});

slidesWrapper.style.overflow = 'hidden';

let offset = 0;

function numIndex(n){
    index_slide = index_slide + n;
    if (index_slide>slides.length){
        index_slide = 1;
    }
    if (index_slide<1){
        index_slide = slides.length;
    }

    if (index_slide < 10){
        current.textContent = `0${index_slide}`;
    }
    else{
        current.textContent = index_slide;
    }
   
}

numIndex(1);

//dots
slider.style.position = 'relative';

const indicators = document.createElement('ol');
indicators.classList.add('carousel_indicators');
indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
`
slider.append(indicators);

const dots = [];

for (let i=0; i<slides.length; i++){
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i+1);
    dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
    `
    if (i==0) {
        dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
}

console.log(dots);

next.addEventListener('click', () => {
    if (offset >= (slides.length-1) * +widthWrapper.slice(0, widthWrapper.length-2)){
        offset = 0;
    }
    else {
        offset += +widthWrapper.slice(0, widthWrapper.length-2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    numIndex(1)

    dots.forEach(dot => {
        dot.style.opacity = .5;
    });
    dots[index_slide-1].style.opacity = 1;

})

prev.addEventListener('click', () => {
    // if (offset <= 0){
    //     offset = (slides.length-1) * +widthWrapper.slice(0, widthWrapper.length-2);
    // }
    if (offset==0){
        offset = (slides.length-1) * +widthWrapper.slice(0, widthWrapper.length-2)
    }
    else{
        offset -= +widthWrapper.slice(0, widthWrapper.length-2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    numIndex(-1);

    dots.forEach(dot => {
        dot.style.opacity = .5;
    });
    dots[index_slide-1].style.opacity = 1;
})

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');
        index_slide = +slideTo;
        offset = (slideTo-1) * +widthWrapper.replace(/\D/g, '');
        slidesField.style.transform = `translateX(-${offset}px)`;
        dots.forEach(dot => dot.style.opacity = .5);
        dots[index_slide-1].style.opacity = 1;
        numIndex(0);
    })
});

// calc
const result = document.querySelector('.calculating__result span');
let sex, height, weight, age, ratio;

if (localStorage.getItem('sex')){
    sex = localStorage.getItem('sex');
}
else{
    sex = 'female';
    localStorage.setItem('sex', 'female');
}

if (localStorage.getItem('ratio')){
    ratio = localStorage.getItem('ratio');
}
else{
    ratio = 1.5;
    localStorage.setItem('ratio', 1.5);
}

initLocalSettings('#gender div', 'calculating__choose-item_active');
initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active')

function calcResult()
{
    if (!sex || !height || !weight || !age || !ratio){
        result.textContent = '_____';
        return
    }
    if (sex === 'female'){
        result.textContent = Math.round(((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio))
    }
    else{
        result.textContent = Math.round(((88.36 + (13.4 * weight) + (4.8 + height) - (5.7 * age)) * ratio))
    }
}

function initLocalSettings(selector, activeClass){
    const elements = document.querySelectorAll(selector);
    elements.forEach(elem => {
        elem.classList.remove(activeClass);
        if (elem.getAttribute('id') === localStorage.getItem('sex')){
            elem.classList.add(activeClass);
        }
        if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
            elem.classList.add(activeClass);
        }
    });
}

function getStaticInformation(parentSelector, activeClass){
    const elements = document.querySelectorAll(`${parentSelector} div`);
    elements.forEach(elem => {
        elem.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')){
                ratio = +e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
            }
            else{
                sex = e.target.getAttribute('id');
                localStorage.setItem('sex', e.target.getAttribute('id'));

            }
    
            elements.forEach(elem => {
                elem.classList.remove(activeClass);
            });
            e.target.classList.add(activeClass);
    
            calcResult()
        })
    });
}

function getDynamicInformation(parentSelector){
    elements = document.querySelectorAll(`${parentSelector} input`);
    elements.forEach(elem => {
        elem.addEventListener('input', (e) => {
            if (elem.value.match(/\D/g)){
                elem.style.border = '1px solid red';
            }
            else{
                elem.style.border = 'none';
            }
            switch(elem.getAttribute('id')){
                case 'height':
                    height = +elem.value;
                    break;
                case 'weight':
                    weight = +elem.value;
                    break;
                case 'age':
                    age = +elem.value
                    break;
            }
            calcResult()
        })
    });
}

getDynamicInformation('.calculating__choose_medium');
getStaticInformation('#gender', 'calculating__choose-item_active');
getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');
calcResult();

// if (slides.length < 10){
//     total.textContent = `0${slides.length}`;
// }
// else{
//     total.textContent = slides.length;
// }

// showSlides(index_slide);

// function showSlides(i){

//     if (i > slides.length){
//         index_slide = 1;
//     }
//     if (i < 1){
//         index_slide = slides.length;
//     } 

//     if (index_slide < 10){
//         current.textContent = `0${index_slide}`;
//     }
//     else{
//         current.textContent = index_slide;
//     }

//     slides.forEach(element => {
//         element.style.display = 'none';
//     });

//     slides[index_slide-1].style.display = 'block';
// }

// function plusSlide(n){
//     showSlides(index_slide+=n);
// }

// prev.addEventListener('click', () => {
//     plusSlide(-1);
// });
// next.addEventListener('click', () => {
//     plusSlide(1);
// });
