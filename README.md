# BonkLIB
## Branch Structure:
Main Branch:
This should be the stable branch, containing the most recent, production-ready version of the project. All releases are pulled from here.

Dev Branch:
When working on new feature, create new feature branch with dev branch as base, do NOT directly work in dev branch.

Feature Branch:
Work in feature branch, when feel ready, push to dev.

## Usage
Use `npm install` when first pulling from this branch as well as when node modules are changed.

Before build(generate) script, please check `npm version [ major | minor | patch ]`.
Right now the "prebuild" will patch the version.
Build bonkLIB with `npm run build`.
