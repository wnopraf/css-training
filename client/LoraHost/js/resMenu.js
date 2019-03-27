const resButton = document.querySelector('[data-icon-res]')
const resMenu = document.querySelector('[data-wrapper-menu]')
const navWrapper = document.querySelector('[data-nav]')
const dataOpen = document.querySelector('[data-open]')
const dataClose = document.querySelector('[data-close]')
let isFixedNav = false
document.addEventListener('scroll', onScroll)
resButton.addEventListener('click', toggleMenu)

function toggleMenu () {
  const cero = '0px'
  const auto = '300px'
  if (resMenu.style.height === cero) {
    resMenu.style.height = auto
  } else {
    resMenu.style.height = cero
  }
}

function onScroll (e) {
  const scrollElm = this.scrollingElement

  if (scrollElm.scrollTop >= 16 * 8) {
    if (isFixedNav) return
    isFixedNav = true
    navWrapper.style.backgroundColor = 'rgb(118, 118, 255)'
    navWrapper.style.transform = `translateY(-100%)`
    navWrapper.style.transition = 'all .5s'

    setTimeout(() => {
      navWrapper.style.position = 'fixed'
      navWrapper.style.transform = 'translateY(0%)'
    }, 500)
  } else if (scrollElm.scrollTop < 16 * 8 && isFixedNav) {
    navWrapper.style.position = 'absolute'
    navWrapper.style.transform = 'translateY(0px)'
    navWrapper.style.backgroundColor = ''
    isFixedNav = false
  }
}
