---
no_list: true
title: "Reference"
linkTitle: "Reference"
weight: 4
description: >
  This section contains a reference of configuration options for the Vela server service.
---

## Components

The server is made up of several components, responsible for specific tasks, necessary for the service to operate:

| Name       | Description                                                                                                       |
| ---------- | ----------------------------------------------------------------------------------------------------------------- |
| `settings` | keeps track of updated runtime properties for the [server](/docs/installation/server/)                            |
| `compiler` | transforms a [pipeline](None) into an executable workload for the [worker](/docs/installation/worker/worker.md)     |
| `database` | integrates with a database provider for storing application data at rest                                          |
| `queue`    | integrates with a queue provider for pushing workloads that will be run by a [worker](/docs/installation/worker/worker.md) |
| `secret`   | integrates with a secret provider for storing sensitive application data at rest                                  |
| `source`   | integrates with a source control management (SCM) provider for authentication and authorization                   |
| `tracing`  | implements OpenTelemetry tracing instrumentation for the [server](/docs/installation/server/) |

## Required

This section contains a list of all variables that must be provided to the server.

Some properties can be updated while the server is running using the [settings component](/docs/installation/server/reference/settings).

### VELA_ADDR

This variable sets a fully qualified URL to the Vela [server](/docs/installation/server/) address.

The variable should be provided as a `string`.

### VELA_DATABASE_ENCRYPTION_KEY

This configuration variable is used by the [database component](/docs/reference/installation/database.md) for the server.

Examples using this configuration variable are provided in the above reference documentation.

This variable sets the AES key for encrypting/decrypting values for data stored in the database.

The variable should be provided as an `string`.

### VELA_QUEUE_ADDR

This configuration variable is used by the [queue component](/docs/reference/installation/queue.md) for the server.

Examples using this configuration variable are provided in the above reference documentation.

This variable sets a fully qualified URL to the queue instance for pushing workloads that will be run by a [worker](/docs/installation/worker/worker.md).

The variable should be provided as a `string`.

### VELA_QUEUE_DRIVER

This configuration variable is used by the [queue component](/docs/reference/installation/queue.md) for the server.

Examples using this configuration variable are provided in the above reference documentation.

This variable sets the driver to use for the queue functionality for the server.

The variable should be provided as a `string`.

