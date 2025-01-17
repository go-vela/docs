---
title: "UI"
sidebar_position: 3
---

## Required

This section contains a list of all variables that must be provided to the UI.

### VELA_API

This variable sets a fully qualified URL to the Vela [server](/docs/installation/server/server.md) address.

The variable should be provided as a `string`.

:::note
This variable should match [the `VELA_ADDR` variable](/reference/installation/server#vela_addr) provided to the server.
:::

## Optional

This section contains a list of all variables that can be provided to the UI.

### NODE_ENV

This variable sets the targeted deployment environment for [node.js](https://nodejs.org/).

Setting this variable to `development` will enable development mode for the service and output verbose logging.

The variable can be provided as a `string`.

:::note
This variable has a default value of `production`.
:::

### VELA_DOCS_URL

This variable sets a fully qualified URL to the documentation website for Vela.

The variable can be provided as a `string`.

:::note
This variable has a default value of `https://go-vela.github.io/docs/`.

Please note that this variable is used in deep links throughout the UI. Customizing this value assumes the target location utilizes the same URL structure as the official docs at the default location.
:::

### VELA_FEEDBACK_URL

This variable sets a fully qualified URL to the feedback website for Vela.

The variable can be provided as a `string`.

:::note
This variable has a default value of `https://github.com/go-vela/ui/issues/new/`.
:::

### VELA_LOG_BYTES_LIMIT

This variable sets the maximum amount of bytes for logs the UI will attempt to render.

The variable can be provided as an `integer`.

:::note
This variable has a default value of `20000` (2 MB).
:::

### VELA_MAX_BUILD_LIMIT

This variable sets the maximum amount of concurrent builds a repo is allowed to run.

In this context, concurrent builds refers to any `pending` or `running` builds for that repo.

If the amount of concurrent builds for a repo matches the limit, then any new builds will be blocked from being created.

The variable can be provided as an `integer`.

:::note
This variable has a default value of `30`.

This variable should match [the `VELA_MAX_BUILD_LIMIT` variable](/reference/installation/server#vela_max_build_limit) provided to the server.
:::