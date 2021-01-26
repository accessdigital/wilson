(function (Drupal) {

  Drupal.behaviors.adaptiveAccordion = {
    attach: function (context, settings) {
      // Process all accordions on the page
      const elements = context.querySelectorAll(".panels");

      Array.prototype.forEach.call(elements, function (el) {
        let activeIndex = null;
        const accordion = el;
        const headings = accordion.querySelectorAll(".panels__title");
        const panels = accordion.querySelectorAll(".panels__panel");
        let tabs = [];

        // Setup a container that may be used to display tabs.
        const tabsContainer = document.createElement('ul');
        tabsContainer.classList.add('panels__tabs');
        tabsContainer.setAttribute('aria-hidden', 'true');
        tabsContainer.setAttribute('role', 'tablist');

        // Cycle through the headings to create tabs and handle click events.
        Array.prototype.forEach.call(headings, function (heading, i) {

          // Create a tab item
          const tabText = document.createTextNode(heading.querySelector("button").innerText);
          const tabLink = document.createElement('button');
          const tabItem = document.createElement('li');
          tabLink.setAttribute("role", "tab");
          tabLink.appendChild(tabText);
          tabs.push(tabLink);
          tabItem.appendChild(tabLink);
          tabsContainer.appendChild(tabItem);

          // Handle clicks on the tab item
          tabLink.addEventListener('click', function (event) {
            event.preventDefault();

            if (i !== activeIndex) {
              hidePanel(activeIndex);
              revealPanel(i);
            }
          });

          // Handle clicks on the accordion headings
          heading.addEventListener('click', function (event) {
            event.preventDefault();

            if (i === activeIndex) {
              hidePanel(i);
              activeIndex = null;
            } else {
              hidePanel(activeIndex);
              revealPanel(i);
            }
          });

        });

        // It the accordion has the modifier class 'accordion--adaptive',
        // setup the accordion headings as tabs to be used as an alternative
        // navigation method at higher breakpoints.
        if (accordion.classList.contains('panels--adaptive')) {
          // Display tabs.
          accordion.prepend(tabsContainer);

          // Update ARIA tags for panels.
          panels.forEach(function(panel) {
            panel.setAttribute('role', 'tabpanel');
          });

          // Trigger callbacks when entering and exiting the tabs view.
          mediaQueryCheck(window.mediaQuery.md, function() {
            // Reveal the first tab if there is no activeIndex set.
            if (activeIndex === null) {
              revealPanel(0);
            }
          }, function() {
            panels.forEach(function(panel) {
              panel.setAttribute('role', 'region');
            });
          });
        }

        function revealPanel(index) {
          headings[index].classList.add('is-active');
          tabs[index].classList.add('is-active');
          panels[index].classList.add('is-active');
          //panels[index].style.maxHeight = panels[index].scrollHeight + "px";
          activeIndex = index;
          panels[index].setAttribute('aria-expanded', 'true');
        }

        function hidePanel(index) {
          if (index !== null) {
            headings[index].classList.remove('is-active');
            tabs[index].classList.remove('is-active');
            panels[index].classList.remove('is-active');
            //panels[index].style.maxHeight = null;
            panels[index].setAttribute('aria-expanded', 'false');
          }
        }
      });

    }
  };

})(Drupal);