:::note
This variable should match [the `VELA_QUEUE_DRIVER` variable](/docs/installation/worker/reference/#vela_queue_driver) provided to the worker.

The possible options to provide for this variable are:

* `redis`
:::

### VELA_SCM_CLIENT

This configuration variable is used by the [SCM component](/docs/reference/installation/scm.md) for the server.

This variable sets the client ID from the OAuth application created on the SCM system.

The variable should be provided as a `string`.

### VELA_SCM_SECRET

This configuration variable is used by the [SCM component](/docs/reference/installation/scm.md) for the server.

This variable sets the client secret from the OAuth application created on the SCM system.

The variable should be provided as a `string`.

### VELA_SERVER_PRIVATE_KEY

This variable sets the private key that will be used to sign all JWT tokens within Vela. Please be sure to follow [guidelines](https://www.rfc-editor.org/rfc/rfc2104#section-3) related to generating a private key.

The variable should be provided as a `string`.

## Optional

This section contains a list of all variables that can be provided to the server.

Some properties can be updated while the server is running using the [settings component](/docs/installation/server/reference/settings).

### VELA_CLONE_IMAGE

This configuration variable is used by the [compiler component](/docs/installation/server/reference/compiler) for the server.

The clone image sets the clone image to use for the Vela injected clone step in a pipeline.

By default, Vela will use the latest available release of the clone image at the time of a server release.

This variable should be provided as a `string`.

This property can be updated while the server is running using the [settings component](/docs/installation/server/reference/settings).

### VELA_COMPILER_GITHUB

This configuration variable is used by the [compiler component](/docs/reference/installation/compiler.md) for the server.

Examples using this configuration variable are provided in the above reference documentation.

This variable enables using GitHub or GitHub Enterprise Server as a registry for fetching pipeline [templates](/docs/tour/templates/) from.

By default, Vela will use [GitHub](https://github.com/) as a registry for fetching templates.

However, to fetch templates from a private organization or repository on GitHub, you need to provide this configuration.

The variable can be provided as a `boolean`.

:::note
This variable has a default value of `false`.
:::

### VELA_COMPILER_GITHUB_TOKEN

This configuration variable is used by the [compiler component](/docs/reference/installation/compiler.md) for the server.

Examples using this configuration variable are provided in the above reference documentation.

This variable sets a [Personal Access Token (PAT)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) for fetching pipeline [templates](/docs/tour/templates/) from GitHub or GitHub Enterprise Server.

By default, Vela will use [GitHub](https://github.com/) as a registry for fetching templates.

However, to fetch templates from a private organization or repository on GitHub, you need to provide this configuration.

The variable can be provided as a `string`.

### VELA_COMPILER_GITHUB_URL

This configuration variable is used by the [compiler component](/docs/reference/installation/compiler.md) for the server.

Examples using this configuration variable are provided in the above reference documentation.

This variable sets a fully qualified URL to GitHub or GitHub Enterprise Server used for fetching pipeline [templates](/docs/tour/templates/) from.

By default, Vela will use [GitHub](https://github.com/) as a registry for fetching templates.

However, to fetch templates from a private organization or repository on GitHub, you need to provide this configuration.

The variable can be provided as a `string`.

### VELA_DATABASE_ADDR

This configuration variable is used by the [database component](/docs/reference/installation/database.md) for the server.

Examples using this configuration variable are provided in the above reference documentation.

This variable sets a fully qualified URL to the database instance for storing data at rest.

The variable can be provided as a `string`.

:::note
This variable has a default value of `vela.sqlite`.
:::

### VELA_DATABASE_COMPRESSION_LEVEL

This configuration variable is used by the [database component](/docs/reference/installation/database.md) for the server.

This variable sets the level of compression for workload logs, uploaded by the Vela [worker](/docs/installation/worker/worker.md), which are stored in the database.

The variable can be provided as an `integer`.

:::note
This variable has a default value of `3`.

The possible options to provide for this variable are:

* `-1`
* `0` - produces no compression for the log data
* `1` - produces compression for the log data the fastest and with the largest size of data
* `2`
* `3`
* `4`
* `5` - produces compression for the log data with an even balance of speed and size of data
* `6`
* `7`
* `8`
* `9` - produces compression for the log data the slowest and with the smallest size of data
:::

### VELA_DATABASE_CONNECTION_IDLE

This configuration variable is used by the [database component](/docs/reference/installation/database.md) for the server.

This variable sets the maximum number of [idle connections](https://pkg.go.dev/database/sql#DB.SetMaxIdleConns) allowed for the database client.

The variable can be provided as an `integer`.

:::note
This variable has a default value of `2`.
:::

### VELA_DATABASE_CONNECTION_LIFE

This configuration variable is used by the [database component](/docs/reference/installation/database.md) for the server.

This variable sets the maximum duration of time [a connection is reusable](https://pkg.go.dev/database/sql#DB.SetConnMaxLifetime) for the database client.

The variable can be provided as a `duration` (i.e. `5s`, `10m`).

:::note
This variable has a default value of `30m`.
:::

### VELA_DATABASE_CONNECTION_OPEN

This configuration variable is used by the [database component](/docs/reference/installation/database.md) for the server.

This variable sets the maximum number of [open connections](https://pkg.go.dev/database/sql#DB.SetMaxOpenConns) allowed for the database client.

The variable can be provided as an `integer`.

:::note
This variable has a default value of `0` (meaning no limit is set).
:::

### VELA_DATABASE_DRIVER

This configuration variable is used by the [database component](/docs/reference/installation/database.md) for the server.

Examples using this configuration variable are provided in the above reference documentation.

This variable sets the driver to use for the database functionality for the server.

The variable can be provided as a `string`.

:::note
This variable has a default value of `sqlite3`.

The possible options to provide for this variable are:

* `postgres`
* `sqlite3`
:::

### VELA_DATABASE_SKIP_CREATION

This configuration variable is used by the [database component](/docs/reference/installation/database.md) for the server.

This variable enables skipping the creation of tables and indexes in the database system.

The variable can be provided as a `boolean`.

:::note
This variable has a default value of `false`.
:::

### VELA_DATABASE_LOG_LEVEL

This configuration variable is used by the [database component](/docs/reference/installation/database.md) for the server.

This variable controls the log level to use in the database system. This can be different than the log level for the rest of the application.

The variable can be provided as a `string` (trace, debug, info, warn, error, fatal, panic).

:::note
This variable has a default value of `warn`.
:::

### VELA_DATABASE_LOG_SHOW_SQL

This configuration variable is used by the [database component](/docs/reference/installation/database.md) for the server.

This variable controls whether to show the SQL query in the logs for the database system.

The variable can be provided as a `boolean`.

:::note
This variable has a default value of `false`.
:::

### VELA_DATABASE_LOG_SKIP_NOTFOUND

This configuration variable is used by the [database component](/docs/reference/installation/database.md) for the server.

This variable controls whether to skip showing record not found errors in the logs for the in the database system.

The variable can be provided as a `boolean`.

:::note
This variable has a default value of `true`.
:::

### VELA_DATABASE_LOG_SLOW_THRESHOLD

This configuration variable is used by the [database component](/docs/reference/installation/database.md) for the server.

This variable controls the threshold that determines which queries are considered slow and logged in the database system.

The variable can be provided as a `duration`.

:::note
This variable has a default value of `200ms`.
:::

### VELA_DEFAULT_BUILD_LIMIT

This variable sets the default amount of concurrent builds a repo is allowed to run.

In this context, concurrent builds refers to any `pending` or `running` builds for that repo.

If the amount of concurrent builds for a repo matches the limit, then any new builds will be blocked from being created.

The variable can be provided as an `integer`.

:::note
This variable has a default value of `10`.
:::

### VELA_DEFAULT_BUILD_TIMEOUT

This variable sets the default duration of time a build is allowed to run on a worker.

The variable can be provided as an `integer`.

:::note
This variable has a default value of `30`.
:::

### VELA_DEFAULT_REPO_EVENTS

This variable sets the default active events for newly activated repositories.

The variable can be provided as a comma-separated `list` (i.e. `push,tag,deployment`).

:::note
By default, the `push` event is enabled. Valid values are: `push`, `pull_request`, `tag`, `deployment`, and `comment`.
:::

### VELA_DISABLE_WEBHOOK_VALIDATION

This variable disables validation of webhooks sent by the SCM to the server.

The variable can be provided as a `boolean`.

:::note
This variable should only be used for local development.

This variable has a default value of `false`.
:::

### VELA_ENABLE_SECURE_COOKIE

This enables using cookies with the secure flag set by the server.

The variable can be provided as a `boolean`.

:::note
This variable should only be used for local development.

This variable has a default value of `true`.
:::

### VELA_LOG_FORMATTER

This variable sets whether the logging formatter used for structured server logs is a standard JSON logger, or a custom Elasticsearch Common Schema (ECS) compatible JSON formatter.

The variable can be provided as a `string`.

:::note
This variable has a default value of `json`. Valid values are: `json`, and `ecs`.
:::

### VELA_MAX_BUILD_LIMIT

This variable sets the maximum amount of concurrent builds a repo is allowed to run.

In this context, concurrent builds refers to any `pending` or `running` builds for that repo.

If the amount of concurrent builds for a repo matches the limit, then any new builds will be blocked from being created.

The variable can be provided as an `integer`.

:::note
This variable has a default value of `30`.

This variable should match [the `VELA_MAX_BUILD_LIMIT` variable](/docs/installation/ui/reference/#vela_max_build_limit) provided to the UI.
:::

### VELA_MODIFICATION_ADDR

This configuration variable is used by the [compiler component](/docs/reference/installation/compiler.md) for the server.

This variable sets a fully qualified URL to the modification endpoint used for the compiler.

The variable can be provided as a `string`.

### VELA_MODIFICATION_RETRIES

This configuration variable is used by the [compiler component](/docs/reference/installation/compiler.md) for the server.

This variable sets the maximum number of times to resend failed requests to the modification endpoint for the compiler.

The variable can be provided as an `integer`.

:::note
This variable has a default value of `5`.
:::

### VELA_MODIFICATION_SECRET

This configuration variable is used by the [compiler component](/docs/reference/installation/compiler.md) for the server.

This variable sets a shared secret for authenticating communication between the compiler and the modification endpoint.

The variable can be provided as a `string`.

### VELA_MODIFICATION_TIMEOUT

This configuration variable is used by the [compiler component](/docs/reference/installation/compiler.md) for the server.

This variable sets the maximum duration of time the compiler will wait before timing out requests sent to the modification endpoint.

The variable can be provided as a `duration` (i.e. `5s`, `10m`).

:::note
This variable has a default value of `8s`.
:::

### VELA_MAX_TEMPLATE_DEPTH

This configuration variable is used by the [compiler component](/docs/installation/server/reference/compiler) for the server.

This variable sets the maximum depth of nested templates that can be called during compilation.

The variable can be provided as an `integer`.

:::note
This variable has a default value of `3`.
:::

This property can be updated while the server is running using the [settings component](/docs/installation/server/reference/settings).

### VELA_COMPILER_STARLARK_EXEC_LIMIT

This configuration variable is used by the [compiler component](/docs/installation/server/reference/compiler) for the server.

This variable sets the starlark execution step limit for compiling starlark pipelines.

The variable can be provided as an `integer`.

:::note
This variable has a default value of `7500`.
:::

This property can be updated while the server is running using the [settings component](/docs/installation/server/reference/settings).

### VELA_PORT

This variable sets the port the server API responds on for HTTP requests.

The variable can be provided as a `string`.

:::note
This variable has a default value of `8080`.
:::

### VELA_QUEUE_CLUSTER

This configuration variable is used by the [queue component](/docs/reference/installation/queue.md) for the server.

This variable enables the server to connect to a queue cluster rather than a standalone instance.

The variable can be provided as a `boolean`.

:::note
This variable should match [the `VELA_QUEUE_CLUSTER` variable](/docs/installation/worker/reference/#vela_queue_cluster) provided to the worker.
:::

### VELA_QUEUE_POP_TIMEOUT

This configuration variable is unused by the [queue component](/docs/reference/installation/queue.md) for the server.

This variable sets the maximum duration of time the worker will wait before timing out requests sent for pushing workloads.

The variable can be provided as a `duration` (i.e. `5s`, `10m`).

:::note
This variable has a default value of `60s`.
:::

### VELA_QUEUE_ROUTES

This configuration variable is used by the [queue component](/docs/reference/installation/queue.md) for the server.

This variable sets the unique channels or topics to push workloads to.

The variable can be provided as a comma-separated `list` (i.e. `myRoute1,myRoute2`).

:::note
This variable has a default value of `vela`.
:::

This property can be updated while the server is running using the [settings component](/docs/installation/server/reference/settings).

### VELA_QUEUE_PRIVATE_KEY

This variable sets a private key secret for signing queue items that will be opened by the worker's \<signing-public-key\>.

The variable should be provided as a base64 encoded `string`.

### VELA_QUEUE_PUBLIC_KEY

This variable sets a public key secret for opening queue items that have been signed by the server's \<signing-private-key\>.

The variable should be provided as a base64 encoded `string`.

### VELA_REPO_ALLOWLIST

This variable sets a group of repositories, from the SCM, that can be enabled on the server.

The variable can be provided as a comma-separated `list` (i.e. `myOrg1/myRepo1,myOrg1/myRepo2,myOrg2/*`).

:::note
By default, no repositories are allowed to be enabled. To allow any repository to be enabled, provide a single value of `*`.
:::

This property can be updated while the server is running using the [settings component](/docs/installation/server/reference/settings).

### VELA_SCHEDULE_ALLOWLIST

This variable sets a group of repositories, from the SCM, that can create a schedule for a repo on the server.

The variable can be provided as a comma-separated `list` (i.e. `myOrg1/myRepo1,myOrg1/myRepo2,myOrg2/*`).

:::note
By default, no repositories are allowed to create a schedule. To allow any repository to create a schedule, provide a single value of `*`.
:::

This property can be updated while the server is running using the [settings component](/docs/installation/server/reference/settings).

### VELA_SCHEDULE_MINIMUM_FREQUENCY

This variable sets the minimum frequency allowed to be set for a schedule.

The variable can be provided as a `duration` (i.e. `5s`, `10m`).

:::note
This variable has a default value of `1h`.
:::

### VELA_SCM_ADDR

This configuration variable is used by the [SCM component](/docs/reference/installation/scm.md) for the server.

This variable sets a fully qualified URL to the source control management (SCM) system.

The variable can be provided as a `string`.

:::note
This variable has a default value of `https://github.com`.
:::

### VELA_SCM_CONTEXT

This configuration variable is used by the [SCM component](/docs/reference/installation/scm.md) for the server.

This variable sets the message to set in the commit status on the SCM system.

The variable can be provided as a `string`.

:::note
This variable has a default value of `continuous-integration/vela`.
:::

### VELA_SCM_DRIVER

This configuration variable is used by the [SCM component](/docs/reference/installation/scm.md) for the server.

This variable sets the driver to use for the SCM functionality for the server.

The variable can be provided as a `string`.

:::note
This variable has a default value of `github`.

The possible options to provide for this variable are:

* `github`
:::

### VELA_SCM_SCOPES

This configuration variable is used by the [SCM component](/docs/reference/installation/scm.md) for the server.

This variable sets the permission scopes to apply for OAuth credentials captured from the SCM system.

The variable can be provided as a comma-separated `list` (i.e. `myScope1,myScope2`).

:::note
This variable has a default value of `read:org,read:user,repo,repo:status,user:email`.
:::

### VELA_SCM_WEBHOOK_ADDR

This configuration variable is used by the [SCM component](/docs/reference/installation/scm.md) for the server.

This variable sets a fully qualified URL on the SCM system to send webhooks to the server.

The variable can be provided as a `string`.

:::note
This variable has a default value of [the `VELA_ADDR` variable](/docs/installation/server/reference/#vela_addr) provided to the server.
:::

### VELA_SECRET

This variable sets a shared secret with the Vela [worker](/docs/installation/worker/worker.md) for authenticating communication between workers and the server.

Only necessary to provide if utilizing the [server-worker trusted symmetric worker authentication method](/docs/installation/worker/docker/#worker-server-trusted-symmetric-token).

The variable should be provided as a `string`.

:::note
This variable should match [the `VELA_SERVER_SECRET` variable](/docs/installation/worker/reference/#vela_server_secret) provided to the worker.
:::

### VELA_SECRET_VAULT

This configuration variable is used by the [secret component](/docs/reference/installation/secret.md) for the server.

Examples using this configuration variable are provided in the above reference documentation.

This variable enables using HashiCorp Vault as a secret engine.

The variable can be provided as a `boolean`.

:::note
This variable has a default value of `false`.
:::

### VELA_SECRET_VAULT_ADDR

This configuration variable is used by the [secret component](/docs/reference/installation/secret.md) for the server.

Examples using this configuration variable are provided in the above reference documentation.

This variable sets a fully qualified URL to the HashiCorp Vault instance.

The variable can be provided as a `string`.

### VELA_SECRET_VAULT_AUTH_METHOD

This configuration variable is used by the [secret component](/docs/reference/installation/secret.md) for the server.

This variable sets the authentication method to obtain a token from the HashiCorp Vault instance.

The variable can be provided as a `string`.

### VELA_SECRET_VAULT_AWS_ROLE

This configuration variable is used by the [secret component](/docs/reference/installation/secret.md) for the server.

This variable sets the HashiCorp Vault role to connect to the `auth/aws/login` endpoint.

The variable can be provided as a `string`.

### VELA_SECRET_VAULT_PREFIX

This configuration variable is used by the [secret component](/docs/reference/installation/secret.md) for the server.

This variable sets the prefix for k/v secrets in the HashiCorp Vault instance.

The variable can be provided as a `string`.

### VELA_SECRET_VAULT_RENEWAL

This configuration variable is used by the [secret component](/docs/reference/installation/secret.md) for the server.

This variable sets the frequency to renew the token for the HashiCorp Vault instance.

The variable can be provided as a `duration` (i.e. `5s`, `10m`).

:::note
This variable has a default value of `30m`.
:::

### VELA_SECRET_VAULT_TOKEN

This configuration variable is used by the [secret component](/docs/reference/installation/secret.md) for the server.

Examples using this configuration variable are provided in the above reference documentation.

This variable sets the token for accessing the HashiCorp Vault instance.

The variable can be provided as a `string`.

### VELA_SECRET_VAULT_VERSION

This configuration variable is used by the [secret component](/docs/reference/installation/secret.md) for the server.

This variable sets the version for the k/v backend for the HashiCorp Vault instance.

The variable can be provided as a `string`.

:::note
This variable has a default value of `2`.
:::

### VELA_USER_ACCESS_TOKEN_DURATION

This variable sets the maximum duration of time a Vela access token for a user is valid on the server.

The access token is used for authenticating user's requests to the server.

The variable can be provided as a `duration` (i.e. `5s`, `10m`).

:::note
This variable has a default value of `15m`.
:::

### VELA_USER_REFRESH_TOKEN_DURATION

This variable sets the maximum duration of time a Vela refresh token for a user is valid on the server.

The refresh token is used for refreshing a user's access token on the server.

The variable can be provided as a `duration` (i.e. `5s`, `10m`).

:::note
This variable has a default value of `8h`.
:::

### VELA_BUILD_TOKEN_BUFFER_DURATION

This variable sets the maximum duration of time a Vela build token for a build extends beyond the repo build limit to maintain validity on the server.

The build token is used for authenticating a worker's access to the server to update build resources.

The variable can be provided as a `duration` (i.e. `5s`, `10m`).

:::note
This variable has a default value of `5m`.
:::

### VELA_WEBUI_ADDR

This variable sets a fully qualified URL to the Vela [UI](/docs/installation/ui/ui.md) address.

The variable can be provided as a `string`.

### VELA_WEBUI_OAUTH_CALLBACK_PATH

This variable sets the endpoint to use for the OAuth callback path for the Vela [UI](/docs/installation/ui/ui.md).

The variable can be provided as a `string`.

:::note
This variable has a default value of `/account/authenticate`.
:::

### VELA_WORKER_AUTH_TOKEN_DURATION

This variable sets the maximum duration of time a Vela auth token for a worker is valid on the server.

The worker auth token is used for authenticating a worker's access to the server to check-in and request build tokens.

The variable can be provided as a `duration` (i.e. `5s`, `10m`).

:::note
This variable should be _longer_ than the [VELA_CHECK_IN](/docs/installation/worker/reference/#vela_check_in) in order to be able to refresh the auth token.

This variable has a default value of `20m`.
:::

### VELA_WORKER_REGISTER_TOKEN_DURATION

This variable sets the maximum duration of time a Vela registration token for a worker is valid on the server.

The worker register token is used for onboarding a worker onto the server and beginning its auth refresh routine.

The variable can be provided as a `duration` (i.e. `5s`, `10m`).

:::note
This variable should be relatively short-lived. There is a [CLI Command](/docs/reference/cli/worker/add) to quicken the registration process for admins.

This variable has a default value of `1m`.
:::

### VELA_WORKER_ACTIVE_INTERVAL

This variable sets the interval of time the workers will be considered active. A worker is considered active if it has registered with the server inside the give duration.

The variable can be provided as a `duration` (i.e. `5s`, `10m`).

:::note
This variable has a default value of `5m`.\
\
The value should coordinate with the [`VELA_CHECK_IN`](/docs/installation/worker/reference/#vela_check_in) setting provided to the [worker](/docs/installation/worker/worker.md).
:::

### VELA_OTEL_TRACING_ENABLE

This variable enables [OpenTelemetry tracing](https://opentelemetry.io/docs/concepts/signals/traces/) for the Vela server. You must provide `VELA_OTEL_EXPORTER_OTLP_ENDPOINT` **when tracing is enabled**.

:::note
This variable has a default value of `false`.
:::

### VELA_OTEL_TRACING_SERVICE_NAME

This variable sets the [service name](https://opentelemetry.io/docs/languages/sdk-configuration/general/) applied to [traces](https://opentelemetry.io/docs/concepts/signals/traces/).

:::note
This variable has a default value of `vela-server`.
:::

### VELA_OTEL_EXPORTER_OTLP_ENDPOINT

This variable sets the [OTel exporter](https://opentelemetry.io/docs/languages/sdk-configuration/otlp-exporter/) endpoint (ex. scheme://host:port).

:::note
This variable has no default value.\
\
When tracing is enabled this variable is **required**.
:::

### VELA_OTEL_TRACING_EXPORTER_SSL_CERT_PATH

This variable sets the path to certs used for communicating with the [OTel exporter](https://opentelemetry.io/docs/specs/OTel/protocol/exporter/). If nothing is provided, will use insecure communication.

:::note
This variable has no default value.\
\
Providing no value for this variable instructs the server to export traces insecurely (no SSL).
:::

### VELA_OTEL_TRACING_TLS_MIN_VERSION

This optional variable sets a TLS minimum version used when exporting traces to the [OTel exporter](https://opentelemetry.io/docs/specs/OTel/protocol/exporter/).

:::note
This variable has a default value of `1.2`.
:::

### VELA_OTEL_TRACING_SAMPLER_RATELIMIT_PER_SECOND

This variable sets OTel [tracing head-sampler](https://opentelemetry.io/docs/concepts/sampling/) rate-limiting to N per second.

:::note
This variable has a default value of `100`, meaning the server can record a maximum of `100 traces per second`.
:::

### VELA_OTEL_TRACING_SAMPLER_TASKS_CONFIG_FILEPATH

This variable sets an (optional) filepath to the OTel tracing head-sampler configurations json to alter how certain tasks (endpoints, queries, etc) are sampled.

A `task` is basically the "span name" based on the work being performed. A `task` can be an API endpoint interaction, a gorm query, etc.

See: https://opentelemetry.io/docs/specs/OTel/trace/api/#span

:::note
This variable has no default value.\
\
When no path is provided all tasks are recorded using provided shared parameters.
:::

### VELA_OTEL_TRACING_RESOURCE_ATTRIBUTES

This variable sets OTel resource [(span) attributes](https://opentelemetry.io/docs/languages/go/instrumentation/#span-attributes) as a list of key=value pairs. each one will be attached to each span as a 'process' attribute.

:::note
This variable has no default value.
:::

### VELA_OTEL_TRACING_RESOURCE_ENV_ATTRIBUTES

This variable sets OTel resource [(span) attributes](https://opentelemetry.io/docs/languages/go/instrumentation/#span-attributes) as a list of key=env_variable_key pairs. each one will be attached to each [span](https://opentelemetry.io/docs/languages/go/instrumentation/#span-attributes) as a 'process' attribute where the value is retrieved from the environment using the pair value.

:::note
This variable has no default value.
:::

### VELA_OTEL_TRACING_SPAN_ATTRIBUTES

This variable sets trace [span attributes](https://opentelemetry.io/docs/languages/go/instrumentation/#span-attributes) as a list of key=value pairs. Each pair will be attached to each [span](https://opentelemetry.io/docs/languages/go/instrumentation/#span-attributes) as a 'tag' attribute.

:::note
This variable has no default value.
:::

### VELA_OTEL_TRACING_TRACESTATE_ATTRIBUTES

This variable sets OTel tracestate [(span) attributes](https://www.w3.org/TR/trace-context) as a list of key=value pairs. Each pair will be inserted into the tracestate for each sampled span.

:::note
This variable has no default value.
:::
