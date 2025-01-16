---
title: "Approve"
linkTitle: "Approve"
description: >
  Learn how to approve a build as a repository admin.
---

## Command

```
$ vela approve build <parameters...> <arguments...>
```

:::tip
For more information, you can run `vela approve build --help`.
:::

## Parameters

The following parameters are used to configure the command:

| Name     | Description                        | Environment Variables             |
| -------- | ---------------------------------- | --------------------------------- |
| `org`    | name of organization for the build | `VELA_ORG`, `BUILD_ORG`           |
| `repo`   | name of repository for the build   | `VELA_REPO`, `BUILD_REPO`         |
| `build`  | number of the build                | `VELA_BUILD`, `BUILD_NUMBER`      |
| `output` | format the output for the build    | `VELA_OUTPUT`, `BUILD_OUTPUT`     |

:::tip
This command also supports setting the following parameters via a configuration file:

- `org`
- `repo`
- `output`

For more information, please review the [CLI config documentation](/docs/reference/cli/config/config.md).
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
$ vela approve build --build 1
```

#### Targeted Request

```sh
$ vela approve build --org github --repo octocat --build 1
```

#### Response

```sh
"successfully approved build github/octocat/1"
```