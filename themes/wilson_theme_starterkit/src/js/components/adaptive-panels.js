/**
 * @file
 * Adaptive panels.
 */

((Drupal) => {
  /**
   * Attaches the adaptive panels behaviour.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Converts panels into collapsible accordions and tabs.
   */
  Drupal.behaviors.adaptiveAccordion = {
    attach(context) {
      // Process all accordions on the page.
      const elements = context.querySelectorAll(".panels");

      Array.prototype.forEach.call(elements, (el) => {
        let activeIndex = null;
        const accordion = el;
        const headings = accordion.querySelectorAll(".panels__title");
        const buttons = accordion.querySelectorAll(".panels__button");
        const panels = accordion.querySelectorAll(".panels__panel");
        const tabs = [];

        // Set up a container that will be used to display tab list.
        const tabsContainer = document.createElement("div");
        tabsContainer.classList.add("panels__tabs");

        // Set up a list that will be used to display tabs.
        const tabsList = document.createElement("ul");
        tabsList.classList.add("panels__tabs-list");
        tabsList.setAttribute("role", "tablist");

        const revealPanel = (index) => {
          headings[index].classList.add("is-active");
          tabs[index].classList.add("is-active");
          tabs[index].setAttribute("aria-selected", "true");
          tabs[index].removeAttribute('tabindex');
          panels[index].classList.add("is-active");
          activeIndex = index;
          buttons[index].setAttribute("aria-expanded", "true");
        };

        const hidePanel = (index) => {
          if (index !== null) {
            headings[index].classList.remove("is-active");
            tabs[index].classList.remove("is-active");
            tabs[index].setAttribute("aria-selected", "false");
            tabs[index].tabIndex = -1;
            panels[index].classList.remove("is-active");
            buttons[index].setAttribute("aria-expanded", "false");
          }
        };

        // Cycle through the headings to create tabs and handle click events.
        Array.prototype.forEach.call(headings, (heading, i) => {
          // Create a tab item.
          const tabText = document.createTextNode(buttons[i].innerText);
          const tabLink = document.createElement("button");
          const tabItem = document.createElement("li");
          const tabContentID = buttons[i].getAttribute('aria-controls');
          tabLink.setAttribute("role", "tab");
          tabLink.setAttribute("aria-selected", "false");
          tabLink.setAttribute("aria-controls", tabContentID);
          tabLink.tabIndex = -1;
          tabLink.appendChild(tabText);
          tabs.push(tabLink);
          tabItem.appendChild(tabLink);
          tabsList.appendChild(tabItem);

          // Select a tab.
          const setSelectedTab = (index) => {
            tabs[index].click();
            tabs[index].focus();
          };

          // Handle keypress of the tab item - left / right key navigation.
          tabLink.addEventListener("keydown", (event) => {
            const firstTab = 0;
            const lastTab = tabs.length - 1;
            switch (event.key) {
              case 'ArrowRight':
                // Select first tab in tab list if user tries to move right
                // beyond the final tab.
                if (activeIndex === lastTab) {
                  setSelectedTab(firstTab);
                  // Otherwise, select next tab.
                } else {
                  setSelectedTab(activeIndex + 1);
                }
                break;

              case 'ArrowLeft':
                // Select final tab in tab list if user tries to move left
                // beyond the first tab.
                if (activeIndex === firstTab) {
                  setSelectedTab(lastTab);
                  // Otherwise, select previous tab.
                } else {
                  setSelectedTab(activeIndex - 1);
                }
                break;

              default:
                break;
            }
          });

          // Handle clicks on the tab item.
          tabLink.addEventListener("click", (event) => {
            event.preventDefault();

            if (i !== activeIndex) {
              hidePanel(activeIndex);
              revealPanel(i);
            }
          });

          // Handle clicks on the accordion headings.
          heading.addEventListener("click", (event) => {
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
        if (accordion.classList.contains("panels--adaptive")) {
          // Display tabs.
          tabsContainer.prepend(tabsList);
          accordion.prepend(tabsContainer);

          // Update ARIA tags for panels.
          panels.forEach((panel) => {
            panel.setAttribute("role", "tabpanel");
          });

          // Trigger callbacks when entering and exiting the tabs view.
          window.mediaQueryCheck(
            window.mediaQuery.md,
            () => {
              // Reveal the first tab if there is no activeIndex set.
              if (activeIndex === null) {
                revealPanel(0);
              }
            },
            () => {
              panels.forEach((panel) => {
                panel.setAttribute("role", "region");
              });
            }
          );
        }
      });
    },
  };
})(Drupal);
