/**
 * @file
 * Functionality of the response main menu, including mobile navigation with nested layers.
 * See also main-menu.scss, menu--main.html.twig, and block--menu-block--main.html.twig.
 */
((Drupal, once) => {

  let nav;
  let menuOpen;
  let menuClose;

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

        // Menu open links - toggle mobile menu open.
        if (menuOpen) {
          menuOpen.addEventListener("click", () => {
            this.openMenuOverlay();
          });
        }

        // Menu close links - toggle mobile menu closed.
        if (menuClose) {
          menuClose.addEventListener("click", () => {
            this.closeMenuOverlay();
          });
        }

        // Close the mobile menu when moving up to lg breakpoint.
        mediaQueryCheck(window.mediaQuery.lg, () => {
          this.closeMenuOverlay();
        }, () => {});

        // Clear any active menus when clicking outside of the navigation.
        document.addEventListener("mouseup", (e) => {
          if (!nav.contains(e.target)) {
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
      const body = document.querySelector("body");
      const topLevelMenu = nav.querySelector(".menu");
      this.makeActive([body, nav, topLevelMenu]);
      this.makeInactive(nav.querySelectorAll(".menu-item-active"));
      menuOpen.setAttribute("aria-expanded", "true");

      // Set keyboard focus on the first link of the opened menu.
      const firstLink = topLevelMenu.querySelector(
        ".menu-level-0 > li > a"
      );
      firstLink.focus();
    },

    // Function to close the mobile menu overlay.
    closeMenuOverlay() {
      const body = document.querySelector("body");
      const topLevelMenu = nav.querySelector(".menu");
      this.makeInactive([body, nav, topLevelMenu]);
      this.makeInactive(nav.querySelectorAll(".menu-item-active"));
      menuOpen.setAttribute("aria-expanded", "false");
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

    // Function to setup a link to expand a submenu.
    setupExpandLink(link) {
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
