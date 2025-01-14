---
title: "Get"
linkTitle: "Get"
description: >
  Learn how to list builds.
---

## Command

```
$ vela get build <parameters...> <arguments...>
```

:::tip
For more information, you can run `vela get build --help`.
:::

## Parameters

The following parameters are used to configure the command:

| Name       | Description                          | Environment Variables             |
| ---------- | ------------------------------------ | --------------------------------- |
| `org`      | name of organization for the builds  | `VELA_ORG`, `BUILD_ORG`           |
| `repo`     | name of repository for the builds    | `VELA_REPO`, `BUILD_REPO`         |
| `event`    | name of event filter for the builds  | `VELA_EVENT`, `BUILD_EVENT`       |
| `status`   | name of status filter for the builds | `VELA_STATUS`, `BUILD_STATUS`     |
| `branch`   | name of branch filter for the builds | `VELA_BRANCH`, `BUILD_BRANCH`     |
| `output`   | format the output for the builds     | `VELA_OUTPUT`, `BUILD_OUTPUT`     |
| `page`     | prints a specific page of builds     | `VELA_PAGE`, `BUILD_PAGE`         |
| `per.page` | number of builds to print per page   | `VELA_PER_PAGE`, `BUILD_PER_PAGE` |

:::tip
This command also supports setting the following parameters via a configuration file:

- `org`
- `repo`
- `output`

For more information, please review the [CLI config documentation](/docs/reference/cli/config/).
:::

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
$ pwd
~/github/octocat
$ vela get build --build 1
```

#### Targeted Request

```sh
$ vela get build --org github --repo octocat --build 1
```

#### Response

```sh
NUMBER  STATUS  EVENT   BRANCH  DURATION
5       failure push    main  45s
4       failure push    main  50s
3       success push    main  54s
2       success push    main  55s
1       pending push    main  ...
```
