# Wilson

Wilson is the Access in-house installation profile and theme starterkit for Drupal 9. A development kickstarter with a focus on Paragraph-based landing pages.

## Install with Composer

**Step 1:** Create a project with the Drupal recommended composer profile.

```bash
composer create-project drupal/recommended-project my-project
```

**Step 2:** Inform Composer of our Wilson GitHub repo.

```bash
cd my-project
composer config repositories.wilson vcs https://github.com/accessdigital/wilson
```

**Step 3:** Change the Composer minimum stability requirement to account for the dev contrib modules we need.

```bash
composer config minimum-stability dev
```

**Step 4:** Composer require the Wilson profile (includes the starterkit theme and contrib dependencies).

```bash
composer require accessdigital/wilson
```
**Step 5:** Setup your project to use a DDEV virtual environment (recommended).

```bash
ddev config --project-type=drupal9 --docroot=web --project-name=my_project --http-port=88
ddev start
ddev launch
```

**Step 6:** Run the Drupal installer wizard and select the `Wilson` profile. Follow the on-screen steps to configure the initial Drupal setup.

**Step 7:** Create a custom theme for your project by cloning the provided starterkit. You can use our Bash script to automate this, as shown below. You should include the machine name and human readable name of the theme as arguments to this command.

```bash
./web/profiles/custom/wilson/generate-theme.sh my_project_theme 'My Project Theme'
```

**Please note that building the theme requires an up-to-date version of Node and NPM on your environment.**

See the README file in the `wilson_theme_starterkit` for more information about the theme and the NPM commands available.

**Step 8:** Set the new custom theme as the default frontend theme at Manage > Appearance in the Drupal UI.

## Drupal quick start (optional)

Following the installation and compiling the theme, you can boot up a local version of Drupal + Wilson for testing and evaluating using the in-built Drupal quick start command:

```bash
cd /path/to/my-project
php ./web/core/scripts/drupal quick-start wilson
```

This requires PHP 7.3+ to be available on the command line of your machine.
