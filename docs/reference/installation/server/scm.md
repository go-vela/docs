---
title: "SCM"
linkTitle: "SCM"
weight: 6
description: >
  This section contains information on the scm component for the Vela server.
---

This component is responsible for integrating with a source control management (SCM) system based off the configuration provided.

The SCM system is used by Vela for both authentication and authorization of interactions performed within the application.

![Authentication Workflow](/img/reference/authentication_workflow.png)

## Configuration

The following options are used to configure the component:

| Name                              | Description                                                                                                                         | Required | Default                                                                     | Environment Variables                                      |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `scm.addr`                        | fully qualified url for the SCM                                                                                                     | `true`   | `https://github.com`                                                        | `SCM_ADDR`,`VELA_SCM_ADDR`                                 |
| `scm.client`                      | client ID from the generated OAuth application on the SCM                                                                           | `true`   | `N/A`                                                                       | `SCM_CLIENT`,`VELA_SCM_CLIENT`                             |
| `scm.context`                     | message to set in commit status on the SCM                                                                                          | `true`   | `continuous-integration/vela`                                               | `SCM_CONTEXT`,`VELA_SCM_CONTEXT`                           |
| `scm.driver`                      | type of client to control and operate SCM                                                                                           | `true`   | `github`                                                                    | `SCM_DRIVER`,`VELA_SCM_DRIVER`                             |
| `scm.scopes`                      | permission scopes to apply for the OAuth credentials on the SCM                                                                     | `true`   | `[ repo, repo:status, user:email, read:user, read:org ]`                    | `SCM_SCOPES`,`VELA_SCM_SCOPES`                             |
| `scm.secret`                      | client secret from the generated OAuth application on the SCM                                                                       | `true`   | `N/A`                                                                       | `SCM_SECRET`,`VELA_SCM_SECRET`                             |
| `scm.webhook.addr`                | url for webhooks on the SCM to send requests to (alternative/public address; defaults to `$VELA_ADDR`)                              | `false`  | the address of the Vela server (`$VELA_ADDR`)                               | `SCM_WEBHOOK_ADDR`,`VELA_SCM_WEBHOOK_ADDR`                 |
| `vela-disable-webhook-validation` | disables validation of inbound webhooks (ONLY for local development/testing)                                                        | `false`  | `false`                                                                     | `VELA_DISABLE_WEBHOOK_VALIDATION`                          |
| `scm.app.id`                      | ID for the SCM App integration (GitHub App)                                                                                         | `false`  | `N/A`                                                                       | `SCM_APP_ID`,`VELA_SCM_APP_ID`                             |
| `scm.app.private-key`             | base64 encoded private key value for SCM App integration (one of this OR `scm.app.private-key.path` required when `scm.app.id` set) | `false`  | `N/A`                                                                       | `SCM_APP_PRIVATE_KEY`,`VELA_SCM_APP_PRIVATE_KEY`           |
| `scm.app.private-key.path`        | filesystem path to private key for SCM App integration (alternative to `scm.app.private-key`)                                       | `false`  | `N/A`                                                                       | `SCM_APP_PRIVATE_KEY_PATH`,`VELA_SCM_APP_PRIVATE_KEY_PATH` |
| `scm.app.webhook-secret`          | webhook HMAC secret for SCM App integration (required when `scm.app.id` set and webhook validation enabled)                         | `false`  | `N/A`                                                                       | `SCM_APP_WEBHOOK_SECRET`,`VELA_SCM_APP_WEBHOOK_SECRET`     |
| `scm.app.permissions`             | allowed installation token permissions for SCM App integration                                                                      | `false`  | `[ contents:read, checks:write ]`                                           | `SCM_APP_PERMISSIONS`,`VELA_SCM_APP_PERMISSIONS`           |
| `scm.repo.roles-map`              | map of SCM repository roles -> Vela permissions                                                                                     | `false`  | `{ admin: admin, write: write, maintain: write, triage: read, read: read }` | `SCM_REPO_ROLES_MAP`,`VELA_SCM_REPO_ROLES_MAP`             |
| `scm.org.roles-map`               | map of SCM organization roles -> Vela permissions                                                                                   | `false`  | `{ admin: admin, member: read }`                                            | `SCM_ORG_ROLES_MAP`,`VELA_SCM_ORG_ROLES_MAP`               |
| `scm.team.roles-map`              | map of SCM team roles -> Vela permissions                                                                                           | `false`  | `{ maintainer: admin, member: read }`                                       | `SCM_TEAM_ROLES_MAP`,`VELA_SCM_TEAM_ROLES_MAP`             |

:::note
For more information on these configuration options, please see the [server reference](/docs/reference/installation/server/server.md).
:::

## Drivers

The following drivers are available to configure the component:

| Name     | Description                                           | Documentation             |
| -------- | ----------------------------------------------------- | ------------------------- |
| `github` | uses a GitHub or GitHug Enterprise Server for the SCM | https://github.com/about/ |

### GitHub

From the [GitHub official website](https://github.com/about/):

> GitHub is where the world builds software. Millions of developers and companies build, ship, and maintain their software on GitHub—the largest and most advanced development platform in the world.

The below configuration displays an example of creating a [GitHub OAuth application](https://docs.github.com/developers/apps/building-oauth-apps/creating-an-oauth-app):

![OAuth Application](/img/reference/github_oauth.png)

:::warning
The `Homepage URL` should match [the `VELA_ADDR` environment variable](/reference/installation/server#vela_addr) provided to the server for clusters without a UI.

Otherwise, the `Homepage URL` should match [the `VELA_WEBUI_ADDR` environment variable](/reference/installation/server#vela_webui_addr) provided to the server.

The `Authorization callback URL` should contain [the `VELA_ADDR` environment variable](/reference/installation/server#vela_addr) with a `/authenticate` suffix.
:::

### GitHub Enterprise Server

From the [GitHub Enterprise official website](https://docs.github.com/en/enterprise-server/admin/overview/system-overview):

> GitHub Enterprise Server is your organization's private copy of GitHub contained within a virtual appliance, hosted on premises or in the cloud, that you configure and control.

The below configuration displays an example of creating a [GitHub Enterprise Server OAuth application](https://docs.github.com/enterprise-server@3.3/developers/apps/building-oauth-apps/creating-an-oauth-app):

![OAuth Application](/img/reference/github_enterprise_oauth.png)

:::warning
The `Homepage URL` should match [the `VELA_ADDR` environment variable](/reference/installation/server#vela_addr) provided to the server for clusters without a UI.

Otherwise, the `Homepage URL` should match [the `VELA_WEBUI_ADDR` environment variable](/reference/installation/server#vela_webui_addr) provided to the server.

The `Authorization callback URL` should contain [the `VELA_ADDR` environment variable](/reference/installation/server#vela_addr) with a `/authenticate` suffix.
:::