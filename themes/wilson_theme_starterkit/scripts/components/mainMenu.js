/**
 * @file
 * Main menu.
 */
(Drupal => {

  'use strict';

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
      if (!!context.querySelector('.navigation nav .menu')) {
        const body = context.querySelector('body');
        const nav = context.querySelector('.navigation nav');
        const topLevelMenu = context.querySelector('.navigation .menu');
        const topLevelSubmenuLinks = context.querySelectorAll('.navigation .menu > li.has-submenu > a, .navigation .menu > li.has-submenu > span');
        const submenuLinks = context.querySelectorAll('.navigation li.has-submenu > a, .navigation li.has-submenu > span');
        const backLinks = context.querySelectorAll('.back-link a');

        // Setup event listeners for back links.
        Array.prototype.forEach.call(backLinks, backLink => {
          const parentWrapper = backLink.closest('.submenu-wrapper');
          const parentMenu = backLink.parentElement;

          backLink.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();

            parentWrapper.classList.remove('menu-item-active');
            parentMenu.setAttribute('aria-expanded', 'false');
          });
        });

        Array.prototype.forEach.call(submenuLinks, link => {
          const siblingEl = link.nextElementSibling;
          const parentEl = link.closest('ul');

          /*
           * Create event listener to set the submenu as active when the
           * corresponding link is clicked.
           */
          link.addEventListener('click', event => {
            event.preventDefault();

            if (!link.classList.contains('menu-item-active')) {
              const activeLinks = parentEl.querySelectorAll('.menu-item-active');

              Array.prototype.forEach.call(activeLinks, activeLink => {
                activeLink.classList.remove('menu-item-active');
              });
            }

            // Set the clicked link's submenu to active.
            link.classList.toggle('menu-item-active');
            siblingEl.classList.toggle('menu-item-active');
            siblingEl.setAttribute('aria-expanded', 'true');
            parentEl.setAttribute('aria-expanded', 'false');
          });
        });

        // Add event listener to top level items with submenus.
        Array.prototype.forEach.call(topLevelSubmenuLinks, link => {
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
              Array.prototype.forEach.call(activeSubmenus, activeSubmenu => {
                activeSubmenu.classList.remove('menu-item-active');
              });
            }

            body.classList.toggle('menu-active');
          });
        });

        // Setup mobile header.
        const menuHeader = document.createElement('div');
        const menuClose = document.createElement('button');

        menuHeader.classList.add('mobile-header');
        menuClose.classList.add('menu-close', 'btn', 'btn--secondary');
        menuClose.innerHTML = Drupal.t('Close');
        menuHeader.prepend(menuClose);
        nav.prepend(menuHeader);

        menuClose.addEventListener('click', () => {
          body.classList.remove('mobile-menu-is-active');
          nav.classList.remove('menu-item-active');
          topLevelMenu.classList.remove('menu-item-active');
          topLevelMenu.setAttribute('aria-expanded', 'false');
        });

        // Create event listener for menu toggle icon.
        const menuOpen = document.querySelector('.menu-open');

        if (!!menuOpen) {
          menuOpen.addEventListener('click', () => {
            const activeMenus = document.querySelectorAll('.menu-item-active');
            const firstLink = topLevelMenu.querySelector('.menu-level-0 > li > a');

            body.classList.add('mobile-menu-is-active');
            nav.classList.add('menu-item-active');
            topLevelMenu.classList.add('menu-item-active');
            topLevelMenu.setAttribute('aria-expanded', 'true');
            firstLink.focus();

            // Remove active class on any submenus when the menu is toggled.
            if (activeMenus.length > 0) {
              activeMenus.forEach((activeMenu) => {
                activeMenu.classList.remove('menu-item-active');
                activeMenu.setAttribute('aria-expanded', 'false');
              });
            }
          });
        }

        // Clear any active menus when clicking outside of the navigation.
        document.addEventListener('mouseup', e => {
          if (!nav.contains(e.target)) {
            const activeItems = context.querySelectorAll('.menu-item-active');
            Array.prototype.forEach.call(activeItems, activeItem => {
              activeItem.classList.remove('menu-item-active');
            });
          }
        });
      }
    }
  };

})(Drupal);
