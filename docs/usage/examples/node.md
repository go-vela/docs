---
title: "Node"
toc: true
weight: 3
description: >
  Example Node Pipeline
---

Example [Yaml](https://yaml.org/spec/) configuration for a project building a [Node](https://nodejs.org/en/docs/) application.

## Scenario

User is looking to create a pipeline that builds an artifact on any event or branch pushed to source control.

### Steps

The following [pipeline concepts](/docs/usage/tour/tour.md) are being used in the pipeline below:

* [Steps](docs/usage/tour/steps.md)
  * [image](docs/usage/tour/image.md)
  * [Pull](docs/usage/tour/image.md)
  * [Commands](docs/usage/tour/steps.md)

:::tip
Pipeline must be stored in base of repository as `.vela.yml` or `.vela.yaml`

It is recommended to pin `image:` versions for production pipelines
:::

```yaml
version: "1"

steps:
  - name: install
    image: node:latest
    pull: always
    commands:
      - node install

  - name: lint
    image: node:latest
    pull: always
    commands:
      - node test

  - name: build
    image: node:latest
    pull: always
    commands:
      - node build
```

### Stages

The following [pipeline concepts](/docs/usage/tour/tour.md) are being used in the pipeline below:

* [Stages](docs/usage/tour/stages.md)
  * [Needs](docs/usage/tour/stages.md)
  * [Steps](docs/usage/tour/steps.md)
    * [image](docs/usage/tour/image.md)
    * [Pull](docs/usage/tour/image.md)
    * [Commands](docs/usage/tour/steps.md)

:::tip
Pipeline must be stored in base of repository as `.vela.yml` or `.vela.yaml`

It is recommended to pin `image:` versions for production pipelines
:::

```yaml
version: "1"

stages:
  install:
    steps:
      - name: install
        image: node:latest
        pull: always
        commands:
          - node install

  test:
    needs: [ install ]
    steps:
      - name: test
        image: node:latest
        pull: always
        commands:
          - node test

  build:
    needs: [ install ]
    steps:
      - name: build
        image: node:latest
        pull: always
        commands:
          - node build
```