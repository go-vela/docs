---
title: "Chown"
linkTitle: "Chown"
description: >
  Learn how to change ownership of a repo.
---

## Command

```
$ vela chown repo <parameters...> <arguments...>
```

:::tip
For more information, you can run `vela chown repo --help`.
:::

## Parameters

The following parameters are used to configure the command:

| Name     | Description                             | Environment Variables        |
| -------- | --------------------------------------- | ---------------------------- |
| `org`    | name of organization for the repository | `VELA_ORG`, `REPO_ORG`       |
| `repo`   | name of repository                      | `VELA_REPO`, `REPO_NAME`     |
| `output` | format the output for the repository    | `VELA_OUTPUT`, `REPO_OUTPUT` |

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
$ vela chown repo
```

#### Targeted Request

```sh
$ pwd
~/github/octocat
$ vela chown repo --org github --repo octocat
```

#### Response

```sh
repo "github/octocat" changed owner
```
