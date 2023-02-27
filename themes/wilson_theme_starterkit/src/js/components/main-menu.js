/**
 * @file
 * Functionality of the response main menu, including mobile navigation with nested layers.
 * See also main-menu.scss, menu--main.html.twig, and block--menu-block--main.html.twig.
 */
((Drupal, once) => {

  let nav;
  let menuOpen;
  let menuClose;
  let mobileMenuIsOpen = false;

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

      // Initialise main menu. Assumes the menu has the class `main-menu`.
      once("mainMenu", ".main-menu", context).forEach((navEl) => {

        nav = navEl;
        menuOpen = document.querySelector(".menu-open");
        menuClose = nav.querySelector(".menu-close");

        // Menu open links - toggle mobile menu overlay.
        if (menuOpen) {
          menuOpen.addEventListener("click", () => {
            if (mobileMenuIsOpen) {
              this.closeMenuOverlay();
            }
            else {
              this.openMenuOverlay();
            }
          });
        }

        // Menu close links - toggle mobile menu closed.
        if (menuClose) {
          menuClose.addEventListener("click", () => {
            if (mobileMenuIsOpen) {
              this.closeMenuOverlay();
            }
          });
        }

        // Close the mobile menu when moving in to the 'lg' breakpoint.
        // This uses the mediaQueryCheck() facility which fires an event when moving in
        // and out of a given breakpoint. See media-query-check.js.
        mediaQueryCheck(window.mediaQuery.md, () => {
          if (mobileMenuIsOpen) {
            this.closeMenuOverlay();
          }
        }, () => {});

        // Clear any active menus when clicking anywhere outside of the navigation.
        // We use closeMenuOverlay() for this, which is a multipurpose function that
        // closes the mobile and desktop overlays.
        document.addEventListener("mouseup", (e) => {
          if (!nav.contains(e.target) && !menuOpen.contains(e.target)) {
            this.closeMenuOverlay();
          }
        });

        // Setup event listener to toggle the submenu associated with clicking a menu link.
        once("submenuLinks", "li.has-submenu > a, li.has-submenu > span", nav).forEach((link) => {
          this.setupExpandLink(link);
        });

        // Setup event listeners for the "go back" links shown in mobile menu.
        once("backLinks", ".back-link a", nav).forEach((backLink) => {
          this.setupBackLink(backLink);
        });
      });
    },

    // Function to open the mobile menu overlay.
    openMenuOverlay() {
      mobileMenuIsOpen = true;
      const body = document.querySelector("body");
      const topLevelMenu = nav.querySelector(".menu");
      this.makeActive([body, nav, topLevelMenu, menuOpen]);

      // Reset to the top level of the menu by closing any previously opened submenus.
      this.makeInactive(nav.querySelectorAll(".is-active"));

      // Set keyboard focus on the first link of the opened menu.
      const firstLink = topLevelMenu.querySelector(
        ".menu-level-0 > li > a"
      );
      if (firstLink) {
        firstLink.focus();
      }
    },

    // Function to close the mobile menu overlay.
    closeMenuOverlay() {
      mobileMenuIsOpen = false;
      const body = document.querySelector("body");
      const topLevelMenu = nav.querySelector(".menu");
      this.makeInactive([body, nav, topLevelMenu, menuOpen]);
      this.makeInactive(nav.querySelectorAll(".is-active"));
    },

    // Function to add the active state to an element.
    makeActive(els) {
      Array.prototype.forEach.call(els, (el) => {
        if (el.tagName === 'BODY') {
          el.classList.add("with-menu-overlay");
        }
        else {
          el.classList.add("is-active");
          if (
            (el.tagName === "A" || el.tagName === "BUTTON") &&
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
          el.classList.remove("with-menu-overlay");
        }
        else {
          el.classList.remove("is-active");
          if (
            (el.tagName === "A" || el.tagName === "BUTTON") &&
            el.hasAttribute("aria-expanded") &&
            el.getAttribute("aria-expanded") === "true"
          ) {
            el.setAttribute("aria-expanded", "false");
          }
        }
      });
    },

    // Function to setup a link to expand a submenu.
    setupExpandLink(link) {
      const siblingEl = link.nextElementSibling;
      const parentEl = link.closest("ul");

      link.addEventListener("click", (event) => {
        event.preventDefault();

        if (!link.classList.contains("is-active")) {
          // Remove active state from previously selected links.
          this.makeInactive(parentEl.querySelectorAll(".is-active"));

          this.makeActive([link, siblingEl]);
        } else {
          this.makeInactive([link, siblingEl]);
        }
      });
    },

    // Function to go setup a back link.
    setupBackLink(backLink) {
      const parentWrapper = backLink.closest(".submenu-wrapper");
      const parentMenuLink = parentWrapper.previousElementSibling;

      backLink.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.makeInactive([parentWrapper, parentMenuLink]);
      });
    }

  };
})(Drupal, once);
