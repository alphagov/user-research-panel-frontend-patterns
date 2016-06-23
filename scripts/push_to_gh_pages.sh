#!/bin/bash
set -e

trap "rm -rf _github_pages; exit 1" INT TERM EXIT

VERSION=`cat VERSION.txt`
ROOT=$(pwd)
GITHUB_PAGES_DIR=$ROOT/_github_pages
STATIC_SITE_DIR=$ROOT/static_site
SCRIPTS_DIR=$ROOT/scripts

# Are we on master branch, we shouldn't push tags for version bump branches
MASTER_SHA=`git rev-parse origin/master`
HEAD_SHA=`git rev-parse HEAD`
echo "MASTER_SHA: $MASTER_SHA"
echo "HEAD_SHA: $HEAD_SHA"
if [ "$MASTER_SHA" == "$HEAD_SHA" ]; then
  echo "On master branch."

  echo "VERSION: $VERSION"
  # check to make sure the tag doesn't already exist
  if git rev-parse $VERSION >/dev/null 2>&1; then
    echo "No new versions, exiting."
    exit 1;
  fi

  echo "New version, cracking on..."
  # Check out local version of gh-pages branch
  mkdir $GITHUB_PAGES_DIR
  cd $GITHUB_PAGES_DIR
  git init
  git remote add origin git@github.com:alphagov/user-research-panel-frontend-patterns.git
  git fetch origin
  git checkout gh-pages

  # Refresh the content with new
  git rm -rf .
  cp $SCRIPTS_DIR/GH-PAGE_README.md ./README.md
  cp -r $STATIC_SITE_DIR/* ./
  git add -A
  git commit -m "Version $VERSION of User Research Panel Styleguide"
  git push origin gh-pages

  # Tidy up
  cd ../
  rm -rf $GITHUB_PAGES_DIR $STATIC_SITE_DIR
else
  echo "This repository is not on the master branch. Please switch to master and try again."
fi
