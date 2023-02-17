/**
 * @file
 * Main menu.
 */
((Drupal, once) => {
  /**
   * Attaches the main menu behaviour.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Set up main menu dropdown and slide out functionality.
   */
  Drupal.behaviors.mainMenu = {
    attach(context) {
      const body = document.querySelector("body");
      const nav = context.querySelector(".navigation nav");
      const topLevelMenu = context.querySelector(".navigation .menu");

      // Initialise the mobile menu. Populate nav with an additional header containing a menu close button.
      // @TODO move mobile header in to template so it's easier override without editing this file.
      once("mobileMenu", "body", context).forEach(() => {
        const menuHeader = document.createElement("div");
        const menuClose = document.createElement("button");
        const menuOpen = document.querySelector(".menu-open");

        menuHeader.classList.add("mobile-header");
        menuClose.classList.add("menu-close", "btn", "btn--secondary");
        menuClose.innerHTML = Drupal.t("Close");
        menuHeader.prepend(menuClose);
        nav.prepend(menuHeader);

        // Menu open links - toggle mobile menu open.
        if (menuOpen) {
          menuOpen.addEventListener("click", () => {
            this.makeActive([body, nav, topLevelMenu]);
            this.makeInactive(nav.querySelectorAll(".menu-item-active"));
            menuOpen.setAttribute("aria-expanded", "true");

            // Set keyboard focus on the first link of the opened menu.
            const firstLink = topLevelMenu.querySelector(
              ".menu-level-0 > li > a"
            );
            firstLink.focus();
          });
        }

        // Menu close links - toggle mobile menu closed.
        menuClose.addEventListener("click", () => {
          this.makeInactive([body, nav, topLevelMenu]);
          this.makeInactive(nav.querySelectorAll(".menu-item-active"));
          menuOpen.setAttribute("aria-expanded", "false");
        });

        // Close the mobile menu when moving up to lg breakpoint.
        mediaQueryCheck(window.mediaQuery.lg, () => {
          menuClose.click();
        }, () => {});

        // Clear any active menus when clicking outside of the navigation.
        document.addEventListener("mouseup", (e) => {
          if (!nav.contains(e.target)) {
            this.makeInactive(context.querySelectorAll(".menu-item-active"));
          }
        });
      });

      // Setup event listeners for the "go back" links shown in mobile menu.
      once("backLinks", ".back-link a", context).forEach((backLink) => {
        const parentWrapper = backLink.closest(".submenu-wrapper");
        const parentMenuLink = parentWrapper.previousElementSibling;

        backLink.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          this.makeInactive([parentWrapper, parentMenuLink]);
        });
      });

      // Setup event listener to toggle the submenu associated with clicking a menu link.
      once("submenuLinks", ".navigation li.has-submenu > a, .navigation li.has-submenu > span", context).forEach((link) => {
        const siblingEl = link.nextElementSibling;
        const parentEl = link.closest("ul");

        link.addEventListener("click", (event) => {
          event.preventDefault();

          if (!link.classList.contains("menu-item-active")) {
            // Remove active state from previously selected links.
            this.makeInactive(parentEl.querySelectorAll(".menu-item-active"));

            this.makeActive([link, siblingEl]);
          } else {
            this.makeInactive([link, siblingEl]);
          }
        });
      });
    },

    // Function to add the active state to an element.
    makeActive(els) {
      Array.prototype.forEach.call(els, (el) => {
        if (el.tagName === 'BODY') {
          el.classList.add("mobile-menu-is-active");
        }
        else {
          el.classList.add("menu-item-active");
          if (
            el.tagName === "A" &&
            el.hasAttribute("aria-expanded") &&
            el.getAttribute("aria-expanded") === "false"
          ) {
            el.setAttribute("aria-expanded", "true");
          }
        }
      });
    },

    // Function to remove the active state from an element.
    makeInactive(els) {
      Array.prototype.forEach.call(els, (el) => {
        if (el.tagName === 'BODY') {
          el.classList.remove("mobile-menu-is-active");
        }
        else {
          el.classList.remove("menu-item-active");
          if (
            el.tagName === "A" &&
            el.hasAttribute("aria-expanded") &&
            el.getAttribute("aria-expanded") === "true"
          ) {
            el.setAttribute("aria-expanded", "false");
          }
        }
      });
    },
  };
})(Drupal, once);
