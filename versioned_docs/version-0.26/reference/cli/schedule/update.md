---
title: "Update"
linkTitle: "Update"
description: >
  Learn how to modify a schedule.
---

## Command

```
$ vela update schedule <parameters...> <arguments...>
```

:::tip
For more information, you can run `vela update schedule --help`.
:::

## Parameters

The following parameters are used to configure the command:

| Name       | Description                           | Environment Variables            |
|------------|---------------------------------------|----------------------------------|
| `org`      | name of organization for the schedule | `VELA_ORG`, `SCHEDULE_ORG`       |
| `repo`     | name of repository for the schedule   | `VELA_REPO`, `SCHEDULE_REPO`     |
| `schedule` | name of the schedule                  | `VELA_SCHEDULE`, `SCHEDULE_NAME` |
| `entry`    | frequency for the schedule            | `VELA_ENTRY`, `SCHEDULE_ENTRY`   |
| `active`   | enables/disables the schedule         | `VELA_ACTIVE`, `SCHEDULE_ACTIVE` |
| `output`   | format the output for the schedule    | `VELA_OUTPUT`, `SCHEDULE_OUTPUT` |

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
$ vela update schedule --name hourly --active false
```

#### Targeted Request

```sh
$ vela update schedule --org github --repo octocat --name hourly --active false --output json
```

#### Response

```sh
{
	"id": 1,
	"repo": {
		"id": 1,
		"owner": {
			"id": 1,
			"name": "octokitty",
			"active": true
		},
		"org": "github",
		"name": "octokitty",
		"full_name": "github/octokitty",
		"link": "https://github.com/github/octokitty",
		"clone": "https://github.com/github/octokitty.git",
		"branch": "main",
		"topics": [],
		"build_limit": 10,
		"timeout": 30,
		"counter": 0,
		"visibility": "public",
		"private": false,
		"trusted": false,
		"active": true,
		"allow_events": {
			"push": {
				"branch": true,
				"tag": false,
				"delete_branch": false,
				"delete_tag": false
			},
			"pull_request": {
				"opened": false,
				"edited": false,
				"synchronize": false,
				"reopened": false,
				"labeled": false,
				"unlabeled": false
			},
			"deployment": {
				"created": false
			},
			"comment": {
				"created": false,
				"edited": false
			},
			"schedule": {
				"run": false
			}
		},
		"pipeline_type": "yaml",
		"previous_name": "",
		"approve_build": "fork-always"
	},
	"active": false,
	"name": "hourly",
	"entry": "0 * * * *",
	"created_at": 1716495910,
	"created_by": "octokitty",
	"updated_at": 1716495910,
	"updated_by": "octokitty",
	"scheduled_at": 0,
	"branch": "main",
	"error": "",
	"next_run": 1716499800
}
```

## Examples

```sh
EXAMPLES:
  1. Update a schedule for a repository with active disabled.
    $ vela update schedule --org MyOrg --repo MyRepo --schedule hourly --active false
  2. Update a schedule for a repository with a new entry.
    $ vela update schedule --org MyOrg --repo MyRepo --schedule nightly --entry '@nightly'
  3. Update a schedule for a repository when config or environment variables are set.
    $ vela update schedule
```