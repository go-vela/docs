---
title: "Worker"
linkTitle: "Worker"
weight: 3
description: >
  YAML keys for worker block
---

The worker key is intended to be used to route a build to a specific worker pool of workers available with the Vela queue.

```yaml
---
# This document is displaying all the available keys
# and routing the build to a specific worker "sm:docker".
worker:
  flavor: sm
  platform: docker
```

:::warning
Routes are defined by the Vela system administrators during installation. To know what routes are available for your Vela installation, we recommend consulting your system administrators.
:::

## Keys

| Key        | Required | Type   | Description                                          |
|------------|----------|--------|------------------------------------------------------|
| `flavor`   | N        | string | Indicates what flavor of a worker. (i.e. sm, m, lg)    |
| `platform` | N        | string | Indicates the platform of a worker. (i.e. docker, k8s) |

### Usage

:::tip
See an [example](/docs/usage/examples/route.md) on how to route a build.
:::

#### The `flavor:` key

```yaml
---
worker:
  # indicates what flavor of worker (i.e. sm, m, lg). If not specified
  # will be scheduled in the generic "vela" queue.
  flavor: sm
```

#### The `platform:` key

```yaml
---
worker:
  # Indicates the platform of worker (i.e. docker, k8s). If not specified
  # will be scheduled in the generic "vela" queue.
  platform: docker
```

