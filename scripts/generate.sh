#!/bin/sh

set -e

ROOT=$(pwd)
DOMAIN='github'
STATIC_SITE=$ROOT/static_site

usage() {
  cat << EOF
  Usage: $0 [options]

  Generate a static site from the express app pages

  OPTIONS:
    -l host locally

EOF
}

while getopts "l" OPTION; do
  case $OPTION in
    h )
      usage
      exit 1
      ;;
    l )
      DOMAIN='local'
      ;;
  esac
done
shift $(($OPTIND-1))

ASSET_FOLDERS=( stylesheets images javascripts )

# get all the modules for the grunt task
npm install

# Generate a folder and HTML file for each page
grunt generate

# Copy across all the static assets
mkdir $STATIC_SITE/public
for folder in "${ASSET_FOLDERS[@]}"
do
  mkdir $STATIC_SITE/public/$folder
  cp -r public/$folder/* $STATIC_SITE/public/$folder
  cp -r govuk_modules/govuk_template/assets/$folder/* $STATIC_SITE/public/$folder
  cp -r govuk_modules/govuk_frontend_toolkit/$folder/* $STATIC_SITE/public/$folder
done

# If site is to be hosted on github, rewrite URLs so it can work as github pages
if [ "$DOMAIN" == "github" ]; then
  printf "Generating for hosting as github pages, rewriting URLs\n"
  find $STATIC_SITE -name *.html | xargs -I file sed -i '' 's/href="\/public/href="\/user-research-panel-frontend-patterns\/public/g' file
else
  printf "Generating for hosting locally.\n"
fi