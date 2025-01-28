---
title: "Repository Settings"
linkTitle: "Repository Settings"
description: >
  Learn about Vela repository settings.
---

## Permissions

Before going through all the Vela repository settings, it's important to cover Vela permissions and how they apply to various parts of the Vela application.

An overview of permissions can be found [here](/docs/usage/roles.md).

## General Repository Settings

Below are all settings for repositories that can be changed in the Vela UI / CLI / API.

### Webhook Events

Vela can subscribe to any of the following webhook events:

| Event                         | Description                                                                |
|------------------------------ |--------------------------------------------------------------------------- |
| `push`                        |  a commit pushed to a repository branch                                    |
| `tag`                         |  a commit pushed to a repository branch                                    |
| `pull_request:opened`         |  a pull request is opened                                                  |
| `pull_request:reopened`       |  a pull request is reopened                                                |
| `pull_request:synchronize`    |  a pull request source branch has been updated with a new commit           |
| `pull_request:edited`         |  a pull request has been edited (title, description, target branch, etc)   |
| `pull_request:labeled`        |  a pull request has been labeled                                           |
| `pull_request:unlabeled`      |  a pull request has been unlabeled                                         |
| `deployment:created`          |  a deployment is created for the repository                                |
| `comment:created`             |  a comment has been made on a pull request                                 |
| `comment:edited`              |  a comment has been edited on a pull request                               |
| `delete:branch`               |  a repository branch has been deleted                                      |
| `delete:tag`                  |  a repository tag has been deleted                                         |

Pipelines can be written to behave differently based on which event triggered the build (see [rulesets](/docs/usage/tour/rulesets.md)).

:::note
Event scoping (`event:action`) was included in Vela release `v0.23.0`. As such, general `event` rulesets in pipelines are mapped as following:

- `pull_request` -> [ `pull_request:opened`, `pull_request:synchronize`, `pull_request:reopened` ]
- `comment` -> [ `comment:created`, `comment:edited` ]
- `deployment` -> [ `deployment:created` ]

:::

Updating webhook events for a Vela repository _must_ be done through Vela (API/CLI/UI) in order to preserve the signature integrity of the webhook. Otherwise, users will experience a [webhook signature error](/usage/troubleshooting/#payload-signature-check-failed).

### Access

Vela supports two options for visibility: **private** or **any**. This determines who can view the Vela builds.

By default, a newly enabled repository will inherit the visibility setting it has with the source control manager. However, if a user wishes for the visbility to differ between the source code repository and the CI repository, they can do so by changing this setting.

### Outside Contributor Permissions

This setting allows repository admins to further safeguard their repositories by requiring approval for builds, specifically pull requests from forks.

The four settings are:

- **Always Require Approval**: regardless of user, if the webhook event is a pull request from a fork, the build will need to be approved by a repository admin.
- **Require Approval For Read-Only**: some teams prefer the fork contribution workflow even if users have write permission to the repo. This setting allows those users to not need approval, but read-only users will.
- **Require Admin Approval for First Time Contributors**: users that have contributed to the repository before will be able to run pull request builds without admin approval. Note: it may take a few hours for a user to be marked as a prior contributor after they have contributed to the repository.
- **Never Require Approval**: any user will be able to run pull request builds by opening a PR against the repository.

When a build is awaiting approval, the SCM will be updated with the status `pending` with the description `build needs approval from repo admin to run`.

Repository admins can approve a build in the UI or by using the [CLI](/docs/reference/cli/build/approve.md).

PR builds that are marked as `pending approval` will auto cancel any previous PR build from the same source (if one exists). This is to prevent a build up of builds pending approval from the same source.

### Build Limit

The default and max build limit is determined by the platform administrators. These values determine how many builds can be run concurrently for any given repository. These limits exist to prevent any single repository from occupying a large amount of worker resources.

Builds that are triggered from a webhook event that result in exceeding the build limit will have to be re-launched by redelivering the webhook once the concurrent build total dips below the limit.

### Build Timeout

The Build Timeout setting determines the time limit for any given build for a repository. If a build lasts longer than the set timeout, the build will [error out](/usage/troubleshooting/#context-deadline-exceeded).

### Build Counter

This number is a tally of all builds that have ran for the repository. This number can be adjusted to be larger but _NOT_ smaller.

Occasionally, due to various compilation errors, this counter can fall behind resulting in a SQL collision error found in the audit page for new builds. To fix this, ensure the counter matches the actual build count.

### Status Badge

Check out the [usage documentation](/docs/usage/badge.md) for more details on customizing status badges for Vela repositories.

### Repository Actions

**Chown** — every Vela repository requires an owner. This owner is typically the user that first enabled the repository. The owner must have _write_ permissions for the repository at the minimum. The "Chown" button (or [command](/docs/reference/cli/repo/chown.md) will transfer the ownership to the user making the request.

**Repair** — whenever the connection between Vela and the webhook configured with the source control manager has been invalidated, the Vela repository must be repaired. This involves the deletion and re-creation of the webhook with the source repository. The build history will be preserved, but the ability to redeliver old webhooks will not.

### Pipeline Type

The following are the options for the formatting of the base pipeline:

| Type        | Description                                                                                             |
|-------------|---------------------------------------------------------------------------------------------------------|
| `YAML`      |  Default pipeline syntax ([Reference Documentation](/docs/reference/yaml/yaml.md)                             |
| `Go`        |  Standard YAML with Go inline functionality ([Reference Documentation](/docs/usage/templates/go/conditional.md)  |
| `Starlark`  |  YAML generation using Starlark ([Reference Documentation](/docs/usage/templates/starlark/anatomy.md)        |

Note: by default, templates are treated with `Go` syntax. In order to match that behavior for the base pipeline, this setting must be changed to `Go`.

## Pipeline Settings

Below are high-level pipeline settings that are pulled directly from the `metadata` key.

### Auto Cancel

```yaml
metadata:
    auto_cancel:
        running: true
        default_branch: true
```

Auto canceling builds is a build strategy that will prioritize the most recent status of the source code by canceling obsolete running/pending builds. More information can be found [here](/reference/yaml/metadata/#the-auto_cancel-key).

### Render Inline

```yaml
metadata:
    render_inline: true

templates:
    - name: example
      source: github.com/go-vela/templates/inline.yml
      type: github
```

Render Inline is a template compilation strategy that appends templates to the end of the base pipeline in the order in which they are declared. This is the only viable method of calling templates with `stages` at the top level. More information can be found [here](/usage/templates/#rendering-inline-directly-in-velayml).

### Clone

```yaml
metadata:
    clone: false
```

Setting the `clone` key to `false` will override Vela's default behavior of cloning the repository at the start of the build. More information can be found [here](/docs/usage/tour/cloning.md).
