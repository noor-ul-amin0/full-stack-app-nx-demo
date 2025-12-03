# Full Stack App - Nx Monorepo

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

A full-stack application built with [Nx](https://nx.dev) monorepo, featuring a **Fastify API** backend and a **Next.js** frontend.

## 📦 Applications

| App        | Description                  | Port | Path          |
| ---------- | ---------------------------- | ---- | ------------- |
| **api**    | Fastify REST API server      | 8005 | `apps/api`    |
| **client** | Next.js frontend application | 8000 | `apps/client` |

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

```sh
npm install
```

### Development

Run both applications in parallel:

```sh
npx nx run-many -t serve dev --projects=api,client --parallel
```

Or run them individually:

```sh
# Run the API server (http://localhost:8005)
npx nx serve api

# Run the Next.js client (http://localhost:8000)
npx nx dev client
```

### Build

```sh
# Build all projects
npx nx run-many -t build

# Build specific project
npx nx build api
npx nx build client
```

### Testing

```sh
# Run all tests
npx nx run-many -t test

# Run tests for specific project
npx nx test api
npx nx test client
```

### Linting

```sh
# Lint all projects
npx nx run-many -t lint

# Lint specific project
npx nx lint api
npx nx lint client
```

## 📁 Project Structure

```plaintext
├── apps/
│   ├── api/                 # Fastify backend
│   │   └── src/
│   │       ├── app/
│   │       │   ├── plugins/
│   │       │   └── routes/
│   │       └── main.ts
│   └── client/              # Next.js frontend
│       └── src/
│           └── app/
├── packages/                # Shared libraries
├── nx.json
└── package.json
```

## 🛠️ Tech Stack

- **Monorepo:** [Nx](https://nx.dev)
- **Backend:** [Fastify](https://fastify.dev)
- **Frontend:** [Next.js 15](https://nextjs.org) with App Router
- **Language:** TypeScript
- **Testing:** Jest
- **Linting:** ESLint

## 📊 Visualize the Project Graph

```sh
npx nx graph
```

## Keep TypeScript project references up to date

Nx automatically updates TypeScript [project references](https://www.typescriptlang.org/docs/handbook/project-references.html) in `tsconfig.json` files to ensure they remain accurate based on your project dependencies (`import` or `require` statements). This sync is automatically done when running tasks such as `build` or `typecheck`, which require updated references to function correctly.

To manually trigger the process to sync the project graph dependencies information to the TypeScript project references, run the following command:

```sh
npx nx sync
```

You can enforce that the TypeScript project references are always in the correct state when running in CI by adding a step to your CI job configuration that runs the following command:

```sh
npx nx sync:check
```

[Learn more about nx sync](https://nx.dev/reference/nx-commands#sync)

## Nx Cloud

Nx Cloud ensures a [fast and scalable CI](https://nx.dev/ci/intro/why-nx-cloud?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) pipeline. It includes features such as:

- [Remote caching](https://nx.dev/ci/features/remote-cache?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task distribution across multiple machines](https://nx.dev/ci/features/distribute-task-execution?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Automated e2e test splitting](https://nx.dev/ci/features/split-e2e-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task flakiness detection and rerunning](https://nx.dev/ci/features/flaky-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

### Set up CI (non-Github Actions CI)

**Note:** This is only required if your CI provider is not GitHub Actions.

Use the following command to configure a CI workflow for your workspace:

```sh
npx nx g ci-workflow
```

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/js?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:

- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
