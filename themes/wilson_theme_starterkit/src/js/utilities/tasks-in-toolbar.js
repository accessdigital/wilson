/**
 * @file
 * Create a toolbar menu from the local task tabs (i.e. view/edit/revisions) in the current page.
 */
((Drupal, once) => {

  /**
   * Attaches the Tasks in Toolbar behaviour.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attach the behaviour.
   */
  Drupal.behaviors.tasksInToolbar = {
    attach(context) {

      // Determine if the current context contains the local task tabs, and if there is a toolbar to work with.
      const localTasksEl = once("localTasks", ".local-tasks-block > ul", context).shift();
      const toolbarEl = document.querySelector("#toolbar-bar");

      if (toolbarEl && localTasksEl) {
        const taskItems = localTasksEl.querySelectorAll("li");
        taskItems.forEach((taskItem) => {
          taskItem.classList.add("menu-item");
        });

        // Programmatically create a toolbar menu to insert the local tasks in to.
        const toolbarToolsInnerDiv = document.createElement("div");
        toolbarToolsInnerDiv.classList.add("toolbar-menu-tasks");
        const toolbarToolsNav = document.createElement("nav");
        toolbarToolsNav.classList.add("toolbar-lining", "clearfix");
        const toolbarToolsDiv = document.createElement("div");
        toolbarToolsDiv.classList.add(
          "toolbar-tray",
          "toolbar-tray-horizontal"
        );
        toolbarToolsDiv.setAttribute("id", "toolbar-item-tasks-tray");
        toolbarToolsDiv.setAttribute(
          "data-toolbar-tray",
          "toolbar-item-tasks-tray"
        );
        localTasksEl.classList.add("toolbar-menu");
        toolbarToolsInnerDiv.appendChild(localTasksEl);
        toolbarToolsNav.appendChild(toolbarToolsInnerDiv);
        toolbarToolsDiv.appendChild(toolbarToolsNav);

        // Programmatically create a toolbar tab to attach the menu to.
        const toolbarTab = document.createElement("div");
        toolbarTab.classList.add("toolbar-tab");
        const toolbarLink = document.createElement("a");
        toolbarLink.classList.add(
          "toolbar-icon",
          "toolbar-icon-edit",
          "trigger",
          "toolbar-item"
        );
        toolbarLink.setAttribute("id", "toolbar-item-tasks");
        toolbarLink.setAttribute(
          "data-toolbar-tray",
          "toolbar-item-tasks-tray"
        );
        toolbarLink.setAttribute("role", "button");
        toolbarLink.innerHTML = Drupal.t("Page Actions");
        toolbarTab.appendChild(toolbarLink);
        toolbarTab.appendChild(toolbarToolsDiv);

        // Insert the generated tab and menu in to the admin toolbar.
        toolbarEl.prepend(toolbarTab);
      }
    },
  };
})(Drupal, once);
