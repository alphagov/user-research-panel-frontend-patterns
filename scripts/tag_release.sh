#!/bin/bash
set -e

# Create a new tag if the version file has been updated and a tag for that
# version doesn't already exist

# Are we on master branch, we shouldn't push tags for version bump branches
MASTER_SHA=`git rev-parse origin/master`
HEAD_SHA=`git rev-parse HEAD`
echo "MASTER_SHA: $MASTER_SHA"
echo "HEAD_SHA: $HEAD_SHA"
if [ "$MASTER_SHA" == "$HEAD_SHA" ]; then
  echo "We are on master branch"
  # get the version from the version file
  VERSION_TAG="v`cat VERSION.txt`"

  # check to make sure the tag doesn't already exist
  if ! git rev-parse $VERSION_TAG >/dev/null 2>&1; then
    echo "$VERSION_TAG doesn't exist already"
    echo "Creating new tag: $VERSION_TAG"
    git tag $VERSION_TAG
    git push origin $VERSION_TAG

    # Alias branch for the most recently released tag, for easier diffing
    git push -f origin master:latest-release
  else
    echo "$VERSION_TAG exists already"
  fi
fi
