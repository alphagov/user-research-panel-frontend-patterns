#!/bin/bash
set -e

# Create a new tag if the version file has been updated and a tag for that
# version doesn't already exist

# Are we on master branch, we shouldn't push tags for version bump branches
git fetch origin
MASTER_SHA=`git rev-parse origin/master`
HEAD_SHA=`git rev-parse HEAD`
if [ "$MASTER_SHA" == "$HEAD_SHA" ]; then
  printf "We are on master branch\n"
  # get the version from the version file
  VERSION=`cat VERSION.txt`

  # check to make sure the tag doesn't already exist
  if git rev-parse $VERSION>/dev/null 2>&1; then
    printf "$VERSION_TAG exists already, exiting...\n"
    exit 1;
  fi
else
  printf "Not on master branch, exiting...\n"
fi
