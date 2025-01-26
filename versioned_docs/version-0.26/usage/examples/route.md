---
title: "Route"
toc: true
weight: 1
description: >
  Example Pipeline with build routing
---

Example [Yaml](https://yaml.org/spec/) configuration for a project requiring a specific runtime or platform.

## Scenario

User is looking to create a pipeline that can only run within a Docker runtime.

:::tip
Work with your server administer to understand what routes are available for your installation
:::

### Steps

The following [pipeline concepts](/docs/usage/tour/tour.md) are being used in the pipeline below:

* *Worker*
  * *Platform*
* [Steps](docs/usage/tour/steps.md)
  * [Image](docs/usage/tour/image.md)
  * [Pull](docs/usage/tour/image.md)
  * [Commands](docs/usage/tour/steps.md)

:::tip
Pipeline must be stored in base of repository as `.vela.yml` or `.vela.yaml`

It is recommended to pin `image:` versions for production pipelines
:::

```yaml
version: "1"

worker:
  platform: docker

steps:
  - name: view worker name
    image: alpine:latest
    pull: always
    commands:
      - echo "Hello ${BUILD_HOST} Worker!!"
```

### Stages

The following [pipeline concepts](/docs/usage/tour/tour.md) are being used in the pipeline below:

* *Worker*
  * *Platform*
* [Stages](docs/usage/tour/stages.md)
  * [Steps](docs/usage/tour/steps.md)
  * [Image](docs/usage/tour/image.md)
  * [Environment](docs/usage/tour/environment.md)
  * [Pull](docs/usage/tour/image.md)
  * [Commands](docs/usage/tour/steps.md)

:::tip
Pipeline must be stored in base of repository as `.vela.yml` or `.vela.yaml`

It is recommended to pin `image:` versions for production pipelines
:::

```yaml
version: "1"

worker:
  platform: docker

stages:
  docker:
    steps:
      - name: view worker name
        image: alpine:latest
        pull: always
        commands:
          - echo "Hello ${BUILD_HOST} Worker!!"
```
