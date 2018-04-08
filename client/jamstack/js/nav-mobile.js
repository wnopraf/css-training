const actionMenu = document.querySelector('.mobile-action-menu')
const mobileMenu = document.querySelector('.mobile-menu')
const responiveMenu = document.querySelector('.responsive-menu')
mobileMenu.style.height = '0px'
actionMenu.addEventListener('click',(e) => {
    let computedHeight = window.getComputedStyle(responiveMenu).height
    console.log(computedHeight,'com height');
    if (mobileMenu.style.height === '0px') {
        mobileMenu.style.height = computedHeight
    } else {
        mobileMenu.style.height = '0px'
    }
    
})