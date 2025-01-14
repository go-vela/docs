---
title: "Generate"
linkTitle: "Generate"
description: >
  Learn how to produce a config.
---

## Command

```
$ vela generate config <parameters...> <arguments...>
```

:::tip
For more information, you can run `vela generate config --help`.
:::

## Parameters

The following parameters are used to configure the command:

| Name                | Description                                     | Environment Variables                        |
| ------------------- | ----------------------------------------------- | -------------------------------------------- |
| `api.addr`          | full URL to API server                          | `VELA_ADDR`, `CONFIG_ADDR`                   |
| `api.token.access`  | API access token                                | `VELA_ACCESS_TOKEN`, `CONFIG_ACCESS_TOKEN`   |
| `api.token.refresh` | API refresh token                               | `VELA_REFRESH_TOKEN`, `CONFIG_REFRESH_TOKEN` |
| `api.token`         | PAT for API server                              | `VELA_TOKEN`, `CONFIG_TOKEN`                 |
| `api.version`       | version of API for server                       | `VELA_API_VERSION`, `CONFIG_API_VERSION`     |
| `log.level`         | set the level of logging                        | `VELA_LOG_LEVEL`, `CONFIG_LOG_LEVEL`         |
| `no-git`            | set whether CLI finds repo of cwd automatically | `VELA_NO_GIT`, `CONFIG_NO_GIT`               |
| `output`            | format the output for API results               | `VELA_OUTPUT`, `CONFIG_OUTPUT`               |
| `org`               | name of organization for API calls              | `VELA_ORG`, `CONFIG_ORG`                     |
| `repo`              | name of repository for API calls                | `VELA_REPO`, `CONFIG_REPO`                   |
| `secret.engine`     | name of secret engine for API calls             | `VELA_ENGINE`, `CONFIG_ENGINE`               |
| `secret.type`       | name of secret type for API calls               | `VELA_TYPE`, `CONFIG_TYPE`                   |

## Permissions

COMING SOON!

## Sample

:::warning
This section assumes you have already installed and setup the CLI.

To install the CLI, please review the [installation documentation](/docs/reference/cli/install.md).

To setup the CLI, please review the [authentication documentation](/docs/reference/cli/authentication/).
:::

#### Request

```sh
vela generate config --api.addr https://vela.example.com --log.level info
```

#### Response

```sh
api:
  addr: https://vela.example.com
log:
  level: info
no-git: "false"
secret: {}
```
