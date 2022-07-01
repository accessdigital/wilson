/**
 * @file
 * Animate on scoll initialiser.
 * See https://github.com/michalsnik/aos
 */
((Drupal) => {
  /**
   * Attaches the Animate on Scoll (AOS) initialiser.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches the Animate on Scoll (AOS) initialiser.
   */
  Drupal.behaviors.aos = {
    attach() {
      if (typeof AOS !== "undefined") {
        // eslint-disable-next-line no-undef
        AOS.init({
          duration: 600
          // See https://github.com/michalsnik/aos#1-initialize-aos for possible global AOS options.
        });
      }
    },
  };
})(Drupal);
