export function autoplay (className) {
  document.querySelectorAll(className).forEach(video => {
    if (video.tagName.toLowerCase() !== 'video') return

    // loop
    video.addEventListener('ended', function () {
      this.currentTime = 0;
      this.play().catch(err => { return });
    }, false);

    // autoplay
    video.currentTime = 0;
    video.play().catch(err => { return });
  });
}
