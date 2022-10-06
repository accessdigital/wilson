/**
 * @file
 * Gallery.
 */

((Drupal) => {
  /**
   * Attaches the gallery behaviour.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Set up gallery using Glide slider.
   */
  Drupal.behaviors.gallery = {
    attach() {
      const galleryCarousels = document.querySelectorAll(".carousel--gallery");

      galleryCarousels.forEach((galleryCarousel) => {
        const carousel = galleryCarousel.querySelector(".glide");
        const carouselImages =
          galleryCarousel.querySelectorAll(".glide__slide img");

        // Don't mount a gallery if there's no slider or images.
        if (!carousel || !carouselImages) {
          return;
        }

        // Images with lazy load means that JS can't automatically calculate
        // the maximum height of all images before rendering the carousel.
        // To avoid carousel height jumping, optionally, force the images
        // to load before building the gallery. Uncomment to use.
        // carouselImages.forEach(function(image) {
        //  image.removeAttribute('loading');
        // });

        const glide = new window.Glide(carousel, {
          type: "slider",
          perView: 1,
          classes: {
            nav: {
              active: "bg-current",
            },
          },
        });

        // Remove the lazy load attribute from the next image in the gallery.
        // If the next image is a different aspect ratio, the carousel size
        // may jump.
        glide.on("move.after", () => {
          const nextIndex = glide.index + 1;

          if (
            !!carouselImages[nextIndex] &&
            carouselImages[nextIndex].hasAttribute("loading")
          ) {
            carouselImages[nextIndex].removeAttribute("loading");
          }
        });

        glide.mount();
      });
    },
  };
})(Drupal);
