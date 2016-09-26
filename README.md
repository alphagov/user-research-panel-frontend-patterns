User research panel frontend patterns
=====================================

A pattern library for building user research surveys.

Built from [GOVUK Elements](https://github.com/alphagov/govuk_elements).

## Installation

```
make install
```

## Generate and run the static site locally

```
make local
```

## Deploy a new version of the static site

Deployment involves the following steps:

1. generation of a new version of the static site
2. cloning the `gh-pages` branch of the repo and clearing out the files
3. copying the generated files into this repo so any changes are recognised by git
4. commiting the changes against the number in `VERSION.txt`
5. tagging the version as the number in `VERSION.txt`

To deploy the static site you need to have commited a version bump, for example:

https://github.com/alphagov/user-research-panel-frontend-patterns/commit/2d6d9404a5260d7d24508352242f74168a68ec48

Version numbers follow [semantic versioning](http://semver.org/).

To run the deployment process:

```
make deploy
```

## Tidy up

In case any make commands fail and you're left with a semi-complete static site, you can remove old versions by running:

```
make clean
```
