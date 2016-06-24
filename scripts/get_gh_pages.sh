#!/bin/bash

set -e

ROOT=$(pwd)
STATIC_SITE=$ROOT/static_site

trap "rm -rf $STATIC_SITE/* exit 1" INT TERM EXIT

cd $STATIC_SITE

# Bring down gh-pages branch and reset contents
printf "Setting static_site to latest version of gh-pages branch\n"
git init
git remote add origin git@github.com:alphagov/user-research-panel-frontend-patterns.git
git fetch origin
git checkout gh-pages
rm -rf ./*
