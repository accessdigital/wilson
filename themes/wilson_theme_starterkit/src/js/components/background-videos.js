/**
 * @file
 * Background videos.
 */

((Drupal) => {
  /**
   * Attaches the background video behaviour.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Sets relevant attributes for background videos.
   */
  // Autoplay background videos.
  Drupal.behaviors.backgroundVideos = {
    attach(context) {
      // Handle HTML5 videos.
      const html5Videos = context.querySelectorAll(
        ".section-bg-video .video-wrapper video"
      );
      Array.prototype.forEach.call(html5Videos, (video) => {
        video.controls = false;
        video.loop = true;
        video.play();

        video.parentElement.classList.remove("opacity-0");
      });

      // Handle Oembed videos.
      const oembedIframes = context.querySelectorAll(
        ".section-bg-video .video-wrapper iframe"
      );
      Array.prototype.forEach.call(oembedIframes, (iframe) => {
        const iframeDocument =
          iframe.contentDocument || iframe.contentWindow.document;
        const videoIframes = iframeDocument.querySelectorAll("iframe");

        Array.prototype.forEach.call(videoIframes, (video) => {
          if (video.src.includes("youtube.com")) {
            video.src = `${video.src}&autoplay=1&controls=0&mute=1`;
          } else if (video.src.includes("vimeo.com")) {
            video.src = `${video.src}&background=1`;
          }
        });

        iframe.parentElement.classList.remove("opacity-0");
      });
    },
  };
})(Drupal);
