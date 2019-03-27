const resButton = document.querySelector('[data-icon-res]')
const resMenu = document.querySelector('[data-wrapper-menu]')
const navWrapper = document.querySelector('[data-nav]')
const dataOpen = document.querySelector('[data-open]')
const dataClose = document.querySelector('[data-close]')
let isFixedNav = false
document.addEventListener('scroll', onScroll)
resButton.addEventListener('click', toggleMenu)

function toggleMenu() {
  console.log('togglin menu')
  const cero = '0px'
  const auto = '300px'
  if (resMenu.style.height === cero) {
    resMenu.style.height = auto
  } else {
    resMenu.style.height = cero
  }
}

function onScroll(e) {
  const scrollElm = this.scrollingElement
  console.log('onScroll', scrollElm.scrollTop)
  if (scrollElm.scrollTop >= 16 * 8) {
    console.log('log', '', '')
    if (isFixedNav) return
    isFixedNav = true

    navWrapper.style.transform = `translateY(-100%)`
    navWrapper.style.transition = 'all .5s'

    setTimeout(() => {
      navWrapper.style.position = 'fixed'
      navWrapper.style.transform = 'translateY(0%)'
    }, 500)
  } else if (scrollElm.scrollTop < 16 * 8 && isFixedNav) {
    navWrapper.style.position = 'absolute'
    navWrapper.style.transform = 'translateY(0px)'

    isFixedNav = false
  }
}
