/**
 * @file
 * Global JS.
 *
 * JS that should be included everywhere, for example, menu functionality.
 */

(function (Drupal) {

  Drupal.behaviors.myBehaviour = {
    attach: function (context, settings) {
      // Your code here...
    }
  };

  // Autoplay background videos.
  Drupal.behaviors.backgroundVideos = {
    attach: function (context, settings) {

      // Handle HTML5 videos.
      const html5Videos = context.querySelectorAll('.section-bg-video .video-wrapper video');
      Array.prototype.forEach.call(html5Videos, function (video) {
        video.controls = false;
        video.loop = true;
        video.play();

        video.parentElement.classList.add('opacity-100');
      });

      // Handle Oembed videos.
      const oembedIframes = context.querySelectorAll('.section-bg-video .video-wrapper iframe');
      Array.prototype.forEach.call(oembedIframes, function (iframe) {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        const videoIframes = iframeDocument.querySelectorAll('iframe');

        Array.prototype.forEach.call(videoIframes, function (video) {
          if (video.src.includes("youtube.com")) {
            video.src = video.src + "&autoplay=1&controls=0&mute=1";
          }
          else if (video.src.includes("vimeo.com")) {
            video.src = video.src + "&background=1";
          }
        });

        iframe.parentElement.classList.add('opacity-100');
      });
    }
  };

})(Drupal);
