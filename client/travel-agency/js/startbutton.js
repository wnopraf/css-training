const button = document.querySelector('.start-button')
const { scrollingElement } = document
window.addEventListener('scroll', toggleButton)
button.addEventListener('click', scrollUp)

function scrollUp () {
  scrollingElement.scrollTop = 0
}

function toggleButton () {
  console.log('srolling', window.scrollY)
  if (scrollingElement.scrollTop > 300) {
    button.style.opacity = '1'
  } else {
    button.style.opacity = '0'
  }
}
