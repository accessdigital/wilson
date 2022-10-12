/**
 * @file
 * Jump nav behaviour.
 */
((Drupal, once) => {
  // Globally store the detected anchor points.
  let anchors = [];

  let resizeTimer;

  /**
   * Attaches the Jump nav behaviour.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Jump nav scroll and active item behaviour.
   */
  Drupal.behaviors.jumpNav = {
    attach(context) {
      once("jumpNav", ".jump-nav", context).forEach((jumpNavEl) => {
        // Watch for the jump-nav becoming sticky.
        this.detectSticky(jumpNavEl);

        // Use a smooth scrolling action when jumping to an anchor point.
        const jumpLinks = jumpNavEl.querySelectorAll('a[href^="#"]');
        jumpLinks.forEach((link) => {
          this.smoothScroll(link);
        });
      });

      // Attach event listeners only on the initial page load.
      if (context === document) {
        // Attach a listener to detect if any anchor points are active.
        document.addEventListener("scroll", () => {
          this.handleScroll();
        });

        // Attach a debounced resize listener to reset the position of the anchor
        // points and to re-check if any are now active.
        window.addEventListener("resize", () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            this.initAnchors();
          }, 500);
        });
      }

      // Fonts and images loading in can cause a page reflow so wait until window load event
      // is triggered before getting anchor positions.
      window.addEventListener("load", () => {
        this.initAnchors();
      });

      // Allow other behaviours to trigger a 'redraw' event to trigger a recalculation of
      // anchor positions.
      window.addEventListener("redraw", () => {
        this.initAnchors();
      });
    },
    // Add a `is-sticky` class when a `position: sticky` element becomes sticky.
    // Requires the element to have `top: -1px`.
    detectSticky(stickyEl) {
      const observer = new IntersectionObserver(
        ([el]) => {
          el.target.classList.toggle("is-sticky", el.intersectionRatio < 1);
          this.initAnchors();
        },
        { threshold: [1] }
      );
      observer.observe(stickyEl);
    },
    // Animate the scrolling to an on-page link target.
    smoothScroll(linkEl) {
      linkEl.addEventListener("click", (e) => {
        e.preventDefault();

        document.querySelector(linkEl.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      });
    },
    // Find all the anchor points on the page and store their position.
    initAnchors() {
      anchors = [];
      document.querySelectorAll(".anchor-point").forEach((anchorEl) => {
        anchors.push({
          top: anchorEl.offsetTop,
          hash: `#${anchorEl.getAttribute("id")}`,
          el: anchorEl,
        });
      });

      // Check if any anchor points should be made active.
      this.handleScroll();
    },
    // Handle making jump-nav links active when anchors come in to view.
    handleScroll() {
      const scrollPos = document.documentElement.scrollTop + 1;

      // Remove the `is-active` class from previous active jump-nav links.
      document.querySelectorAll(".jump-nav a.is-active").forEach((el) => {
        el.classList.remove("is-active");
      });

      for (let i = 0; i < anchors.length; i++) {
        // Add `is-active` class to the relevant jump-nav links if the scroll
        // position has passed the anchor and not yet reached the next anchor.
        // TODO: Find a way to horizontally scroll to the active jump-nav item.
        if (
          scrollPos >= anchors[i].top &&
          (anchors[i + 1] === undefined || scrollPos < anchors[i + 1].top)
        ) {
          document
            .querySelectorAll(`.jump-nav a[href="${anchors[i].hash}"]`)
            .forEach((el) => {
              el.classList.add("is-active");
            });
          break;
        }
      }
    },
  };
})(Drupal, once);
