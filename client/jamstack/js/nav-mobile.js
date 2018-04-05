const actionMenu = document.querySelector('.mobile-action-menu')
const mobileMenu = document.querySelector('.mobile-menu')

actionMenu.addEventListener('click',(e) => {
    
    mobileMenu.classList.toggle('mobile-menu-is-visible')
})