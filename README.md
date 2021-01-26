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
* A starterkit theme which can be customised to the client's needs
* A module to override minor parts of the Claro admin theme

## Include with Composer

Add references to the Wilson GitHub repos to the `respositories` section of your Drupal 9 composer file:

```
"repositories": [
    {
        "type": "composer",
        "url": "https://packages.drupal.org/8"
    },
    {
        "type": "vcs",
        "url": "https://github.com/accessdigital/wilson"
    }
]
```

Some of the contrib packaged required by Wilson are dev or release candidates. Your project composer.json file will need to allow for this in its `minimum-stability` setting:

```
"minimum-stability": "dev",
```

To include Wilson, its theme and admin overrides packages in your project, run:

```
composer require accessdigital/wilson
```

The Wilson profile will then include all of its contrib dependencies.

During Drupal installation, select the `Wilson` profile.

## Drupal quick start

Boot up a local version of Drupal + Wilson for testing and evaluating:

```
php ./docroot/core/scripts/drupal quick-start wilson
```

This requires PHP 7.3+ on the host machine.
