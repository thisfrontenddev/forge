# Forge

A personal workout tracking application designed specifically for my fitness needs and training style.

## About

Forge is my custom-built fitness companion, tailored to track workouts exactly how I want them. This isn't a generic fitness app - it's built around my specific training requirements, exercise preferences, and the metrics that matter most to my fitness journey.

## What's inside?

This project is structured as a Turborepo monorepo with the following packages:

### Apps and Packages

- `web`: Next.js 15 application with my personalized workout tracking interface
- `@forge/db`: Database package with Drizzle ORM, PostgreSQL schemas, and Supabase integration
- `@forge/eslint-config`: Shared ESLint configurations
- `@forge/tsconfig`: TypeScript configurations used throughout the monorepo
- `@forge/prettier-config`: Shared Prettier formatting rules

### Core Features (Built for My Needs)

- **Custom Workout Logging**: Track exercises, sets, reps, and weights the way I train
- **Personal Exercise Database**: My exercise library with movements I actually do
- **Progress Tracking**: Monitor my fitness progress with metrics I care about
- **Streamlined UX**: No bloat, just the features I need for my workouts

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/) for type safety and better developer experience.

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
