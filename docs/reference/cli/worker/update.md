---
title: "Update"
linkTitle: "Update"
description: >
  Learn how to modify a worker.
---

## Command

```
$ vela update worker <parameters...> <arguments...>
```

:::tip
For more information, you can run `vela update worker --help`.
:::

## Parameters

The following parameters are used to configure the command:

| Name              | Description                              | Environment Variables                           |
| ----------------- | ---------------------------------------- | ----------------------------------------------- |
| `worker.address`  | address of the worker                    | `VELA_WORKER_ADDRESS`, `WORKER_ADDRESS`         |
| `worker.hostname` | hostname of the worker                   | `VELA_WORKER_HOSTNAME`, `WORKER_HOSTNAME`       |
| `active`          | current status of the worker (unused)    | `VELA_WORKER_ACTIVE`, `WORKER_ACTIVE`           |
| `build-limit`     | build limit for the worker (ignored)     | `VELA_WORKER_BUILD_LIMIT`, `WORKER_BUILD_LIMIT` |
| `routes`          | route assignment for the worker (unused) | `VELA_WORKER_ROUTES`, `WORKER_ROUTES`           |
| `output`          | format the output for the worker         | `VELA_OUTPUT`, `WORKER_OUTPUT`                  |

:::tip
This command also supports setting the following parameters via a configuration file:

- `output`

For more information, please review the [CLI config documentation](/docs/reference/cli/config/config.md).
:::

## Permissions

Vela Platform Admin

## Sample

:::warning
This section assumes you have already installed and setup the CLI.

To install the CLI, please review the [installation documentation](/docs/reference/cli/install.md).

To setup the CLI, please review the [authentication documentation](/docs/reference/cli/authentication.md).
:::

#### Request

```sh
$ vela update worker --worker.hostname MyWorker --worker.address newaddress.example.com
```

#### Response

```sh
{
  ID: 1,
  Hostname: MyWorker,
  Address: newaddress.example.com,
  Routes: [vela],
  Active: true,
  Status: busy,
  LastStatusUpdateAt: 1681486769,
  RunningBuildIDs: [123],
  LastBuildStartedAt: 1681486769,
  LastBuildFinishedAt: 1681486769,
  LastCheckedIn: 1681486769,
  BuildLimit: 1,
}
```
