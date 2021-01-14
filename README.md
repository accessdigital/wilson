# Wilson

A Drupal 9 installation profile. Wilson includes:

* Commonly required modules
* Content types:
  * Landing page
  * Basic page
* Starter paragraph bundles:-
  * Hero
  * One column text
  * Two columns text
  * Three columns text
  * Text + media columns
  * Quote text
  * Content slider
  * Content grid
  * Button grid
  * Tabs
  * Accordion
  * Image/video gallery
  * Simple banner
  * Text + media panel
  * Text panel over image
  * Webform embed
  * Text + webform embed columns
  * Logo wall
  * Google map
* Paragraph editor enhancements
* Media bundles and image formats
* Common installation settings and security considerations

## Include with Composer

Add a reference to the Wilson GitHub repo to the `respositories` section of your Drupal 9 composer file:

```
"repositories": [
    {
        "type": "composer",
        "url": "https://packages.drupal.org/8"
    },
    {
        "type": "vcs",
        "url": "https://github.com/accessdigital/wilson"
    },
    {
        "type": "vcs",
        "url": "https://github.com/accessdigital/wilson_theme_starterkit"
    }
]
```

Require the Wilson profile in to your project:

```
composer require accessdigital/wilson
```

Require the Wilson Theme Starterkit in to your project:

```
composer require accessdigital/wilson_theme_starterkit
```

Select the Wilson profile when installing Drupal.

## Drupal quick start

Boot up a local version of Drupal + Wilson for testing and evaluating:

```
php ./docroot/core/scripts/drupal quick-start wilson
```

This requires PHP 7.3+ on the host machine.
