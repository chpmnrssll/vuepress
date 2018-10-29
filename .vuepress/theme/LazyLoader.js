export class LazyLoader {
  constructor (rootMargin = '100%', threshold = 0.006, className = '.lazyLoad') {
    this.options = {
      rootMargin: rootMargin,
      threshold: threshold
    };
    this.className = className;
    this.observer = new window.IntersectionObserver(this.handler, this.options);
    this.watch();
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
    document.querySelectorAll(this.className).forEach(element => {
      this.observer.observe(element);
    });
  }
}
