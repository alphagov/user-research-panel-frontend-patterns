#!/bin/bash

set -e

ROOT=$(pwd)
VERSION=`cat $ROOT/VERSION.txt`

cd $ROOT/static_site

# commit this version
git add -A .
git commit -m "Version $VERSION of User Research Panel Styleguide"
git push origin gh-pages

# tag the version
printf "Creating new tag: $VERSION\n"
git tag $VERSION
git push origin $VERSION
