const resSlider = document.querySelector('.slider-res')
const sliderWrapper = document.querySelector('.slider-res-wrapper')
let sliderItems = document.querySelectorAll('.slider-res__item')
let itemMove
window.addEventListener('load', onResize)
window.addEventListener('resize', onResize)
sliderWrapper.addEventListener('click', onButtonClick, true)
resSlider.addEventListener('transitionend', resetAtEnd)

function makeChilds(outElm, totalElm, initLogo = 4) {
  let childs = ''
  let url
  let i = outElm !== 0 ? -outElm : 0
  let predicate = totalElm > 0 ? totalElm - outElm : 0
  let imgId = initLogo - 1
  while (i < predicate) {
    imgId = imgId === 6 ? 1 : imgId + 1
    url = `https://markups.io/demo/outing/assets/images/sponsor-logo-${imgId}.png`
    const elm = `<li data-picId=${imgId} class="slider-res__item"><img src=${url} alt=""></li>`
    childs += elm
    i++
  }
  return childs
}

function cleanElement() {
  while (resSlider.firstChild) {
    resSlider.removeChild(resSlider.firstChild)
  }
}

function onResize(e) {
  resSlider.style.transition = 'unset'
  let { width: parentWidth } = window.getComputedStyle(sliderWrapper)
  let sliderItemWidth
  parentWidth = parseInt(parentWidth, 10)
  if (parentWidth <= 480) {
    console.log('s-width')
    resSlider.style.marginLeft = -parentWidth + 'px'
    sliderItemWidth = parentWidth / 2
    if (resSlider.childElementCount === 10) {
      sliderItems.forEach(elm => {
        elm.style.width = sliderItemWidth + 'px'
      })
    } else {
      cleanElement()
      resSlider.insertAdjacentHTML('beforeend', makeChilds(2, 10, 5))
      sliderItems = document.querySelectorAll('.slider-res__item')
      sliderItems.forEach(elm => (elm.style.width = sliderItemWidth + 'px'))
    }
  } else if (parentWidth > 480 && parentWidth <= 570) {
    resSlider.style.marginLeft = -parentWidth + 'px'
    sliderItemWidth = parentWidth / 3
    if (resSlider.childElementCount === 12) {
      sliderItems.forEach(elm => (elm.style.width = sliderItemWidth + 'px'))
    } else {
      cleanElement()
      resSlider.insertAdjacentHTML('beforeend', makeChilds(3, 12))
      sliderItems = document.querySelectorAll('.slider-res__item')
      sliderItems.forEach(elm => (elm.style.width = sliderItemWidth + 'px'))
    }
  } else {
    resSlider.style.marginLeft = -parentWidth + 'px'
    sliderItemWidth = parentWidth / 5
    if (resSlider.childElementCount === 16) {
      sliderItems.forEach(elm => (elm.style.width = sliderItemWidth + 'px'))
    } else {
      cleanElement()
      resSlider.insertAdjacentHTML('beforeend', makeChilds(4, 16, 4))
      sliderItems = document.querySelectorAll('.slider-res__item')
      sliderItems.forEach(elm => (elm.style.width = sliderItemWidth + 'px'))
    }
  }
}
function onButtonClick(e) {
  if (itemMove) return
  const { width } = resSlider.firstChild.style
  const parsedSliderItemWidth = parseFloat(width)
  resSlider.style.transition = 'all .5s'

  let { marginLeft: parsedSliderMarginLeft } = window.getComputedStyle(
    resSlider
  )
  parsedSliderMarginLeft = parseFloat(parsedSliderMarginLeft)

  switch (e.target.getAttribute('data-click')) {
    case 'left':
      resSlider.style.marginLeft =
        parsedSliderMarginLeft + parsedSliderItemWidth + 'px'
      break
    case 'right':
      resSlider.style.marginLeft =
        parsedSliderMarginLeft - parsedSliderItemWidth + 'px'
      break
  }
  itemMove = true
}
function resetAtEnd() {
  const slideItemWidth = parseFloat(resSlider.firstChild.style.width)
  let { width: sliderWrapperWidth } = window.getComputedStyle(sliderWrapper)
  let parsedSliderWrapperWidth = parseFloat(sliderWrapperWidth)
  const sliderMarginLeft = parseFloat(resSlider.style.marginLeft)
  const totalSliderWidth = slideItemWidth * resSlider.childElementCount
  const sliderOpWidht = totalSliderWidth - parsedSliderWrapperWidth
  const totalItems = 6
  if (Math.trunc(sliderMarginLeft) === 0) {
    // reset margin
    resSlider.style.transition = 'unset'
    resSlider.style.marginLeft = -(slideItemWidth * totalItems) + 'px'
  }

  if (sliderMarginLeft <= -sliderOpWidht) {
    resSlider.style.transition = 'unset'
    resSlider.style.marginLeft =
      sliderMarginLeft + slideItemWidth * totalItems + 'px'
  }
  itemMove = false
}
