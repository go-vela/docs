---
title: "Restart"
linkTitle: "Restart"
description: >
  Learn how to rerun a build.
---

## Command

```
$ vela restart build <parameters...> <arguments...>
```

:::tip
For more information, you can run `vela restart build --help`.
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
$ vela restart build --build 1
```

#### Targeted Request

```sh
$ vela restart build --org github --repo octocat --build 1
```

#### Response

```sh
id: 2
repo_id: 1
number: 2
parent: 1
event: push
status: created
error: ""               # Populates when the platform runs into an error with the build
enqueued: 1563474087
created: 1563474086
started: 1563474087
finished: 0
deploy: ""
clone: https://github.com/github/octocat.git
source: https://github.com/github/octocat/commit/48afb5bdc41ad69bf22588491333f7cf71135163
title: push received from https://github.com/github/octocat
message: First commit...
commit: 48afb5bdc41ad69bf22588491333f7cf71135163
sender: OctoKitty
author: OctoKitty
branch: main
ref: refs/heads/main
baseref: ""
host: "company.localhost"
runtime: "docker"
distribution: "linux"
```
