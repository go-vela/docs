---
title: "Executor"
linkTitle: "Executor"
description: >
  This section contains information on the executor component for the worker.
---

This component is responsible for coordinating with [the runtime](/docs/installation/worker/runtime/) to manage workload resources.

Throughout the lifecycle of these resources, this component will track and report results back to the [server](/docs/installation/server/server.md).

## Configuration

The following options are used to configure the component:

| Name                             | Description                                                                | Required | Default        | Environment Variables                                                     |
| -------------------------------- | -------------------------------------------------------------------------- | -------- | -------------- | ------------------------------------------------------------------------- |
| `executor.driver`                | type of client to control and operate executor                             | `true`   | `linux`        | `EXECUTOR_DRIVER`\`VELA_EXECUTOR_DRIVER`                               |
| `executor.max_log_size`          | maximum log size (in bytes)                                                | `false`  | `0` (no limit) | `EXECUTOR_MAX_LOG_SIZE`\`VELA_EXECUTOR_MAX_LOG_SIZE`                   |
| `executor.log_streaming_timeout` | maximum time to wait, after build completion, for logs to finish streaming | `false`  | `5m`           | `EXECUTOR_LOG_STREAMING_TIMEOUT`\`VELA_EXECUTOR_LOG_STREAMING_TIMEOUT` |

:::note
For more information on these configuration options, please see the [worker reference](/docs/reference/installation/worker/worker.md).
:::

## Drivers

The following drivers are available to configure the component:

| Name    | Description                                            | Documentation          |
| ------- | ------------------------------------------------------ | ---------------------- |
| `linux` | uses a Linux executor for running workloads            | https://www.linux.com/ |
| `local` | uses a Local executor for running workloads (CLI only) | `N/A`                  |

### Linux

From the [Linux official website](https://www.linux.com/what-is-linux/):

> Linux has been around since the mid-1990s and has since reached a user-base that spans the globe. Just like Windows, iOS, and Mac OS, Linux is an operating system. In fact, one of the most popular platforms on the planet, Android, is powered by the Linux operating system.

The below configuration displays an example of starting the Vela worker that will use a Linux executor:

```diff
$ docker run \
  --detach=true \
+ --env=VELA_EXECUTOR_DRIVER=linux \
  --env=VELA_QUEUE_DRIVER=redis \
  --env=VELA_SERVER_ADDR=https://vela-server.example.com \
  --env=VELA_SERVER_SECRET=<shared-secret> \
  --env=VELA_WORKER_ADDR=https://vela-worker.example.com \
  --name=worker \
  --publish=80:80 \
  --publish=443:443 \
  --restart=always \
  --volume=/var/run/docker.sock:/var/run/docker.sock \
  target/vela-worker:latest
```

:::note
This Linux configuration is enabled by default and is not necessary to provide in order for Vela to operate.
:::

### Local

The `local` executor driver is only intended for use with the [Vela CLI](None).

It's not recommended to run any workloads on a worker configured with this driver.
