const slider = document.querySelector('.slider__items-slide-wrapper')
const buttonWrapper = document.querySelector('.slide__buttons')
const leftBt = document.querySelector('[data-clicker="left"]')
const centerBt = document.querySelector('[data-clicker="center"]')
const rightBt = document.querySelector('[data-clicker="right"]')
const slideFrame = parseInt(window.getComputedStyle(slider).width, 10)
const whiteColor = 'white'
const brandColor = 'hsl(111, 69%, 42%)'
window.addEventListener('load', () => {
  console.log('ready')
  slider.style.transition = 'all 1s 3s'
  slider.style.marginLeft = -slideFrame + 'px'
  leftBt.style.borderColor = whiteColor
})

window.addEventListener('resize', onResize)
slider.addEventListener('transitionend', slideMove)

buttonWrapper.addEventListener('click', clickSlide)
function slideMove () {
  const slideFrame = parseInt(window.getComputedStyle(slider).width, 10)
  // reset transition after click
  slider.style.transition = 'all 1s 3s'
  let { marginLeft: movedDistance } = slider.style
  movedDistance = parseInt(movedDistance, 10)
  const limitDistance = 3
  // make reset pic efect with fake last element
  if (movedDistance === -(slideFrame * limitDistance)) {
    slider.style.transition = 'unset'
    slider.style.marginLeft = '0'
    // set/unset last/first animation button color
    rightBt.style.borderColor = brandColor
    leftBt.style.borderColor = whiteColor
    // start again the animation after reset fix
    setTimeout(() => {
      slider.style.transition = 'all 1s 3s'
      slider.style.marginLeft = -slideFrame + 'px'
    })
  } else {
    switch (movedDistance) {
      case -slideFrame:
        leftBt.style.borderColor = brandColor
        centerBt.style.borderColor = whiteColor
        break
      case -slideFrame * 2:
        centerBt.style.borderColor = brandColor
        rightBt.style.borderColor = whiteColor
        break
    }
    slider.style.marginLeft = movedDistance + -slideFrame + 'px'
  }
}

function clickSlide (e) {
  slider.style.transition = 'unset'
  const slideFrame = parseInt(window.getComputedStyle(slider).width, 10)
  /* Help to control the real element offset, since transition event alter the real margin-left value */
  const getOffsetX = () => {
    console.log('offset', slider.offsetLeft)
    return parseInt(slider.offsetLeft, 10)
  }
  const endView = -slideFrame * 2
  // avoiding to show last magic item.
  if (
    e.target.getAttribute('data-clicker') === 'left' &&
    getOffsetX() >= endView
  ) {
    // avoiding double click.
    if (getOffsetX() === 0) return
    slider.style.transition = 'all 500ms'
    // reset current transition.
    slider.style.marginLeft = slider.style.marginLeft

    setTimeout(() => {
      slider.style.marginLeft = '0'
    })
    // color the selected one  button and reset the others.
    allGreen('left')
  }
  if (e.target.getAttribute('data-clicker') === 'right') {
    if (getOffsetX() === -(slideFrame * 2)) return
    slider.style.transition = 'all 500ms'
    slider.style.marginLeft = 0
    setTimeout(() => {
      slider.style.marginLeft = -(slideFrame * 2) + 'px'
    })
    allGreen('right')
  }
  if (
    e.target.getAttribute('data-clicker') === 'center' &&
    getOffsetX() >= endView
  ) {
    if (getOffsetX() === -slideFrame) return
    slider.style.transition = 'all 500ms'
    slider.style.marginLeft = 0
    setTimeout(() => {
      slider.style.marginLeft = -slideFrame + 'px'
    })
    allGreen('center')
  }
}

function allGreen (direction) {
  const allBt = document.querySelectorAll('[data-clicker]')
  allBt.forEach(bt => {
    if (bt.getAttribute('data-clicker') === direction) {
      bt.style.borderColor = whiteColor
    } else {
      bt.style.borderColor = brandColor
    }
  })
}

function onResize () {
  const slideFrame = parseInt(window.getComputedStyle(slider).width, 10)
  slider.style.transition = 'unset'
  slider.style.marginLeft = '0px'
  allGreen('left')
  setTimeout(() => {
    slider.style.transition = 'all 1s 3s'
    slider.style.marginLeft = -slideFrame + 'px'
  })
}
