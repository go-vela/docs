---
title: "Settings"
linkTitle: "Settings"
weight: 1
description: >
  This section contains information on using dynamic platform settings for the Vela server.
---

Platform Administrators can update certain properties during runtime to change how the platform behaves in real time.

The following properties are available to be updated:

* [`VELA_REPO_ALLOWLIST`](/reference/installation/server/#vela_repo_allowlist)
* [`VELA_SCHEDULE_ALLOWLIST`](/reference/installation/server/#vela_schedule_allowlist)
* [`VELA_MAX_TEMPLATE_DEPTH`](/reference/installation/server/#vela_max_template_depth)
* [`VELA_COMPILER_STARLARK_EXEC_LIMIT`](/reference/installation/server/#vela_compiler_starlark_exec_limit)
* [`VELA_CLONE_IMAGE`](/reference/installation/server/#vela_clone_image)


## Configuration

The following options are used to configure the component:

| Name                        | Description                                              | Required | Default | Environment Variables                                                       |
| --------------------------- | -------------------------------------------------------- | -------- | ------- | --------------------------------------------------------------------------- |
| `settings-refresh-interval` | the interval at which the server syncs with the database | `true`   | `5s`    | `VELA_PLATFORM_SETTINGS_REFRESH_INTERVAL`, `VELA_SETTINGS_REFRESH_INTERVAL` |

:::note
For more information on how the runtime properties are consumed, please see the [server reference](/docs/reference/installation/server/server.md).
:::

## Permissions

This functionality only exists for [Platform Administrators](/docs/usage/roles.md).

## Usage

### Initializing

The server will ensure shared settings are first initialized using the variables provided in the environment. For more information on how the runtime properties are configured, please see the [server reference](/docs/reference/installation/server/server.md). 

On subsequent server startups, the properties controlled by the `settings` component will be retrieved from the database.

If the database settings record is deleted then the server will fail. On the next startup the server will re-initialize the settings record using the values provided in the environment.

### Server Synchronization

The server will keep its own `settings` in sync with the database according to the `settings-refresh-interval` set in the environment.

### Viewing and Updating Properties

To view or update settings via the user interface, log into your Vela instance and click the `site admin` link in the top right corner or navigate to `https://vela-server.example.com/admin/settings`.

Check the [CLI docs](/docs/reference/cli/settings/settings.md) for instructions on modifying runtime properties via the command line.

Updated properties will propagate to all server instances depending on the `settings-refresh-interval` set in the environment on startup.

### Restoring Default Properties

The [`DELETE  /api/v1/admin/settings`](/docs/reference/api/admin/settings/restore.md) API endpoint can be used to "restore" the server to its original environment-provided configurations. Acting as a way for platform admins to undo any current modifications to the platform without restarting or modifying the database.
