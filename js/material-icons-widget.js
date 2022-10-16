/**
 * @file
 * Preview the selected Material Icons icon.
 */
(($, Drupal, once) => {
  /**
   * Attaches the Material Icons widget behaviour.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Display the selected icon next to a Material Icons field widget.
   */
  Drupal.behaviors.materialIconsWidget = {
    attach(context) {
      const materialIconsWidget = this;
      once('materialIconsWidget', 'input.material-icons-widget', context).forEach((el) => {
        // Determine the value of the Icon Style field.
        const miStyleSelector = el.name.replace(new RegExp(/\[icon\]$/), '[family]');
        const miStyleEl = context.querySelector(`[name="${miStyleSelector}"]`);

        // Create an element to display the icon preview.
        const suffix = document.createElement("span");
        suffix.classList.add('form-item__suffix');
        el.after(suffix);

        // Set the initial icon preview from the field value.
        materialIconsWidget.updateIcon(suffix, el.value, styleEl.value);

        // Respond to changes on the jQuery UI autocomplete element.
        const $el = $(el);
        $el.on('input autocompleteselect', function (event, node) {
          const value = node ? node.item.value : el.value;
          materialIconsWidget.updateIcon(suffix, value, miStyleEl.value);
        });

        // Respond to changes on the Icon Style select field.
        miStyleEl.addEventListener('change', () => materialIconsWidget.updateIcon(suffix, el.value, miStyleEl.value));
      });
    },
    updateIcon(suffix, value, miStyle) {
      // Render the icon preview.
      suffix.innerHTML = value ? `<i class="mi-selected-icon material-icons-${miStyle}">` + value + '</i>' : '';
    },
  };
})(jQuery, Drupal, once);
