# generator-ys-typescript

A minimal TypeScript generator.

- Uses [@sindresorhus/tsconfig](https://github.com/sindresorhus/tsconfig) as base config, plus:
  - `resolveJsonModule` default to `true`.
- Supports [Webpack 4](https://github.com/webpack/webpack) (default to `false`).
- Create command line entry by option (default to `false`).
- Uses [TypeDoc](https://github.com/TypeStrong/typedoc) to generate docs.
- Uses [tslint-config-standard](https://github.com/blakeembrey/tslint-config-standard) for linting.
- Uses [ava](https://github.com/avajs/ava) for testing.
- Support [Yarn](https://yarnpkg.com/) (default is npm).

Todo:

- [ ] Tests.
