/**
 * @file
 * Animate numeric statistics.
 * See https://inorganik.github.io/countUp.js/
 */
((Drupal, once) => {

  /**
   * Statistics
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   */
  Drupal.behaviors.statistics = {
    attach(context) {
      once('statistics', '.countup', context).forEach( (countUpEl) => {
        // Count the number of decimal places in the provided value to be
        // passed as an argument in to CountUp.js.
        const countDecimals = (numberStr) => {
          const split = numberStr.split('.');
          if (split[1]) {
            return split[1].length;
          }
          return 0;
        }

        // Determine a numeric value from the .countup element.
        // Thousand separators are removed to allow the number to be parsed to
        // a float.
        const valueStr = countUpEl.innerHTML;
        const valueFloat = parseFloat(valueStr.replace(/,/g, ''));

        // We can only animate numeric values.
        if (!Number.isNaN(valueFloat)) {
          // CountUp.js options - see https://github.com/inorganik/countUp.js#usage
          const options = {
            enableScrollSpy: true,
            decimalPlaces: countDecimals(valueStr),
            useGrouping: valueStr.includes(','),
            duration: 3
          };

          // Attach animation to the value.
          const numAnim = new countUp.CountUp(countUpEl, valueFloat, options);
          numAnim.start();
        }
      });
    },
  };
})(Drupal, once);
