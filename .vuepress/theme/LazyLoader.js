export class LazyLoader {
  constructor (rootMargin = '0px', threshold = 0.006, className = '.lazyLoad') {
    this.options = {
      rootMargin: rootMargin,
      threshold: threshold
    };
    this.className = className;
    this.observer = new window.IntersectionObserver(this.handler, this.options);
    this.firstRun = true;
    // this.watch();
  }

  handler (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.tagName.toLowerCase() === 'video') {
          const source = document.createElement('source');
          source.src = entry.target.getAttribute('data-src');
          source.type = 'video/mp4';
          entry.target.appendChild(source);
        } else {
          entry.target.src = entry.target.getAttribute('data-src');
        }
        observer.unobserve(entry.target);
      }
    });
  }

  watch () {
    const that = this;
    document.querySelectorAll(this.className).forEach(element => {
      if (!that.firstRun) {
        console.log(element);
      }
      this.observer.observe(element);
    });
    if (this.firstRun) {
      this.firstRun = false;
    }
  }
}
