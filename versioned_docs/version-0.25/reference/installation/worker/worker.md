---
no_list: true
title: "Worker"
---

## Components

The worker is made up of several components, responsible for specific tasks, necessary for the service to operate:

| Name       | Description                                                                                                                      |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `executor` | coordinates with the runtime to manage workload resources and reports results back to the [server](/docs/installation/server/) |
| `queue`    | integrates with a queue provider for pulling workloads, provided by the [server](/docs/installation/server/), that will be run |
| `runtime`  | integrates with a runtime environment for executing workload resources                                                           |

## Required

This section contains a list of all variables that must be provided to the worker.

### VELA_QUEUE_DRIVER

This configuration variable is used by the [queue component](/docs/installation/worker/reference/queue/) for the worker.

Examples using this configuration variable are provided in the above reference documentation.

This variable sets the driver to use for the queue functionality for the worker.

The variable should be provided as a `string`.

:::note
This variable should match [the `VELA_QUEUE_DRIVER` variable](/docs/installation/server/reference/#vela_queue_driver) provided to the server.

The possible options to provide for this variable are:

* `redis`
:::

### VELA_SERVER_ADDR

This variable sets a fully qualified URL to the Vela [server](/docs/installation/server/) address.

The variable should be provided as a `string`.

:::note
This variable should match [the `VELA_ADDR` variable](/docs/installation/server/reference/#vela_addr) provided to the server.
:::

### VELA_WORKER_ADDR

This variable sets a fully qualified URL to the Vela [worker](/docs/installation/worker/) address.

The variable should be provided as a `string`.

## Optional

This section contains a list of all variables that can be provided to the worker.

### VELA_SERVER_SECRET

This variable sets a shared secret for authenticating communication between workers and the server.

Only necessary to provide if utilizing the [server-worker trusted symmetric worker authentication method](/docs/installation/worker/docker/#worker-server-trusted-symmetric-token).

The variable should be provided as a `string`.

:::note
This variable should match [the `VELA_SECRET` variable](/docs/installation/server/reference/#vela_secret) provided to the server.
:::

### VELA_BUILD_LIMIT

This variable sets a number to control the maximum amount of builds that are allowed to run concurrently on the worker.

The variable can be provided as an `integer`.

:::note
This variable has a default value of `1`.
:::

### VELA_BUILD_TIMEOUT

This variable sets the maximum duration of time a build can run for on the worker before being terminated.

The variable can be provided as a `duration` (i.e. `5s`, `10m`).

:::note
This variable has a default value of `30m`.
:::

### VELA_CHECK_IN

This variable sets the maximum duration of time a worker will wait before registering with the Vela [server](/docs/installation/server/).

The variable can be provided as a `duration` (i.e. `5s`, `10m`).

:::note
This variable has a default value of `15m`.\
\
The value should coordinate with the [`VELA_WORKER_ACTIVE_INTERVAL`](/docs/installation/server/reference/#vela_worker_active_interval) setting provided to the [server](/docs/installation/server/).
:::

### VELA_EXECUTOR_DRIVER

This configuration variable is used by the [executor component](/docs/installation/worker/reference/executor/) for the worker.

Examples using this configuration variable are provided in the above reference documentation.

This variable sets the driver to use for the executor functionality for the worker.

The variable can be provided as a `string`.

:::note
This variable has a default value of `linux`.

The possible options to provide for this variable are:

* `linux`
* `local`
:::

### VELA_EXECUTOR_MAX_LOG_SIZE

This configuration variable is used by the [executor component](/docs/installation/worker/reference/executor/) for the worker.

This variable sets the maximum number of bytes for logs allowed to be uploaded per step.

The variable can be provided as an `integer`.

:::note
This variable has a default value of `0`. No limit.
:::

### VELA_EXECUTOR_ENFORCE_TRUSTED_REPOS

This configuration variable is used by the [executor component](/docs/installation/worker/reference/executor/) for the worker.

This variable sets whether or not the executor will verify a repository is `trusted` before executing a build that contains privileged images (see [runtime privileged images](/docs/installation/worker/reference/#vela_runtime_privileged_images)). 

The variable can be provided as a `boolean`.

:::note
This variable has a default value of `true`. 
:::

### VELA_QUEUE_CLUSTER

This configuration variable is used by the [queue component](/docs/installation/worker/reference/queue/) for the worker.

This variable enables the worker to connect to a queue cluster rather than a standalone instance.

The variable can be provided as a `boolean`.

:::note
This variable should match [the `VELA_QUEUE_CLUSTER` variable](/docs/installation/server/reference/#vela_queue_cluster) provided to the server.
:::

### VELA_QUEUE_POP_TIMEOUT

This configuration variable is used by the [queue component](/docs/installation/worker/reference/queue/) for the worker.

This variable sets the maximum duration of time the worker will wait before timing out requests sent for pulling workloads.

The variable can be provided as a `duration` (i.e. `5s`, `10m`).

:::note
This variable has a default value of `60s`.
:::

### VELA_QUEUE_ROUTES

This configuration variable is used by the [queue component](/docs/installation/worker/reference/queue/) for the worker.

This variable sets the unique channels or topics to pull workloads from.

The variable can be provided as a comma-separated `list` (i.e. `myRoute1,myRoute2`).

The worker will update its own database record using the provided queue routes. If you wish to control worker routes solely using API / Database, supply `""` or `"NONE"`.

:::note
This variable has a default value of `vela`.
:::

### VELA_RUNTIME_CONFIG

This configuration variable is used by the [runtime component](/docs/installation/worker/reference/runtime/) for the worker.

Examples using this configuration variable are provided in the above reference documentation.

This variable sets a fully qualified system path to a configuration file for the worker.

The variable can be provided as a `string`.

### VELA_RUNTIME_DRIVER

This configuration variable is used by the [runtime component](/docs/installation/worker/reference/runtime/) for the worker.

Examples using this configuration variable are provided in the above reference documentation.

This variable sets the driver to use for the runtime functionality for the worker.

The variable can be provided as a `string`.

:::note
This variable has a default value of `docker`.

The possible options to provide for this variable are:

* `docker`
* `kubernetes`
:::

### VELA_RUNTIME_NAMESPACE

This configuration variable is used by the [runtime component](/docs/installation/worker/reference/runtime/) for the worker.

Examples using this configuration variable are provided in the above reference documentation.

This variable sets a namespace (for Kubernetes only) to use for runtime workloads.

The variable can be provided as a `string`.

### VELA_RUNTIME_PODS_TEMPLATE_NAME

This configuration variable is used by the [runtime component](/docs/installation/worker/reference/runtime/) for the worker.

Examples using this configuration variable are provided in the [kubernetes runtime documentation](/docs/installation/worker/kubernetes/).

This variable sets a `PipelinePodsTemplate` name (for Kubernetes only) to use for runtime workloads.
The named template must be in the `VELA_RUNTIME_NAMESPACE`.

The variable can be provided as a `string`.

### VELA_RUNTIME_PODS_TEMPLATE_FILE

This configuration variable is used by the [runtime component](/docs/installation/worker/reference/runtime/) for the worker.

This variable sets the path to a `PipelinePodsTemplate` YAML file (for Kubernetes only) to use for runtime workloads.
This file is only used if `VELA_RUNTIME_PODS_TEMPLATE_NAME` is empty.

An example file is provided in the [kubernetes runtime documentation](/docs/installation/worker/kubernetes/).

This is useful for Kubernetes clusters that do not allow loading CRDs. It is also used for testing Vela.

The variable can be provided as a `string`.

### VELA_RUNTIME_PRIVILEGED_IMAGES

This configuration variable is used by the [runtime component](/docs/installation/worker/reference/runtime/) for the worker.

This variable sets the [Docker image(s)](https://docs.docker.com/get-started/overview/#images) that are allowed to have privileged access on the worker.

The variable can be provided as a comma-separated `list` (i.e. `myImage1,myImage2`).

:::note
Please use with caution. This setting essentially grants any defined image root access to the host machine.
:::

### VELA_RUNTIME_DROP_CAPABILITIES

This configuration variable is used by the [runtime component](/docs/installation/worker/reference/runtime/) for the worker.

This variable leverages the [`--cap-drop` Docker run flag](https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities) to disable certain kernel capabilities given to the container by default.

This variable can be provided as a comma-separated `list` (e.g. `CAP_CHOWN,CAP_DAC_OVERRIDE`). There is some validation in place to ensure accurate capabilities are provided.

### VELA_RUNTIME_VOLUMES

This configuration variable is used by the [runtime component](/docs/installation/worker/reference/runtime/) for the worker.

This variable sets the fully qualified system path(s) to file(s) on the host machine that will be mounted into workloads executed on that worker.

The variable can be provided as a comma-separated `list` (i.e. `myVolume1,myVolume2`).

### VELA_SERVER_CERT

This variable sets a fully qualified system path to the TLS certificate used for HTTPS for the worker.

The variable can be provided as a `string`.

### VELA_SERVER_CERT_KEY

This variable sets a fully qualified system path to the TLS certificate key used for HTTPS for the worker.

The variable can be provided as a `string`.

### VELA_SERVER_TLS_MIN_VERSION

This variable sets the minimum TLS version that the worker API will accept.

The variable can be provided as a `string`.

:::note
This variable has a default value of `1.2`.

The possible options to provide for this variable are:

* `1.0`
* `1.1`
* `1.2`
* `1.3`
:::


