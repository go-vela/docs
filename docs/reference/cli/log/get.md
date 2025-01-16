---
title: "Get"
linkTitle: "Get"
description: >
  Learn how to list logs for a build.
---

## Command

```
$ vela get log <parameters...> <arguments...>
```

:::tip
For more information, you can run `vela get log --help`.
:::

## Parameters

The following parameters are used to configure the command:

| Name     | Description                      | Environment Variables       |
| -------- | -------------------------------- | --------------------------- |
| `org`    | name of organization for the log | `VELA_ORG`, `LOG_ORG`       |
| `repo`   | name of repository for the log   | `VELA_REPO`, `LOG_REPO`     |
| `build`  | number of the build for the log  | `VELA_BUILD`, `LOG_BUILD`   |
| `output` | format the output for the logs   | `VELA_OUTPUT`, `LOG_OUTPUT` |

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
$ vela get log --build 5
```

#### Targeted Request

```sh
$ vela get log --org github --repo octocat --build 5
```

#### Response

```sh
$ git init
Initialized empty Git repository in /vela/src/github.com/github/octocat/.git/
$ git remote add origin https://github.com/github/octocat.git
$ git remote --verbose
origin  https://github.com/github/octocat.git (fetch)
origin  https://github.com/github/octocat.git (push)
$ git fetch --no-tags origin refs/heads/main
From https://github.com/github/octocat
 * branch            main     -> FETCH_HEAD
 * [new branch]      main     -> origin/main
$ git reset --hard afafce5e33a8efd4340613b31a953107d6dec3a3
HEAD is now at afafce5 Dummy commit

$ echo "Hello World!"
Hello World!
```
