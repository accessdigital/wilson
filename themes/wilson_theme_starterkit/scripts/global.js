/**
 * @file
 * Global JS.
 *
 * JS that should be included everywhere and can't be attached to a specific
 * component.
 */

((Drupal) => {
  /**
   * Attaches the global JS behaviour.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   **TBC: Specific description of this attach function goes here.**
   */
  Drupal.behaviors.globalJS = {
    attach() {
      // Your code here...
    },
  };
})(Drupal);
