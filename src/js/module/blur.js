const blurInit = () => {
  const scrollbox = document.querySelector('.scroll');
  const placehold = document.querySelector('.placeholder');
  const canvas = document.querySelector('#canvas-wrapper');
  const container = document.querySelector('.container')


  const moveIn = (e) => {
    canvas.classList.add('blur');
  }

  const moveOut = (e) => {
    canvas.classList.remove('blur');
  }

  const isScrolledIntoView = (el) => {
      let rect = el.getBoundingClientRect();
      let elemTop = rect.top;
      let elemBottom = rect.bottom;
      let visible = (window.innerHeight - elemTop) >= (rect.height / 8)

      return visible;
  }

  const isScrolledIntoView2 = (el) => {
      let rect = el.getBoundingClientRect();
      let elemTop = rect.top;
      let elemBottom = rect.bottom;
      let visible = (elemTop > 0)  && (elemTop >= (rect.height / 8))

      return visible;
  }


  const debounce = (func, wait = 15) => {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    };
  }


  let oldScroll = 0;
  const checkSlide = (e) => {
    let test = scrollbox.getBoundingClientRect()
    let top = test.top;
    let height = test.height;
    let bottom = test.bottom;
      // if no blur on canvas check if top scroll entered
      // print "false" if direction is down and "true" if up
    let direction = oldScroll > test.top;
    oldScroll = test.top;
    if (!canvas.classList.contains('blur')  && direction) {
      if (isScrolledIntoView(scrollbox)) {
        return moveIn(scrollbox);
      }
    } else if (canvas.classList.contains('blur') && !direction) {
      if (isScrolledIntoView2(scrollbox)) {
        return moveOut(scrollbox)
      }
    }

  }
  container.addEventListener('scroll', debounce(checkSlide));
  window.addEventListener('scroll', debounce(checkSlide));
}

export { blurInit };
