# Contributing to `vector`

## Tests

To run tests use a command: `pnpm run test`.

## Style guide

Eslint will catch most styling issues that may exist in your code. You can check the status of your code styling by simply running `pnpm run lint`.

## Code conventions

Project use common JavaScript code conventions.

## Build

To build project use `pnpm run build`.

`esbuild` is used to build the project, `tsc` to generate bundled `index.d.ts` declaration. Custom script `/scripts/bundle-dts.js` is used to rename `index` module to the package name for type to work.

## License

By contributing to `vector`, you agree that your contributions will be licensed under its MIT license.
