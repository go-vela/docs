---
title: "Remove"
linkTitle: "Remove"
description: >
  Learn how to delete a secret.
---

## Command

```
$ vela remove secret <parameters...> <arguments...>
```

:::tip
For more information, you can run `vela remove secret --help`.
:::

## Parameters

The following parameters are used to configure the command:

| Name            | Description                           | Environment Variables          |
| --------------- | ------------------------------------- | ------------------------------ |
| `org`           | name of organization for the secret   | `VELA_ORG`, `SECRET_ORG`       |
| `repo`          | name of repository for the secret     | `VELA_REPO`, `SECRET_REPO`     |
| `secret.engine` | name of engine that stores the secret | `VELA_ENGINE`. `SECRET_ENGINE` |
| `secret.type`   | name of type of secret being stored   | `VELA_TYPE`, `SECRET_TYPE`     |
| `team`          | name of team for the secret           | `VELA_TEAM`, `SECRET_TEAM`     |
| `name`          | name of the secret                    | `VELA_NAME`, `SECRET_NAME`     |
| `output`        | format the output for the secret      | `VELA_OUTPUT`, `SECRET_OUTPUT` |

:::tip
This command also supports setting the following parameters via a configuration file:

- `secret.engine`
- `secret.type`
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
$ vela remove secret --secret.engine native --secret.type repo --name foo 
```

#### Targeted Request

```sh
$ pwd
~/github/octocat
$ vela remove secret --secret.engine native --secret.type repo --org github --repo octocat --name foo
```

#### Response

```sh
secret "foo" was deleted
```
