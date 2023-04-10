/**
 * @file
 * Anchor point hash generation.
 */
((Drupal, once) => {
  /**
   * Attaches the Anchor point hash behaviour.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Display the hash value of the Anchor point label while editing the paragraph.
   */
  Drupal.behaviors.anchorPointHash = {
    attach(context) {
      once('anchorPointHash', 'input.anchor-point-hash', context).forEach( (el) => {
        // Create an element to display the 'hash'.
        const suffix = document.createElement("span");
        suffix.classList.add('form-item__suffix');
        el.after(suffix)

        // Set the initial 'hash' from the label field value.
        this.updateHash(suffix, el.value);

        // When the label field is edited, update the 'hash'.
        el.addEventListener('keyup', () => this.updateHash(suffix, el.value));
      });
    },
    updateHash(suffix, value) {
      const hashedValue = value.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
      suffix.innerHTML = hashedValue ? '<small>' + Drupal.t('URL hash: <strong>#!hash</strong>', { '!hash': hashedValue }) + '</small>' : '';
    },
  };
})(Drupal, once);
