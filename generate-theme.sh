#!/usr/bin/env bash

# Get arguments from terminal input.
MACHINE_NAME=$1
HUMAN_NAME=$2

# Directory location of this script.
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# Utility directory locations.
THEMES_DIR="$SCRIPT_DIR/../../../themes/custom"
TARGET_DIR="$THEMES_DIR/$MACHINE_NAME"

# Codes for text colouring.
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

printf "\n${YELLOW}##########################################\n##########  WILSON THEME SETUP  ##########\n##########################################${NC}\n\n"

# Create folder for custom themes
if [ ! -d "$THEMES_DIR" ];
then
  printf "\n${YELLOW}## Creating the themes/custom folder${NC}\n"
  mkdir "$THEMES_DIR"
fi

if [ -d "$TARGET_DIR" ];
then
  printf "\n${RED}## FAILED\n\nCannot create theme because ${YELLOW}$TARGET_DIR${RED} already exists. Please delete the existing theme or choose a different machine name.${NC}\n\n"
  exit 0
fi

# Clone the starterkit.
STARTER_KIT="$SCRIPT_DIR/themes/wilson_theme_starterkit"

printf "\n${YELLOW}## Creating $MACHINE_NAME from the Wilson starterkit${NC}\n"
cp -R "$STARTER_KIT" "$TARGET_DIR"

# Rename and replace Wilson references in theme.
printf "\n${YELLOW}## Renaming files within $MACHINE_NAME ${NC}\n"
mv "$TARGET_DIR"/wilson_theme_starterkit.info.yml "$TARGET_DIR"/"$MACHINE_NAME".info.yml
mv "$TARGET_DIR"/wilson_theme_starterkit.libraries.yml "$TARGET_DIR"/"$MACHINE_NAME".libraries.yml
mv "$TARGET_DIR"/wilson_theme_starterkit.theme "$TARGET_DIR"/"$MACHINE_NAME".theme

LC_ALL=C find "$TARGET_DIR" -type f -name '*.*' -exec sed -i '' s/Wilson\ Theme\ Starterkit/"$HUMAN_NAME"/g {} +
LC_ALL=C find "$TARGET_DIR" -type f -name '*.*' -exec sed -i '' s/wilson_theme_starterkit/"$MACHINE_NAME"/g {} +
LC_ALL=C find "$TARGET_DIR" -type f -name '*.*' -exec sed -i '' s/@wilson_theme_starterkit/@"$MACHINE_NAME"/g {} +

# Execute the following inside the target theme directory.
cd "$TARGET_DIR"

# Install theme dependencies and NPM build.
printf "\n${YELLOW}## Installing NPM dependencies${NC}\n"
printf "* Node version on this environment: "
node -v
printf "* NPM version on this environment: "
npm -v
printf "\n"
npm install

printf "\n${YELLOW}## Building the theme dist assets${NC}\n"
npm run build

printf "\n${GREEN}## FINISHED\n\nYou can now enable the ${YELLOW}$HUMAN_NAME${GREEN} theme in Drupal at Manage > Appearance.${NC}\n\n"
