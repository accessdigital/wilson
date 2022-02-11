/**
 * @file
 * Slider.
 */
(Drupal => {

  'use strict';

  /**
   * Attaches the slider behaviour.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Set up carousel functionality using Glide slider.
   */

  Drupal.behaviors.slider = {
    attach() {
      const sliderCarousels = document.querySelectorAll('.carousel--slider');

      sliderCarousels.forEach((sliderCarousel) => {
        const carousel = sliderCarousel.querySelector('.glide');
        const carouselImages = carousel.querySelectorAll('img');

        // Images with lazy load means that JS can't automatically calculate
        // the maximum height of all images before rendering the carousel.
        // To avoid carousel height jumping, optionally, force the images
        // to load before building the gallery. Uncomment to use.
        carouselImages.forEach(image => {
          image.removeAttribute('loading');
        });

        let glide = new Glide(carousel, {
          type: 'slider',
          perView: 3,
          gap: 40,
          bound: true,
          breakpoints: {
            1024: {
              perView: 2
            },
            640: {
              perView: 1
            },
          }
        });

        // Remove the lazy load attribute from the next image in the gallery.
        // If the next image is a different aspect ratio, the carousel size
        // may jump.
        // glide.on('move.after', function() {
        //   const nextIndex = glide.index + 1;
        //
        //   if (!!carouselImages[nextIndex] && carouselImages[nextIndex].hasAttribute('loading')) {
        //     carouselImages[nextIndex].removeAttribute('loading');
        //   }
        // });

        glide.mount();
      });
    }
  };

})(Drupal);
