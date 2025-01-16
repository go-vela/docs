---
title: "View"
linkTitle: "View"
description: >
  Learn how to inspect a service.
---

## Command

```
$ vela view service <parameters...> <arguments...>
```

:::tip
For more information, you can run `vela view service --help`.
:::

## Parameters

The following parameters are used to configure the command:

| Name      | Description                          | Environment Variables            |
| --------- | ------------------------------------ | -------------------------------- |
| `org`     | name of organization for the service | `VELA_ORG`, `SERVICE_ORG`        |
| `repo`    | name of repository for the service   | `VELA_REPO`, `SERVICE_REPO`      |
| `build`   | number of build for the service      | `VELA_BUILD`, `SERVICE_BUILD`    |
| `service` | number of the service                | `VELA_SERVICE`, `SERVICE_NUMBER` |
| `output`  | format the output for the service    | `VELA_OUTPUT`, `SERVICE_OUTPUT`  |

:::tip
This command also supports setting the following parameters via a configuration file:

- `org`
- `repo`
- `output`

For more information, please review the [CLI config documentation](/docs//docs/reference/cli/config.md).
:::

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
$ pwd
~/github/octocat
$ vela view service --build 1 --service 1
```

#### Targeted Request

```sh
$ vela get service --org github --repo octocat --build 1 --service 1
```

#### Response

```sh
id: 1
build_id: 1
repo_id: 1
number: 1
name: clone
status: success
error: ""
exitcode: 0
created: 1561748980
started: 1561748979
finished: 1561748981
host: "worker.host.com"
runtime: "docker"
distribution: "linux"
```
