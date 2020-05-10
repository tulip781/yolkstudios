const blurInit = () => {
  const scrollbox = document.querySelector('.scroll');
  const canvas = document.querySelector('#canvas-wrapper');

  const moveIn = (e) => {
    canvas.classList.add('blur');
  }

  const moveOut = (e) => {
    canvas.classList.remove('blur');
  }

  const isScrolledIntoView = (el) => {
      let rect = el.getBoundingClientRect();
      console.log(rect);
      let elemTop = rect.top;
      let elemBottom = rect.bottom;
      let isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
      let visible = (window.innerHeight - elemTop) >= (rect.height / 8)
      return visible;
  }

  const debounce = (func, wait = 50) => {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    };
  }

  const checkSlide = (e) => {
      let test = scrollbox.getBoundingClientRect()
      let top = test.top;
      let bottom = test.bottom;
      if (isScrolledIntoView(scrollbox)) {
        return moveIn(scrollbox);
      } else if (top >= window.innerHeight || bottom <= 0) {
        moveOut(scrollbox)
      }

  }

  window.addEventListener('scroll', debounce(checkSlide));
}

export { blurInit };
