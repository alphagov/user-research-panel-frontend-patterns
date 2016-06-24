#!/bin/bash

set -e

ROOT=$(pwd)
VERSION=`cat $ROOT/VERSION.txt`

cd $ROOT/static_site
printf "Creating new tag: $VERSION\n"
git tag $VERSION
git push origin $VERSION

# Alias branch for the most recently released tag, for easier diffing
git push -f origin master:latest-release
