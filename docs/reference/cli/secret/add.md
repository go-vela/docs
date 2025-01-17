---
title: "Add"
linkTitle: "Add"
description: >
  Learn how to create a secret.
---

## Command

```
$ vela add secret <parameters...> <arguments...>
```

:::tip
For more information, you can run `vela add secret --help`.
:::

:::warning
Note on special characters:

Certain characters may require you to encapsulate your secret with `"` or `'`.
`\` characters have to be double escaped to be `\\\`.
:::

## Parameters

The following parameters are used to configure the command:

| Name            | Description                                       | Environment Variables                      |
| --------------- | ------------------------------------------------  | ----------------------------------------- |
| `org`           | name of organization for the secret               | `VELA_ORG`, `SECRET_ORG`                   |
| `repo`          | name of repository for the secret                 | `VELA_REPO`, `SECRET_REPO`                 |
| `secret.engine` | name of engine that stores the secret             | `VELA_ENGINE`. `SECRET_ENGINE`             |
| `secret.type`   | name of type of secret being stored               | `VELA_TYPE`, `SECRET_TYPE`                 |
| `team`          | name of team for the secret                       | `VELA_TEAM`, `SECRET_TEAM`                 |
| `name`          | name of the secret                                | `VELA_NAME`, `SECRET_NAME`                 |
| `value`         | value of the secret                               | `VELA_VALUE`, `SECRET_VALUE`               |
| `image`         | build image(s) that can access the secret         | `VELA_IMAGES`, `SECRET_IMAGES`             |
| `event`         | build event(s) that can access the secret         | `VELA_EVENTS`, `SECRET_EVENTS`             |
| `commands`      | allows a step with commands to access the secret  | `VELA_COMMANDS`, `SECRET_COMMANDS`         |
| `substitution`  | allows substitution of secret using $\{KEY\} format | `VELA_SUBSTITUTION`, `SECRET_SUBSTITUTION` |
| `file`          | name of file used to add the secret(s)            | `VELA_FILE`, `SECRET_FILE`                 |
| `output`        | format the output for the secret                  | `VELA_OUTPUT`, `SECRET_OUTPUT`             |

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
$ vela add secret --secret.engine native --secret.type repo --name foo --value bar
```

#### Targeted Request

```sh
$ vela add secret --secret.engine native --secret.type repo --org github --repo octocat --name foo --value bar
```

#### Response

```sh
secret "foo" was added
```

## Advanced

#### Input From File

Vela supports creating a single-line or multi-line secret from a file using the `@` symbol.

```sh
# Syntax
vela add secret --secret.engine native --secret.type repo --org github --repo octocat --name foo --value @/path/to/file

# Example
vela add secret --secret.engine native --secret.type repo --org github --repo octocat --name foo --value @$HOME/tmp/secret.txt
```

#### Secrets From File

Vela supports creating multiple secrets from a file using the `filename` parameter.

```sh
vela add secret -f secret.yml
```

### Single YAML document

```yaml
---
metadata:
  version: v1
  engine: native
secrets:
  - org: octocat
    repo: github
    name: foo
    value: bar
    type: repo
    images:
      - golang:latest
    events:
      - push
      - pull_request
  - org: github
    team: octokitties
    name: foo1
    value: "@/path/to/file/bar1"
    type: shared
    images:
      - golang:latest
    events:
      - push
      - pull_request
```

### Multiple YAML document

```yaml
---
metadata:
  version: v1
  engine: native
secrets:
  - org: github
    repo: octocat
    name: foo
    value: bar
    type: repo
    images:
      - golang:latest
    events:
      - push
      - pull_request

---
metadata:
  version: v1
  engine: vault
secrets:
  - org: github
    team: octokitties
    name: foo1
    value: "@/path/to/file/bar1"
    type: shared
    images:
      - golang:latest
    events:
      - push
      - pull_request
```
