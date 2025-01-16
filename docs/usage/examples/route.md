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

The following [pipeline concepts](None) are being used in the pipeline below:

* *Worker*
  * *Platform*
* [Steps](/docs/tour/steps/)
  * [Image](/docs/tour/image/)
  * [Pull](/docs/tour/image/)
  * [Commands](/docs/tour/steps/)

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

The following [pipeline concepts](None) are being used in the pipeline below:

* *Worker*
  * *Platform*
* [Stages](/docs/tour/stages/)
  * [Steps](/docs/tour/steps/)
  * [Image](/docs/tour/image/)
  * [Environment](/docs/tour/environment/)
  * [Pull](/docs/tour/image/)
  * [Commands](/docs/tour/steps/)

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
