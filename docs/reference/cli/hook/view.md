---
title: "View"
linkTitle: "View"
description: >
  Learn how to inspect a hook.
---

## Command

```
$ vela view hook <parameters...> <arguments...>
```

:::tip
For more information, you can run `vela view hook --help`.
:::

## Parameters

The following parameters are used to configure the command:

| Name     | Description                       | Environment Variables        |
| -------- | --------------------------------- | ---------------------------- |
| `org`    | name of organization for the hook | `VELA_ORG`, `HOOK_ORG`       |
| `repo`   | name of repository for the hook   | `VELA_REPO`, `HOOK_REPO`     |
| `hook`   | number of the hook                | `VELA_HOOK`, `HOOK_NUMBER`   |
| `output` | format the output for the hook    | `VELA_OUTPUT`, `HOOK_OUTPUT` |

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
$ vela view hook --hook 1
```

#### Targeted Request

```sh
$ vela view hook --org github --repo octocat --hook 1
```

#### Response

```sh
id: 1
repo_id: 1
build_id: 1
number: 1
source_id: c8da1302-07d6-11ea-882f-4893bca275b8
created: 1563475419
host: github.com
event: push
branch: main
error: 
status: success
link: https://github.com/github/octocat/settings/hooks/1
```
