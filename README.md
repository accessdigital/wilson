# Wilson

Wilson is the Access in-house installation profile and theme starterkit for Drupal 9. A development kickstarter with a focus on Paragraph-based landing pages.

## Install with Composer

Step 1: Create a project with the Drupal recommended composer profile.

```
composer create-project drupal/recommended-project my-project
```

Step 2: Inform Composer of our Wilson GitHub repo.

```
cd my-project
composer config repositories.wilson vcs https://github.com/accessdigital/wilson
```

Step 3: Change the Composer minimum stability requirement to account for the dev contrib modules we need.

```
composer config minimum-stability dev
```

Step 4: Composer require the Wilson profile (includes the starterkit theme and contrib dependencies).

```
composer require accessdigital/wilson
```

Step 5: Run the Drupal installer and select the `Wilson` profile.

## Theme

The theme ships as a starterkit and must be cloned and renamed for use in a project. See the README file in the `wilson_theme_starterkit` for more information.

However, for demo purposes, you can use the starterkit theme as-is. You must first compile the theme.

```
cd web/profiles/custom/wilson/themes/wilson_theme_starterkit
npm install && gulp build
drush cr
```

## Drupal quick start (optional)

Following the installation and compiling the theme, you can boot up a local version of Drupal + Wilson for testing and evaluating using the in-built Drupal quick start command:

```
cd /path/to/my-project
php ./web/core/scripts/drupal quick-start wilson
```

This requires PHP 7.3+ to be available on the command line of your machine.
