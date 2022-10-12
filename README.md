# [Wilson](https://accessdigital.atlassian.net/wiki/spaces/AD/pages/2165506589/Wilson+Documentation)

Wilson is the **Access** in-house installation profile and theme starterkit for Drupal 9. A development kickstarter with a focus on Paragraph-based landing pages.

## Installation

See the [Wilson installation guide](https://accessdigital.atlassian.net/wiki/spaces/AD/pages/2220916744/Installation+steps) on Confluence.

## Patches

Due a restriction in the Composer Patches package, it is not possible to apply patches to Drupal Core from the Wilson composer file. Consider adding the following patches to your project Composer file (via [cweagans/composer-patches](https://github.com/cweagans/composer-patches)) if you encounter the relevant problem:-

### 1. Responsive image dimensions (affects animation effects and jump nav)

Drupal's responsive images tag doesn't include image dimensions, which means browsers struggle to handle lazy loading images and calculating the true position of elements. This manifests in faulty behaviour of component animation effects and incorrectly handled jump nav links.

Applying [this patch](https://www.drupal.org/files/issues/2022-10-10/3192234-241-9.5.x_1.patch) from [this issue](https://www.drupal.org/project/drupal/issues/3192234#comment-14726096) seems to solve the problem.
