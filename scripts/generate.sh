#!/bin/sh

set -e

ASSET_FOLDERS=( stylesheets images javascripts )
rm -rf static_site
mkdir -p static_site/public
for folder in "${ASSET_FOLDERS[@]}"
do
  mkdir static_site/public/$folder
  cp -r public/$folder/* static_site/public/$folder
  cp -r govuk_modules/govuk_template/assets/$folder/* static_site/public/$folder
  cp -r govuk_modules/govuk_frontend_toolkit/$folder/* static_site/public/$folder
done

grunt generate
