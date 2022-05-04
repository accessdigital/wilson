/**
 * @file
 * Main menu.
 */
((Drupal) => {
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
      // Only progress if there is a menu element to work with.
      if (context.querySelector('.navigation nav .menu')) {
        const body = context.querySelector('body');
        const nav = context.querySelector('.navigation nav');
        const topLevelMenu = context.querySelector('.navigation .menu');
        const topLevelSubmenuLinks = context.querySelectorAll('.navigation .menu > li.has-submenu > a, .navigation .menu > li.has-submenu > span');
        const submenuLinks = context.querySelectorAll('.navigation li.has-submenu > a, .navigation li.has-submenu > span');
        const backLinks = context.querySelectorAll('.back-link a');

        // Remove active state from active menu links.
        const removeActiveLink = (activeLinks) => {
          Array.prototype.forEach.call(activeLinks, (activeLink) => {
            activeLink.classList.remove('menu-item-active');
            if (activeLink.hasAttribute('aria-expanded') && activeLink.getAttribute('aria-expanded') === 'true') {
              activeLink.setAttribute('aria-expanded', 'false');
            }
          });
        };

        // Setup event listeners for back links.
        Array.prototype.forEach.call(backLinks, (backLink) => {
          const parentWrapper = backLink.closest('.submenu-wrapper');
          const parentMenuLink = parentWrapper.previousElementSibling;

          backLink.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            parentWrapper.classList.remove('menu-item-active');
            parentMenuLink.setAttribute('aria-expanded', 'false');
          });
        });

        Array.prototype.forEach.call(submenuLinks, (link) => {
          const siblingEl = link.nextElementSibling;
          const parentEl = link.closest('ul');

          /*
           * Create event listener to set the submenu as active when the
           * corresponding link is clicked.
           */
          link.addEventListener('click', (event) => {
            event.preventDefault();

            const activeMenuItems = parentEl.querySelectorAll('.menu-item-active');
            if (!link.classList.contains('menu-item-active')) {
              // Remove active state from previously selected links.
              if (activeMenuItems) {
                removeActiveLink(activeMenuItems);
              }
              // Set the clicked link's submenu to active.
              link.classList.add('menu-item-active');
              link.setAttribute('aria-expanded', 'true');
              siblingEl.classList.add('menu-item-active');
            } else {
              link.classList.remove('menu-item-active');
              link.setAttribute('aria-expanded', 'false');
              siblingEl.classList.remove('menu-item-active');
            }
          });
        });

        // Add event listener to top level items with submenus.
        Array.prototype.forEach.call(topLevelSubmenuLinks, (link) => {
          // Check for top submenus in the top level menu.
          const topLevelMenuWrapper = link.nextElementSibling;
          const submenus = topLevelMenuWrapper.querySelectorAll('.submenu-wrapper > .menu-level-2');

          if (submenus.length === 0) {
            topLevelMenuWrapper.firstElementChild.classList.add('no-submenus');
          }

          link.addEventListener('click', () => {
            const activeSubmenus = topLevelMenuWrapper.querySelectorAll('.menu-item-active');

            // Set the child submenus to inactive.
            if (activeSubmenus.length > 1) {
              removeActiveLink(activeSubmenus);
            }

            body.classList.toggle('menu-active');
          });
        });

        // Setup mobile header.
        const menuHeader = document.createElement('div');
        const menuClose = document.createElement('button');
        const menuOpen = document.querySelector('.menu-open');

        menuHeader.classList.add('mobile-header');
        menuClose.classList.add('menu-close', 'btn', 'btn--secondary');
        menuClose.innerHTML = Drupal.t('Close');
        menuHeader.prepend(menuClose);
        nav.prepend(menuHeader);

        menuClose.addEventListener('click', () => {
          const activeMenuItems = document.querySelectorAll('.menu-item-active');
          body.classList.remove('mobile-menu-is-active');
          nav.classList.remove('menu-item-active');
          topLevelMenu.classList.remove('menu-item-active');
          menuOpen.setAttribute('aria-expanded', 'false');

          if (activeMenuItems) {
            removeActiveLink(activeMenuItems);
          }
        });

        // Create event listener for menu toggle icon.
        if (menuOpen) {
          menuOpen.addEventListener('click', () => {
            const activeMenuItems = document.querySelectorAll('.menu-item-active');
            const firstLink = topLevelMenu.querySelector('.menu-level-0 > li > a');

            body.classList.add('mobile-menu-is-active');
            nav.classList.add('menu-item-active');
            topLevelMenu.classList.add('menu-item-active');
            menuOpen.setAttribute('aria-expanded', 'true');
            firstLink.focus();

            // Remove active class on any submenus when the menu is toggled.
            if (activeMenuItems) {
              removeActiveLink(activeMenuItems);
            }
          });
        }

        // Clear any active menus when clicking outside of the navigation.
        document.addEventListener('mouseup', (e) => {
          if (!nav.contains(e.target)) {
            const activeMenuItems = context.querySelectorAll('.menu-item-active');
            if (activeMenuItems) {
              removeActiveLink(activeMenuItems);
            }
          }
        });
      }
    },
  };
})(Drupal);
