# Monorepo Example with Bazel and SvelteKit

Just an initial starting point for a bazel monorepo
with a SvelteKit application. The goal is to show how
to setup bazel to run a sveltekit app during development
and to build it for a production release.

Keep in mind, I'm not an expert in bazel or sveltekit, so
there is most likely better ways to get this to work. This
is just the result of researching to build a monorepo for myself.
If you see something wrong or that can be improved, please create
an issue or a PR.

## Technologies Used

The repo was set up using:

- Bazel 6
- Pnpm as the package manager
  - This is the recommended package manager per the docs from Aspect on rules js
    simply because it works well with bazel's approach to builds.
- [Aspect's rules js](https://github.com/aspect-build/rules_js)
- SvelteKit
- Vite

## What's included?

The repo has a single sveltekit application under `packages/my_first_app` and a
single library under `packages/my_common_package`. The app depends on the library.
This is purely for demonstration on how you would create common libraries inside
your repo, since it is the main purpose of a monorepo.

## How dependencies work

At the root of the repo you will find a `package.json` file where all
dependencies for all JS projects in the repo would be listed. This is
meant to encourage a common version of packages accross apps. However,
you don't need to run `pnpm install` in order to build apps. The `package.json`
file is meant only to inform pnpm which versions we care about. When we run
this command (per the Aspect docs on how to set up rules_js)

```bash
pnpm install --lockfile-only
```

pnpm will only create a lockfile with specific versions _based on what `package.json`_
has listed. Finally, when we run a build, bazel will look at the version in
pnpm's lockfile, fetch those, and will make them available for packages to list
as dependencies. In other words, bazel will be doing the job `pnpm install` would
normally do.

Applications should have a `package.json` file inside them too. There are two
main reasons for this:

1. It was necessary in order to get sveltekit to work properly. The reason for
   that was that sveltekit apparently requires that the package is defined as `"type": "module"`
   in order to resolve things properly, and the only way to do that is through `package.json`.
2. You should list your **runtime dependencies** inside the app's `package.json`, as is the
   case for the Attractions UI Kit.

**Build dependencies** (which in the case of sveltekit is most of them) should not be listed
in `package.json`, they should be included in the build defined in `packages/<app name>/BUILD.bazel`.

If you open `packages/my_first_app/package.json` you'll
notice there's only one dependency listed, that's because the dependencies svelte needs are
listed under the `BUILD.bazel` file.

## How to add a new package

In order to add a new package you should do the following:

1. Create the folder for the package under `packages/...`.
2. Add your package to `pnpm-workspace.yaml`.
3. Add the packages node_modules to .bazelignore as `packages/<package name>/node_modules`
4. Create a `BUILD.bazel` file inside the package.
5. Run `pnpm install --lockfile-only` again. This is so pnpm and bazel can see your new package.

Once you have that you should be able to build or run any targets you defined in `BUILD.bazel`.

## Available Commands

The example app has 2 commands available, `build` and `serve`. These are meant to mirror the `vite dev` and `vite build` commands that sveltekit normally uses. You can
run them by doing:

#### Build

```bash
# build
bazel build //packages/my_first_app
```

#### Serve

```bash
# serve
bazel run //packages/my_first_app:serve
# or serve with HMR
ibazel run //packages/my_first_app:serve
```

Using the first serve command **will not enable HMR**. The problem is
vite is built to look for changes on your source repo and rebuild, but Bazel builds
everything inside of a sandbox, meaning your changes to source files are not reflected
there until bazel runs again. To get HMR to work we need to use [ibazel](https://www.npmjs.com/package/@bazel/ibazel). As a convenience, a script is defined inside the root
`package.json` to run ibazel through pnpm if you prefer using it like that. Regardless,
using the second command should work (requires iBazel to be installed in your machine).

## Gotchas and known issues

- The editor integration with VS Code is not great at the moment, since the repo
  structure is so different than what it's used to.
  - You can get around some errors by running `pnpm install` globablly. As explained
    above you don't need to run that, since bazel will fetch its own dependencies
    during a build however, it will help to get rid of some editor errors saying it can't find a given package.
