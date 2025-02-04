# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ nvm use
$ pnpm install
```

#### Environment Setup

| Env Var | Value | Required |
| ------- | ----- | -------- |
| `GITHUB_PAT` | GitHub personal access token containing `read` permissions on all repositories within the `remote-vela-plugins/plugins.js` list that do not set the `internal` field | yes |
| `GHE_PAT` | GitHub Enterprise personal access token containing `read` permissions on all repositories within the `remote-vela-plugins/plugins.js` list that do set the `internal` field | no, today all plugins are fetched from GitHub.com |
| `GHE_API_URL` | base URL for the internal GitHub Enterprise API for fetching `internal` repository docs | no, today all plugins are fetched from GitHub.com |

### Local Development

```
$ pnpm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ pnpm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

The site is built and deployed using GitHub Actions.

| Secret | Value |
| ------- | ----- |
| `DOCUSAURUS_GITHUB_PAT` | GitHub personal access token containing `read` permissions on all repositories within the `remote-vela-plugins/plugins.js` list that are fetched via remote source. |
