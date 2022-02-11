/**
 * @file
 * Tasks in toolbar.
 *
 * Moves the local task tabs from the page to the admin toolbar.
 */

(Drupal => {

  'use strict';

  /**
   * Attaches the local tasks behaviour.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Moves local task tabs to a 'Page actions' link in admin toolbar.
   */
  Drupal.behaviors.tasksInToolbar = {
    attach(context) {
      const editTabs = document.querySelectorAll('.local-tasks-block > ul');

      editTabs.forEach(editTab => {
        const taskItems = editTab.querySelectorAll('li');
        taskItems.forEach(taskItem => {
          taskItem.classList.add('menu-item');
        });

        const toolbarToolsInnerDiv = document.createElement('div');
        toolbarToolsInnerDiv.classList.add('toolbar-menu-tasks');

        const toolbarToolsNav = document.createElement('nav');
        toolbarToolsNav.classList.add('toolbar-lining', 'clearfix');

        const toolbarToolsDiv = document.createElement('div');
        toolbarToolsDiv.classList.add('toolbar-tray', 'toolbar-tray-horizontal');
        toolbarToolsDiv.setAttribute('id', 'toolbar-item-tasks-tray');
        toolbarToolsDiv.setAttribute('data-toolbar-tray', 'toolbar-item-tasks-tray');

        editTab.classList.add('toolbar-menu', 'claro-toolbar-menu');
        toolbarToolsInnerDiv.appendChild(editTab);
        toolbarToolsNav.appendChild(toolbarToolsInnerDiv);
        toolbarToolsDiv.appendChild(toolbarToolsNav);

        const toolbar = context.querySelector('#toolbar-bar');
        const toolbarTab = document.createElement('div');
        toolbarTab.classList.add('toolbar-tab');

        const toolbarLink = document.createElement('a');
        toolbarLink.classList.add('toolbar-icon', 'toolbar-icon-edit', 'trigger', 'toolbar-item');
        toolbarLink.setAttribute('id', 'toolbar-item-tasks');
        toolbarLink.setAttribute('data-toolbar-tray', 'toolbar-item-tasks-tray');
        toolbarLink.setAttribute('role', 'button');
        toolbarLink.innerHTML = Drupal.t('Page Actions');

        toolbarTab.appendChild(toolbarLink);
        toolbarTab.appendChild(toolbarToolsDiv);
        toolbar.prepend(toolbarTab);
      });
    }
  };

})(Drupal);
