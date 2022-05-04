/**
 * @file
 * Media query check.
 *
 * A utility that calls a callback function when the window satisfies a given media query.
 *
 * // Usage example
 * mediaQueryCheck(window.mediaQuery.md, function() {
 *   // Run this code when entering the md breakpoint.
 * }, function() {
 *   // Run this code when exiting the md breakpoint.
 * });
 */

// Define any required breakpoints.
window.mediaQuery = {
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
};

window.mediaQueryCheck = (
  mq,
  enterCallback,
  exitCallback = () => {},
  createListener = true
) => {
  if (window.matchMedia(mq).matches) {
    enterCallback();
  } else {
    exitCallback();
  }

  if (createListener) {
    window.matchMedia(mq).addListener(() => {
      window.mediaQueryCheck(mq, enterCallback, exitCallback, false);
    });
  }
};
