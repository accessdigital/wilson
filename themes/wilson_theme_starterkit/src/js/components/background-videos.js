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

      // Handle Oembed videos (YouTube or Vimeo).
      // Listen for Oembed iframes loading and then override the inner Video iframe src
      // to trigger autoplaying. Once the inner video has loaded, remove the opacity class
      // so the playing video fades in.
      const oembedIframes = context.querySelectorAll(
        ".section-bg-video .video-wrapper iframe"
      );
      Array.prototype.forEach.call(oembedIframes, (iframe) => {
        iframe.addEventListener("load", () => {
          const iframeDocument =
            iframe.contentDocument || iframe.contentWindow.document;
          const videoIframe = iframeDocument.querySelector("iframe");

          if (videoIframe) {
            if (videoIframe.src.includes("youtube.com")) {
              videoIframe.src = `${videoIframe.src}&autoplay=1&controls=0&mute=1`;
            } else if (videoIframe.src.includes("vimeo.com")) {
              videoIframe.src = `${videoIframe.src}&background=1`;
            }

            // Video backgrounds are transparent by default.
            // Only remove the opacity once the hosted video has loaded.
            // eslint-disable-next-line max-nested-callbacks
            videoIframe.addEventListener("load", () => {
              iframe.parentElement.classList.remove("opacity-0");
            });
          }
        });
      });
    },
  };
})(Drupal);
