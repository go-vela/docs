---
title: "Update"
linkTitle: "Update"
description: >
  Learn how to modify a config.
---

## Command

```
$ vela update config <parameters...> <arguments...>
```

:::tip
For more information, you can run `vela update config --help`.
:::

## Parameters

The following parameters are used to configure the command:

| Name                | Description                         | Environment Variables                        |
| ------------------- | ----------------------------------- | -------------------------------------------- |
| `api.addr`          | updates the API address field       | `VELA_ADDR`, `CONFIG_ADDR`                   |
| `api.token.access`  | updates the API access token field  | `VELA_ACCESS_TOKEN`, `CONFIG_ACCESS_TOKEN`   |
| `api.token.refresh` | updates the API refresh token field | `VELA_REFRESH_TOKEN`, `CONFIG_REFRESH_TOKEN` |
| `api.token`         | updates the API token field         | `VELA_TOKEN`, `CONFIG_TOKEN`                 |
| `api.version`       | updates the API version field       | `VELA_API_VERSION`, `CONFIG_API_VERSION`     |
| `log.level`         | updates the log level field         | `VELA_LOG_LEVEL`, `CONFIG_LOG_LEVEL`         |
| `output`            | updates the output field            | `VELA_OUTPUT`, `CONFIG_OUTPUT`               |
| `org`               | updates the org field               | `VELA_ORG`, `CONFIG_ORG`                     |
| `repo`              | updates the repo field              | `VELA_REPO`, `CONFIG_REPO`                   |
| `secret.engine`     | updates the secret engine field     | `VELA_ENGINE`, `CONFIG_ENGINE`               |
| `secret.type`       | updates the secret type field       | `VELA_TYPE`, `CONFIG_TYPE`                   |

## Permissions

COMING SOON!

## Sample

:::warning
This section assumes you have already installed and setup the CLI.

To install the CLI, please review the [installation documentation](/docs/reference/cli/install.md).

To setup the CLI, please review the [authentication documentation](/docs/reference/cli/authentication.md).
:::

#### Request

```sh
vela update config --org github
```

#### Response

```sh
api:
  addr: https://vela.example.com
  access_token: superSecretAccessToken
  refresh_token: superSecretRefreshToken
  version: v1
log:
  level: info
no-git: "false"
secret: {}
org: github
```
