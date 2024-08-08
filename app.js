document.addEventListener('DOMContentLoaded', function () {
    let lastActiveTabIndex = 0;
    changeSlides();

    // for tab-changing slide effect
    document.querySelectorAll('.tab').forEach((tab, i) => {
        tab.addEventListener('click', function () {
            document.querySelector('.tab-active').classList.remove('tab-active', 'slide-in-left', 'slide-in-right');
            tab.classList.add('tab-active');
            if (lastActiveTabIndex > i) {
                tab.classList.add('slide-in-right');
            } else {
                tab.classList.add('slide-in-left');
            }
            lastActiveTabIndex = i;
            changeSlides();
        });
    });

    function changeSlides() {
        document.querySelectorAll('.cards').forEach((cards, i) => {
            document.querySelectorAll('.cards')[i].classList.remove('cards-show');
            if (lastActiveTabIndex === i) {
                cards.classList.add('cards-show');
                cards.style.marginLeft = '100px';
                //     add animation delay for each of the card
                cards.querySelectorAll('.card').forEach((card, j) => {
                    card.style.animationDelay = `${0.1 * j}s`;
                });
            }
        });
    }

    document.querySelectorAll('.btn-extension').forEach((btn, i) => {
        btn.addEventListener('click', function () {
            let activeCard = document.querySelector('.cards-show');
            let currentMarginLeft = parseFloat(getComputedStyle(activeCard).marginLeft) || 0;
            let containerWidth = (activeCard.querySelectorAll('.card').length * activeCard.querySelector('.card').clientWidth) + ((activeCard.querySelectorAll('.card').length - 1) * 2 * 18) + 20;
            let cardWidth = activeCard.querySelector('.card').clientWidth;
            let maxMarginLeft = containerWidth - window.innerWidth;
            if (btn.getAttribute('id').includes('btn-left')) {
                // Slide to the left
                if (currentMarginLeft < 0) {
                    activeCard.style.marginLeft = `${Math.min(currentMarginLeft + cardWidth, 0)}px`;
                }
            } else if (btn.getAttribute('id').includes('btn-right')) {
                // Slide to the right
                if (Math.abs(currentMarginLeft) < maxMarginLeft) {
                    activeCard.style.marginLeft = `-${Math.min(Math.abs(currentMarginLeft) + cardWidth, maxMarginLeft)}px`;
                }
            }
        });
    });

//     for extra features
    document.querySelectorAll('#extra-links a').forEach((link, i) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector('.extra-active').classList.remove('extra-active');
            link.classList.add('extra-active');

            document.querySelector('.extra-img-active').classList.remove('extra-img-active');
            document.querySelectorAll('#extra-right  .extra-img')[i].classList.add('extra-img-active');

            document.querySelector('.floating-active').classList.remove('floating-active');
            document.querySelectorAll('#floating-notes > .floating-note')[i].classList.add('floating-active');

        });

    });
});