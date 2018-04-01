window.addEventListener('scroll', (e) => {
   const nav = document.querySelector('.nav-part')
   const scroller = e.target.documentElement
   if (scroller.scrollTop > 0) {
       nav.classList.add('on-scroll-nav')
   } else {
       nav.classList.remove('on-scroll-nav')
   }
})